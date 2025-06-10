#!/usr/bin/env python
"""
Test Semantic Search functionality
"""

import json
import numpy as np
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
from pathlib import Path

def test_search(query, embeddings_file="test_embeddings.json"):
    """Test semantic search with a query."""
    print(f"🔍 Testing search query: '{query}'")
    print("-" * 50)
    
    # Load model
    print("🤖 Loading model...")
    model = SentenceTransformer('paraphrase-multilingual-mpnet-base-v2')
    
    # Load test data
    if not Path(embeddings_file).exists():
        print(f"❌ Test data file not found: {embeddings_file}")
        return
    
    with open(embeddings_file, 'r', encoding='utf-8') as f:
        chunks_data = json.load(f)
    
    print(f"📚 Loaded {len(chunks_data)} chunks")
    
    # Generate query embedding
    query_embedding = model.encode(query)
    
    # Calculate similarities
    results = []
    for chunk in chunks_data:
        chunk_embedding = np.array(chunk['embedding'])
        similarity = cosine_similarity(
            query_embedding.reshape(1, -1), 
            chunk_embedding.reshape(1, -1)
        )[0][0]
        
        results.append({
            'kitab_name': chunk['kitab_name'],
            'content_arabic': chunk['content_arabic'],
            'similarity_score': float(similarity),
            'chunk_index': chunk['chunk_index']
        })
    
    # Sort by similarity
    results.sort(key=lambda x: x['similarity_score'], reverse=True)
    
    # Show top 3 results
    print(f"\n📊 Top 3 results for '{query}':")
    for i, result in enumerate(results[:3], 1):
        print(f"\n{i}. Book: {result['kitab_name']}")
        print(f"   Similarity: {result['similarity_score']:.4f}")
        print(f"   Text: {result['content_arabic'][:150]}...")

def main():
    """Main test function."""
    print("🧪 TESTING SEMANTIC SEARCH")
    print("=" * 60)
    
    # Test various queries
    test_queries = [
        "hukum shalat",
        "prayer rules",
        "الصلاة",
        "طهارة",
        "wudhu",
        "اعتكاف"
    ]
    
    for query in test_queries:
        test_search(query)
        print("\n" + "=" * 60)

if __name__ == "__main__":
    main() 