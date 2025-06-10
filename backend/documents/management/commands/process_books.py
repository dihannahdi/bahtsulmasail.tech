import os
import re
import logging
from pathlib import Path
from django.core.management.base import BaseCommand, CommandError
from django.db import transaction
from sentence_transformers import SentenceTransformer
from documents.models import Document, TextChunk
from django.contrib.auth import get_user_model
import PyPDF2
from pdf2image import convert_from_path
import pytesseract
from PIL import Image
import tempfile

User = get_user_model()

logger = logging.getLogger(__name__)

class Command(BaseCommand):
    help = 'Process Islamic books and generate embeddings for semantic search'

    def add_arguments(self, parser):
        parser.add_argument(
            '--books-dir',
            type=str,
            required=True,
            help='Directory containing PDF books to process'
        )
        parser.add_argument(
            '--chunk-size',
            type=int,
            default=300,
            help='Size of text chunks in words (default: 300)'
        )
        parser.add_argument(
            '--overlap',
            type=int,
            default=50,
            help='Overlap between chunks in words (default: 50)'
        )
        parser.add_argument(
            '--model',
            type=str,
            default='paraphrase-multilingual-mpnet-base-v2',
            help='Sentence transformer model to use'
        )

    def handle(self, *args, **options):
        books_dir = Path(options['books_dir'])
        chunk_size = options['chunk_size']
        overlap = options['overlap']
        model_name = options['model']

        if not books_dir.exists():
            raise CommandError(f"Directory {books_dir} does not exist")

        self.stdout.write(f"Loading embedding model: {model_name}")
        try:
            self.model = SentenceTransformer(model_name)
        except Exception as e:
            raise CommandError(f"Failed to load model {model_name}: {e}")

        # Find all PDF files in the directory
        pdf_files = list(books_dir.glob("*.pdf"))
        if not pdf_files:
            raise CommandError(f"No PDF files found in {books_dir}")

        self.stdout.write(f"Found {len(pdf_files)} PDF files to process")

        for pdf_file in pdf_files:
            try:
                self.process_book(pdf_file, chunk_size, overlap)
            except Exception as e:
                self.stdout.write(
                    self.style.ERROR(f"Failed to process {pdf_file.name}: {e}")
                )
                logger.exception(f"Error processing {pdf_file.name}")

    def process_book(self, pdf_path, chunk_size, overlap):
        """Process a single book PDF"""
        self.stdout.write(f"Processing: {pdf_path.name}")
        
        # Extract book metadata from filename
        kitab_name, author = self.extract_metadata_from_filename(pdf_path.name)
        
        # Check if document already exists
        document = self.get_or_create_document(pdf_path, kitab_name, author)
        
        # Extract text from PDF
        text = self.extract_text_from_pdf(pdf_path)
        if not text.strip():
            self.stdout.write(
                self.style.WARNING(f"No text extracted from {pdf_path.name}")
            )
            return
        
        # Split text into chunks
        chunks = self.split_text_into_chunks(text, chunk_size, overlap)
        
        # Delete existing chunks for this document
        TextChunk.objects.filter(source_document=document).delete()
        
        # Create text chunks with embeddings
        with transaction.atomic():
            for i, chunk_text in enumerate(chunks):
                if chunk_text.strip():  # Only process non-empty chunks
                    # Generate embedding
                    embedding = self.model.encode(chunk_text)
                    
                    # Create TextChunk
                    TextChunk.objects.create(
                        source_document=document,
                        kitab_name=kitab_name,
                        author=author,
                        content_arabic=chunk_text,
                        embedding=embedding.tolist(),
                        chunk_index=i,
                        metadata={
                            'chunk_word_count': len(chunk_text.split()),
                            'original_file': pdf_path.name
                        }
                    )
        
        self.stdout.write(
            self.style.SUCCESS(
                f"Created {len(chunks)} chunks for {pdf_path.name}"
            )
        )

    def extract_metadata_from_filename(self, filename):
        """Extract kitab name and author from filename"""
        # Remove .pdf extension
        name_without_ext = filename.replace('.pdf', '')
        
        # Try to split by common separators for author information
        # Common patterns: "Book Title - Author Name.pdf" or "Book Title (Author).pdf"
        
        if ' - ' in name_without_ext:
            parts = name_without_ext.split(' - ', 1)
            kitab_name = parts[0].strip()
            author = parts[1].strip() if len(parts) > 1 else "مؤلف غير معروف"
        elif ' (' in name_without_ext and ')' in name_without_ext:
            # Extract author from parentheses
            match = re.search(r'(.+?)\s*\((.+?)\)', name_without_ext)
            if match:
                kitab_name = match.group(1).strip()
                author = match.group(2).strip()
            else:
                kitab_name = name_without_ext
                author = "مؤلف غير معروف"
        else:
            # Use entire filename as kitab name
            kitab_name = name_without_ext
            author = "مؤلف غير معروف"  # "Unknown author" in Arabic
        
        return kitab_name, author

    def get_or_create_document(self, pdf_path, kitab_name, author):
        """Get or create a Document instance"""
        # Try to find existing document
        try:
            document = Document.objects.get(
                title=kitab_name,
                metadata__author=author
            )
        except Document.DoesNotExist:
            # Create a default user if none exists
            user, _ = User.objects.get_or_create(
                username='system',
                defaults={
                    'email': 'system@bahtsulmasail.tech',
                    'first_name': 'System',
                    'last_name': 'User'
                }
            )
            
            # Create new document
            document = Document.objects.create(
                title=kitab_name,
                description=f"Islamic book: {kitab_name} by {author}",
                file_path=str(pdf_path),
                file_size=pdf_path.stat().st_size,
                mime_type='application/pdf',
                checksum='',  # Could be calculated if needed
                created_by=user,
                is_public=True,
                language='ar',  # Arabic
                metadata={
                    'author': author,
                    'source_type': 'kitab',
                    'processed_for_search': True
                }
            )
        
        return document

    def extract_text_from_pdf(self, pdf_path):
        """Extract text from PDF using PyPDF2 first, fallback to OCR"""
        text = ""
        
        try:
            # Try PyPDF2 first (for PDFs with embedded text)
            with open(pdf_path, 'rb') as file:
                pdf_reader = PyPDF2.PdfReader(file)
                for page in pdf_reader.pages:
                    text += page.extract_text() + "\n"
            
            # If we got meaningful text, return it
            if len(text.strip()) > 100:  # Arbitrary threshold
                return text
        except Exception as e:
            self.stdout.write(
                self.style.WARNING(f"PyPDF2 extraction failed for {pdf_path.name}: {e}")
            )
        
        # Fallback to OCR if PyPDF2 didn't work well
        return self.extract_text_with_ocr(pdf_path)

    def extract_text_with_ocr(self, pdf_path):
        """Extract text using OCR (for scanned PDFs)"""
        self.stdout.write(f"Using OCR for {pdf_path.name}")
        text = ""
        
        try:
            # Convert PDF to images
            with tempfile.TemporaryDirectory() as temp_dir:
                images = convert_from_path(pdf_path, output_folder=temp_dir)
                
                for i, image in enumerate(images):
                    # Perform OCR on each page
                    page_text = pytesseract.image_to_string(
                        image, 
                        lang='ara+eng',  # Arabic and English
                        config='--psm 1'  # Automatic page segmentation
                    )
                    text += page_text + "\n"
                    
                    # Limit processing for very large documents
                    if i >= 50:  # Limit to first 50 pages
                        self.stdout.write(
                            self.style.WARNING(
                                f"Limited OCR to first 50 pages for {pdf_path.name}"
                            )
                        )
                        break
        except Exception as e:
            self.stdout.write(
                self.style.ERROR(f"OCR extraction failed for {pdf_path.name}: {e}")
            )
        
        return text

    def split_text_into_chunks(self, text, chunk_size, overlap):
        """Split text into overlapping chunks"""
        # Split by sentences and paragraphs first
        # This is a simple approach - could be improved with proper Arabic NLP
        
        # Split by common Arabic sentence endings and paragraph breaks
        sentences = re.split(r'[.。؟!؟]\s+|\n\s*\n', text)
        
        chunks = []
        current_chunk = ""
        word_count = 0
        
        for sentence in sentences:
            sentence = sentence.strip()
            if not sentence:
                continue
                
            sentence_words = sentence.split()
            sentence_word_count = len(sentence_words)
            
            # If adding this sentence would exceed chunk size, save current chunk
            if word_count + sentence_word_count > chunk_size and word_count > 0:
                chunks.append(current_chunk.strip())
                
                # Start new chunk with overlap
                overlap_words = current_chunk.split()[-overlap:] if overlap > 0 else []
                current_chunk = " ".join(overlap_words) + " " + sentence
                word_count = len(overlap_words) + sentence_word_count
            else:
                # Add sentence to current chunk
                current_chunk += " " + sentence if current_chunk else sentence
                word_count += sentence_word_count
        
        # Add the last chunk if it's not empty
        if current_chunk.strip():
            chunks.append(current_chunk.strip())
        
        # Filter out very short chunks
        chunks = [chunk for chunk in chunks if len(chunk.split()) >= 20]
        
        return chunks 