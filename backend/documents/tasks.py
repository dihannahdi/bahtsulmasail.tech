from celery import shared_task
from django.conf import settings
from .models import Document
import logging
import hashlib
from django.core.files.storage import default_storage

logger = logging.getLogger(__name__)

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