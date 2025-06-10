#!/usr/bin/env python
"""
Standalone Script to Process Arabic Books for Semantic Search
This script processes all PDF files in the kitabs directory and creates embeddings.
"""

import os
import sys
import json
import PyPDF2
import hashlib
from pathlib import Path
from sentence_transformers import SentenceTransformer
import re
import uuid
from datetime import datetime

# Add the backend directory to Python path
backend_dir = Path(__file__).parent / 'backend'
sys.path.insert(0, str(backend_dir))

def setup_django():
    """Setup Django environment."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
    import django
    django.setup()

def extract_text_from_pdf(pdf_path):
    """Extract text from PDF file."""
    try:
        with open(pdf_path, 'rb') as file:
            reader = PyPDF2.PdfReader(file)
            text = ""
            for page_num, page in enumerate(reader.pages):
                try:
                    page_text = page.extract_text()
                    if page_text:
                        text += f"\n--- Page {page_num + 1} ---\n"
                        text += page_text
                except Exception as e:
                    print(f"Warning: Could not extract text from page {page_num + 1}: {e}")
                    continue
            return text
    except Exception as e:
        print(f"Error extracting text from {pdf_path}: {e}")
        return ""

def clean_arabic_text(text):
    """Clean and normalize Arabic text."""
    if not text:
        return ""
    
    # Remove extra whitespaces and normalize
    text = re.sub(r'\s+', ' ', text)
    
    # Remove non-Arabic characters except spaces, punctuation, and numbers
    # Keep Arabic, spaces, common punctuation, and numbers
    text = re.sub(r'[^\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF\s\.\,\:\;\!\?\(\)\[\]\{\}0-9\-]', '', text)
    
    # Remove page markers
    text = re.sub(r'--- Page \d+ ---', '', text)
    
    # Clean up extra spaces
    text = re.sub(r'\s+', ' ', text).strip()
    
    return text

def chunk_text(text, chunk_size=250):
    """Split text into chunks of approximately chunk_size words."""
    if not text:
        return []
    
    words = text.split()
    chunks = []
    
    for i in range(0, len(words), chunk_size):
        chunk = ' '.join(words[i:i + chunk_size])
        if len(chunk.strip()) > 50:  # Only include chunks with substantial content
            chunks.append(chunk.strip())
    
    return chunks

def get_book_metadata(file_path):
    """Extract book metadata from file path and name."""
    file_name = Path(file_path).stem
    
    # Try to extract meaningful book name from Arabic filename
    kitab_name = file_name
    author = "Unknown"
    
    # Common patterns in Arabic book titles
    if "للشافعي" in kitab_name:
        author = "الإمام الشافعي"
    elif "للنووي" in kitab_name:
        author = "الإمام النووي"
    elif "للماوردي" in kitab_name:
        author = "الماوردي"
    elif "للغزالي" in kitab_name:
        author = "الإمام الغزالي"
    
    return {
        "kitab_name": kitab_name,
        "author": author,
        "file_path": str(file_path),
        "file_size": Path(file_path).stat().st_size if Path(file_path).exists() else 0
    }

def process_single_book(file_path, model, chunk_size=250):
    """Process a single book and return chunks with embeddings."""
    print(f"\n📚 Processing: {Path(file_path).name}")
    
    # Extract text
    text = extract_text_from_pdf(file_path)
    if not text:
        print(f"❌ No text extracted from {file_path}")
        return []
    
    # Clean text
    cleaned_text = clean_arabic_text(text)
    if not cleaned_text:
        print(f"❌ No valid Arabic text found in {file_path}")
        return []
    
    print(f"📄 Extracted {len(cleaned_text)} characters of text")
    
    # Get metadata
    metadata = get_book_metadata(file_path)
    
    # Chunk text
    chunks = chunk_text(cleaned_text, chunk_size)
    if not chunks:
        print(f"❌ No chunks created from {file_path}")
        return []
    
    print(f"✂️ Created {len(chunks)} text chunks")
    
    # Generate embeddings
    processed_chunks = []
    for i, chunk in enumerate(chunks):
        try:
            # Generate embedding
            embedding = model.encode(chunk)
            
            chunk_data = {
                "id": str(uuid.uuid4()),
                "kitab_name": metadata["kitab_name"],
                "author": metadata["author"],
                "content_arabic": chunk,
                "embedding": embedding.tolist(),  # Convert to list for JSON serialization
                "chunk_index": i,
                "metadata": {
                    "file_path": metadata["file_path"],
                    "file_size": metadata["file_size"],
                    "chunk_length": len(chunk),
                    "processed_at": datetime.now().isoformat()
                }
            }
            processed_chunks.append(chunk_data)
            
            if (i + 1) % 10 == 0:
                print(f"   📊 Processed {i + 1}/{len(chunks)} chunks")
                
        except Exception as e:
            print(f"❌ Error processing chunk {i}: {e}")
            continue
    
    print(f"✅ Successfully processed {len(processed_chunks)} chunks")
    return processed_chunks

def save_chunks_to_json(all_chunks, output_file="processed_books_data.json"):
    """Save all processed chunks to a JSON file."""
    try:
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(all_chunks, f, ensure_ascii=False, indent=2)
        print(f"💾 Saved {len(all_chunks)} chunks to {output_file}")
        return True
    except Exception as e:
        print(f"❌ Error saving to JSON: {e}")
        return False

def create_search_index(chunks_data, output_file="search_index.json"):
    """Create a simplified search index for quick lookup."""
    index = {
        "total_chunks": len(chunks_data),
        "books": {},
        "authors": {},
        "chunk_ids": [chunk["id"] for chunk in chunks_data]
    }
    
    for chunk in chunks_data:
        kitab = chunk["kitab_name"]
        author = chunk["author"]
        
        if kitab not in index["books"]:
            index["books"][kitab] = {
                "author": author,
                "chunk_count": 0,
                "chunk_ids": []
            }
        
        index["books"][kitab]["chunk_count"] += 1
        index["books"][kitab]["chunk_ids"].append(chunk["id"])
        
        if author not in index["authors"]:
            index["authors"][author] = {
                "books": set(),
                "chunk_count": 0
            }
        
        index["authors"][author]["books"].add(kitab)
        index["authors"][author]["chunk_count"] += 1
    
    # Convert sets to lists for JSON serialization
    for author in index["authors"]:
        index["authors"][author]["books"] = list(index["authors"][author]["books"])
    
    try:
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(index, f, ensure_ascii=False, indent=2)
        print(f"📇 Created search index: {output_file}")
        return True
    except Exception as e:
        print(f"❌ Error creating search index: {e}")
        return False

def main():
    """Main processing function."""
    print("🚀 PROCESSING ARABIC BOOKS FOR SEMANTIC SEARCH")
    print("=" * 80)
    
    # Define paths
    kitabs_dir = Path("public/kitabs")
    if not kitabs_dir.exists():
        print(f"❌ Kitabs directory not found: {kitabs_dir}")
        return
    
    # Load sentence transformer model
    print("🤖 Loading sentence transformer model...")
    try:
        model = SentenceTransformer('paraphrase-multilingual-mpnet-base-v2')
        print("✅ Model loaded successfully")
    except Exception as e:
        print(f"❌ Error loading model: {e}")
        return
    
    # Find all PDF files
    pdf_files = list(kitabs_dir.glob("**/*.pdf"))
    print(f"📚 Found {len(pdf_files)} PDF files to process")
    
    if not pdf_files:
        print("❌ No PDF files found in the kitabs directory")
        return
    
    # Process each book
    all_chunks = []
    processed_books = 0
    
    for i, pdf_file in enumerate(pdf_files, 1):
        print(f"\n{'='*60}")
        print(f"📖 Book {i}/{len(pdf_files)}: {pdf_file.name}")
        print(f"{'='*60}")
        
        try:
            chunks = process_single_book(pdf_file, model)
            if chunks:
                all_chunks.extend(chunks)
                processed_books += 1
                print(f"✅ Successfully processed: {pdf_file.name}")
            else:
                print(f"⚠️ No chunks generated for: {pdf_file.name}")
        except Exception as e:
            print(f"❌ Error processing {pdf_file.name}: {e}")
            continue
        
        # Save progress every 5 books
        if processed_books % 5 == 0:
            print(f"\n💾 Saving progress... ({len(all_chunks)} chunks so far)")
            save_chunks_to_json(all_chunks, f"progress_backup_{processed_books}.json")
    
    # Final results
    print("\n" + "="*80)
    print("📊 PROCESSING COMPLETE")
    print("="*80)
    print(f"📚 Books processed: {processed_books}/{len(pdf_files)}")
    print(f"📄 Total chunks created: {len(all_chunks)}")
    
    if all_chunks:
        # Save final data
        save_chunks_to_json(all_chunks, "kitabs_embeddings.json")
        create_search_index(all_chunks, "kitabs_search_index.json")
        
        # Statistics
        books_stats = {}
        for chunk in all_chunks:
            book = chunk["kitab_name"]
            if book not in books_stats:
                books_stats[book] = 0
            books_stats[book] += 1
        
        print(f"\n📈 Books with most chunks:")
        sorted_books = sorted(books_stats.items(), key=lambda x: x[1], reverse=True)
        for book, count in sorted_books[:10]:
            print(f"   📚 {book}: {count} chunks")
        
        print(f"\n🎉 Semantic search data ready!")
        print(f"   💾 Main data: kitabs_embeddings.json")
        print(f"   📇 Search index: kitabs_search_index.json")
        print(f"\nNext steps:")
        print(f"   1. Upload JSON files to your production environment")
        print(f"   2. Create API endpoint to load and search this data")
        print(f"   3. Test semantic search functionality")
        
    else:
        print("❌ No chunks were created. Check the PDF files and processing logic.")

if __name__ == "__main__":
    main() 