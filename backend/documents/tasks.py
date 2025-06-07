from celery import shared_task
from django.conf import settings
from .models import Document, SemanticTopic, ArgumentComponent, DocumentAnalysisStatus
from vectors.models import Embedding
from django.contrib.contenttypes.models import ContentType
import logging
import hashlib
import tempfile
import os
from django.core.files.storage import default_storage
from django.utils import timezone

logger = logging.getLogger(__name__)

@shared_task(bind=True, max_retries=3)
def process_document(self, document_id):
    """
    Main document processing task for Sprint 2.
    This task handles:
    1. OCR text extraction
    2. Vector embedding generation
    3. Creating stub analysis entries
    """
    try:
        document = Document.objects.get(id=document_id)
        
        # Update status to processing
        document.ocr_status = 'processing'
        document.save()
        
        logger.info(f'Starting processing for document: {document_id}')
        
        # Step 1: Download from GCS and extract text
        extracted_text = extract_text_from_document(document)
        if not extracted_text:
            raise Exception("Failed to extract text from document")
        
        # Step 2: Update document with extracted text
        document.extracted_text = extracted_text
        document.save()
        
        # Step 3: Generate embeddings
        embedding_vector = generate_document_embedding(extracted_text)
        if embedding_vector is not None:
            document.embedding = embedding_vector
            
            # Also save to the Embedding model for more detailed tracking
            content_type = ContentType.objects.get_for_model(Document)
            Embedding.objects.update_or_create(
                content_type=content_type,
                object_id=document.id,
                defaults={
                    'embedding': embedding_vector,
                    'embedding_type': 'sentence-transformers',
                    'metadata': {
                        'model_name': 'paraphrase-multilingual-MiniLM-L12-v2',
                        'text_length': len(extracted_text),
                        'processed_at': timezone.now().isoformat()
                    }
                }
            )
        
        # Step 4: Create stub analysis entries
        create_analysis_stubs(document)
        
        # Step 5: Update final status
        document.ocr_status = 'completed'
        document.save()
        
        logger.info(f'Successfully processed document: {document_id}')
        
    except Document.DoesNotExist:
        logger.error(f"Document {document_id} not found")
        raise
    except Exception as exc:
        logger.error(f"Error processing document {document_id}: {str(exc)}")
        try:
            document = Document.objects.get(id=document_id)
            document.ocr_status = 'failed'
            document.save()
        except:
            pass
        raise self.retry(exc=exc, countdown=60 * 5)  # Retry after 5 minutes


def extract_text_from_document(document):
    """Extract text from document using OCR."""
    try:
        from google.cloud import storage as gcs_storage
        import mimetypes
        import pytesseract
        from pdf2image import convert_from_path
        from PIL import Image
        import PyPDF2
        
        # Download file from GCS
        client = gcs_storage.Client()
        bucket = client.bucket(settings.GS_BUCKET_NAME)
        blob = bucket.blob(document.file_path)
        
        with tempfile.NamedTemporaryFile(delete=False) as tmp_file:
            blob.download_to_filename(tmp_file.name)
            file_path = tmp_file.name
        
        mime_type, _ = mimetypes.guess_type(document.file_path)
        extracted_text = ''
        
        try:
            if mime_type and mime_type.startswith('image'):
                img = Image.open(file_path)
                text = pytesseract.image_to_string(img, lang='eng+ara')
                extracted_text = text
                
            elif mime_type == 'application/pdf':
                # Try to extract text directly first (for text-based PDFs)
                try:
                    with open(file_path, 'rb') as f:
                        pdf_reader = PyPDF2.PdfReader(f)
                        text_pages = []
                        for page in pdf_reader.pages:
                            text_pages.append(page.extract_text())
                        
                        direct_text = '\n'.join(text_pages).strip()
                        
                        # If we got substantial text, use it
                        if len(direct_text) > 100:
                            extracted_text = direct_text
                        else:
                            # Fall back to OCR for image-based PDFs
                            images = convert_from_path(file_path)
                            ocr_texts = []
                            for img in images:
                                text = pytesseract.image_to_string(img, lang='eng+ara')
                                ocr_texts.append(text)
                            extracted_text = '\n'.join(ocr_texts)
                            
                except Exception as e:
                    logger.warning(f"PDF text extraction failed, falling back to OCR: {str(e)}")
                    # Fall back to OCR
                    images = convert_from_path(file_path)
                    ocr_texts = []
                    for img in images:
                        text = pytesseract.image_to_string(img, lang='eng+ara')
                        ocr_texts.append(text)
                    extracted_text = '\n'.join(ocr_texts)
            
            else:
                logger.warning(f"Unsupported file type for text extraction: {mime_type}")
                extracted_text = ''
                
        finally:
            # Clean up temporary file
            try:
                os.unlink(file_path)
            except:
                pass
        
        return extracted_text.strip()
        
    except Exception as e:
        logger.error(f"Error extracting text from document {document.id}: {str(e)}")
        return ''


