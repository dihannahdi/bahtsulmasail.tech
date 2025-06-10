#!/usr/bin/env python
"""
Test Processing Script - Process just a few PDF files for testing
"""

import os
import sys
import json
import PyPDF2
from pathlib import Path
from sentence_transformers import SentenceTransformer
import re
import uuid
from datetime import datetime

def extract_text_from_pdf(pdf_path):
    """Extract text from PDF file."""
    try:
        with open(pdf_path, 'rb') as file:
            reader = PyPDF2.PdfReader(file)
            text = ""
            # Only process first 5 pages for testing
            for page_num, page in enumerate(reader.pages[:5]):
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
    text = re.sub(r'[^\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF\s\.\,\:\;\!\?\(\)\[\]\{\}0-9\-]', '', text)
    
    # Remove page markers
    text = re.sub(r'--- Page \d+ ---', '', text)
    
    # Clean up extra spaces
    text = re.sub(r'\s+', ' ', text).strip()
    
    return text

def chunk_text(text, chunk_size=100):  # Smaller chunks for testing
    """Split text into chunks of approximately chunk_size words."""
    if not text:
        return []
    
    words = text.split()
    chunks = []
    
    for i in range(0, len(words), chunk_size):
        chunk = ' '.join(words[i:i + chunk_size])
        if len(chunk.strip()) > 30:  # Only include chunks with substantial content
            chunks.append(chunk.strip())
    
    return chunks

def main():
    """Main test function."""
    print("🧪 TESTING BOOK PROCESSING")
    print("=" * 50)
    
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
    
    # Find PDF files (limit to first 3 for testing)
    pdf_files = list(kitabs_dir.glob("*.pdf"))[:3]
    print(f"📚 Found {len(pdf_files)} PDF files for testing")
    
    if not pdf_files:
        print("❌ No PDF files found in the root of kitabs directory")
        return
    
    # Process each book
    all_chunks = []
    
    for i, pdf_file in enumerate(pdf_files, 1):
        print(f"\n📖 Testing Book {i}: {pdf_file.name}")
        print("-" * 50)
        
        try:
            # Extract text
            text = extract_text_from_pdf(pdf_file)
            if not text:
                print(f"❌ No text extracted")
                continue
            
            # Clean text
            cleaned_text = clean_arabic_text(text)
            if not cleaned_text:
                print(f"❌ No valid Arabic text found")
                continue
            
            print(f"📄 Extracted {len(cleaned_text)} characters")
            
            # Chunk text
            chunks = chunk_text(cleaned_text, 100)
            if not chunks:
                print(f"❌ No chunks created")
                continue
            
            print(f"✂️ Created {len(chunks)} chunks")
            
            # Process only first 3 chunks for testing
            for j, chunk in enumerate(chunks[:3]):
                try:
                    # Generate embedding
                    embedding = model.encode(chunk)
                    
                    chunk_data = {
                        "id": str(uuid.uuid4()),
                        "kitab_name": pdf_file.stem,
                        "author": "Test Author",
                        "content_arabic": chunk,
                        "embedding": embedding.tolist(),
                        "chunk_index": j,
                        "metadata": {
                            "file_path": str(pdf_file),
                            "chunk_length": len(chunk),
                            "processed_at": datetime.now().isoformat()
                        }
                    }
                    all_chunks.append(chunk_data)
                    print(f"   ✅ Processed chunk {j + 1}")
                    
                except Exception as e:
                    print(f"   ❌ Error processing chunk {j}: {e}")
                    continue
                    
        except Exception as e:
            print(f"❌ Error processing {pdf_file.name}: {e}")
            continue
    
    # Save test results
    if all_chunks:
        with open('test_embeddings.json', 'w', encoding='utf-8') as f:
            json.dump(all_chunks, f, ensure_ascii=False, indent=2)
        
        print(f"\n🎉 Test completed successfully!")
        print(f"📊 Total chunks processed: {len(all_chunks)}")
        print(f"💾 Test data saved to: test_embeddings.json")
        
        # Show sample chunk
        sample = all_chunks[0]
        print(f"\n📝 Sample chunk:")
        print(f"   Book: {sample['kitab_name']}")
        print(f"   Text: {sample['content_arabic'][:100]}...")
        print(f"   Embedding size: {len(sample['embedding'])}")
        
    else:
        print("❌ No chunks were created during testing")

if __name__ == "__main__":
    main() 