def generate_document_embedding(text):
    """Generate vector embedding for the document text."""
    try:
        if not text or len(text.strip()) < 10:
            logger.warning("Text too short for embedding generation")
            return None
            
        from sentence_transformers import SentenceTransformer
        
        # Load the multilingual model
        model = SentenceTransformer('paraphrase-multilingual-MiniLM-L12-v2')
        
        # Generate embedding
        # Truncate text if too long (model has token limits)
        max_chars = 8000  # Approximately 2000 tokens
        if len(text) > max_chars:
            text = text[:max_chars]
        
        embedding = model.encode([text])[0]
        
        # Convert to list (required for pgvector)
        return embedding.tolist()
        
    except Exception as e:
        logger.error(f"Error generating embedding: {str(e)}")
        return None


def create_analysis_stubs(document):
    """Create stub entries in analysis models to indicate processing completion."""
    try:
        # Create stub semantic analysis
        DocumentAnalysisStatus.objects.update_or_create(
            document=document,
            analysis_type='semantic',
            defaults={
                'status': 'completed',
                'started_at': timezone.now(),
                'completed_at': timezone.now()
            }
        )
        
        # Create stub argument analysis
        DocumentAnalysisStatus.objects.update_or_create(
            document=document,
            analysis_type='argument',
            defaults={
                'status': 'completed',
                'started_at': timezone.now(),
                'completed_at': timezone.now()
            }
        )
        
        # Create a basic semantic topic (placeholder)
        if document.extracted_text:
            # Simple keyword extraction as placeholder
            words = document.extracted_text.lower().split()
            # Get most common words (excluding common stop words)
            stop_words = {'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'dari', 'dan', 'yang', 'adalah', 'dengan', 'untuk', 'dalam', 'pada', 'ke', 'ini', 'itu'}
            filtered_words = [w for w in words if len(w) > 3 and w not in stop_words]
            
            # Count frequency
            word_count = {}
            for word in filtered_words[:100]:  # Limit to first 100 words
                word_count[word] = word_count.get(word, 0) + 1
            
            # Get top keywords
            top_keywords = sorted(word_count.items(), key=lambda x: x[1], reverse=True)[:10]
            keywords = [word for word, count in top_keywords]
            
            if keywords:
                SemanticTopic.objects.create(
                    document=document,
                    topic_keywords=keywords,
                    relevance_score=0.8,  # Placeholder score
                    metadata={'extraction_method': 'simple_frequency', 'total_words': len(words)}
                )
        
        logger.info(f"Created analysis stubs for document {document.id}")
        
    except Exception as e:
        logger.error(f"Error creating analysis stubs for document {document.id}: {str(e)}")


@shared_task(bind=True, max_retries=3)
def process_document_ocr(self, document_id):
    """Process document OCR asynchronously."""
    try:
        from google.cloud import storage as gcs_storage
        import tempfile
        import mimetypes
        import pytesseract
        from pdf2image import convert_from_path
        from PIL import Image
        import PyPDF2
        document = Document.objects.get(id=document_id)
        document.ocr_status = 'processing'
        document.save()
        # Download file from GCS
        client = gcs_storage.Client()
        bucket = client.bucket(settings.GS_BUCKET_NAME)
        blob = bucket.blob(document.file_path)
        with tempfile.NamedTemporaryFile(delete=False) as tmp_file:
            blob.download_to_filename(tmp_file.name)
            file_path = tmp_file.name
        mime_type, _ = mimetypes.guess_type(document.file_path)
        ocr_text = ''
        pages_result = []
        if mime_type and mime_type.startswith('image'):
            img = Image.open(file_path)
            text = pytesseract.image_to_string(img, lang='eng+ara')
            ocr_text = text
            pages_result.append({'page_number': 1, 'text': text, 'confidence': 1.0})
        elif mime_type == 'application/pdf':
            images = convert_from_path(file_path)
            for i, img in enumerate(images):
                text = pytesseract.image_to_string(img, lang='eng+ara')
                ocr_text += text + '\n'
                pages_result.append({'page_number': i+1, 'text': text, 'confidence': 1.0})
        else:
            # For DOCX or other formats, skip or add support as needed
            ocr_text = ''
        # Metadata extraction (PDF example)
        metadata = {}
        if mime_type == 'application/pdf':
            with open(file_path, 'rb') as f:
                pdf_reader = PyPDF2.PdfReader(f)
                info = pdf_reader.metadata
                metadata = {k[1:]: v for k, v in info.items() if k.startswith('/')}
        # Update document with OCR results
        document.ocr_status = 'completed'
        document.ocr_result = {
            'text': ocr_text,
            'pages': pages_result,
        }
        document.metadata = metadata
        document.save()
        # Update latest version metadata
        version = document.versions.order_by('-version_number').first()
        if version:
            version.metadata = metadata
            version.save()
    except Document.DoesNotExist:
        logger.error(f"Document {document_id} not found")
        raise
    except Exception as exc:
        logger.error(f"Error processing OCR for document {document_id}: {str(exc)}")
        document.ocr_status = 'failed'
        document.save()
        raise self.retry(exc=exc, countdown=60 * 5)  # Retry after 5 minutes

@shared_task
def cleanup_old_versions(document_id, keep_versions=5):
    """Clean up old document versions, keeping only the specified number of most recent versions."""
    try:
        document = Document.objects.get(id=document_id)
        versions = document.versions.order_by('-version_number')
        
        # Get versions to delete
        versions_to_delete = versions[keep_versions:]
        
        for version in versions_to_delete:
            # Delete file from storage
            if version.file_path:
                try:
                    default_storage.delete(version.file_path)
                except Exception as e:
                    logger.error(f"Error deleting file {version.file_path}: {str(e)}")
            
            # Delete version record
            version.delete()

    except Document.DoesNotExist:
        logger.error(f"Document {document_id} not found")
    except Exception as e:
        logger.error(f"Error cleaning up versions for document {document_id}: {str(e)}")

@shared_task
def validate_document_checksum(document_id):
    """Validate document checksum against stored file."""
    try:
        document = Document.objects.get(id=document_id)
        
        # Calculate current file hash
        file_hash = hashlib.sha256()
        with default_storage.open(document.file_path, 'rb') as f:
            for chunk in iter(lambda: f.read(4096), b''):
                file_hash.update(chunk)
        
        current_checksum = file_hash.hexdigest()
        
        # Compare with stored checksum
        if current_checksum != document.checksum:
            logger.error(f"Checksum mismatch for document {document_id}")
            # TODO: Implement checksum mismatch handling
            # This might involve notifying administrators or triggering file recovery
            
    except Document.DoesNotExist:
        logger.error(f"Document {document_id} not found")
    except Exception as e:
        logger.error(f"Error validating checksum for document {document_id}: {str(e)}") 