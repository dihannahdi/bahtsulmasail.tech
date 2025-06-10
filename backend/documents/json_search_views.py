"""
JSON-based Semantic Search Views
This module provides semantic search functionality using pre-processed JSON data
instead of database models, for cases where migrations are not yet available.
"""

import json
import numpy as np
from pathlib import Path
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import logging

logger = logging.getLogger(__name__)

# Global variables for caching
_model = None
_chunks_data = None
_search_index = None

def load_model():
    """Load sentence transformer model."""
    global _model
    if _model is None:
        try:
            _model = SentenceTransformer('paraphrase-multilingual-mpnet-base-v2')
            logger.info("Semantic search model loaded successfully")
        except Exception as e:
            logger.error(f"Error loading model: {e}")
            raise
    return _model

def load_chunks_data():
    """Load processed chunks data from JSON file."""
    global _chunks_data
    if _chunks_data is None:
        try:
            # Look for the JSON file in project root
            json_file = Path(__file__).parent.parent.parent / "kitabs_embeddings.json"
            if not json_file.exists():
                logger.warning(f"Chunks data file not found: {json_file}")
                return None
            
            with open(json_file, 'r', encoding='utf-8') as f:
                _chunks_data = json.load(f)
            
            logger.info(f"Loaded {len(_chunks_data)} chunks from {json_file}")
        except Exception as e:
            logger.error(f"Error loading chunks data: {e}")
            return None
    
    return _chunks_data

def load_search_index():
    """Load search index from JSON file."""
    global _search_index
    if _search_index is None:
        try:
            # Look for the index file in project root
            index_file = Path(__file__).parent.parent.parent / "kitabs_search_index.json"
            if not index_file.exists():
                logger.warning(f"Search index file not found: {index_file}")
                return None
            
            with open(index_file, 'r', encoding='utf-8') as f:
                _search_index = json.load(f)
            
            logger.info(f"Loaded search index with {_search_index.get('total_chunks', 0)} chunks")
        except Exception as e:
            logger.error(f"Error loading search index: {e}")
            return None
    
    return _search_index

@api_view(['POST'])
def json_semantic_search(request):
    """
    Perform semantic search using pre-processed JSON data.
    
    Expected payload:
    {
        "q": "search query in Indonesian or English",
        "limit": 10,
        "threshold": 0.7
    }
    """
    try:
        # Get parameters
        query = request.data.get('q', '').strip()
        limit = int(request.data.get('limit', 10))
        threshold = float(request.data.get('threshold', 0.7))
        
        if not query:
            return Response(
                {"error": "Query parameter 'q' is required"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Load model and data
        model = load_model()
        chunks_data = load_chunks_data()
        
        if not chunks_data:
            return Response(
                {"error": "Semantic search data not available. Books need to be processed first."}, 
                status=status.HTTP_503_SERVICE_UNAVAILABLE
            )
        
        # Generate query embedding
        query_embedding = model.encode(query)
        
        # Calculate similarities
        results = []
        for chunk in chunks_data:
            try:
                # Convert stored embedding back to numpy array
                chunk_embedding = np.array(chunk['embedding'])
                
                # Calculate cosine similarity
                similarity = cosine_similarity(
                    query_embedding.reshape(1, -1), 
                    chunk_embedding.reshape(1, -1)
                )[0][0]
                
                if similarity >= threshold:
                    results.append({
                        'id': chunk['id'],
                        'kitab_name': chunk['kitab_name'],
                        'author': chunk['author'],
                        'ibaroh': chunk['content_arabic'],  # Arabic text
                        'terjemahan': f"[Terjemahan otomatis akan ditambahkan] {chunk['content_arabic'][:100]}...",  # Placeholder translation
                        'similarity_score': float(similarity),
                        'chunk_index': chunk['chunk_index'],
                        'metadata': chunk.get('metadata', {})
                    })
            except Exception as e:
                logger.warning(f"Error processing chunk {chunk.get('id', 'unknown')}: {e}")
                continue
        
        # Sort by similarity and limit results
        results.sort(key=lambda x: x['similarity_score'], reverse=True)
        results = results[:limit]
        
        # Prepare response
        response_data = {
            'query': query,
            'total_results': len(results),
            'results': results,
            'search_metadata': {
                'threshold': threshold,
                'limit': limit,
                'total_chunks_searched': len(chunks_data),
                'model_used': 'paraphrase-multilingual-mpnet-base-v2'
            }
        }
        
        return Response(response_data, status=status.HTTP_200_OK)
        
    except Exception as e:
        logger.error(f"Error in semantic search: {e}")
        return Response(
            {"error": f"Internal server error: {str(e)}"}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
def search_stats(request):
    """Get statistics about the available search data."""
    try:
        chunks_data = load_chunks_data()
        search_index = load_search_index()
        
        if not chunks_data:
            return Response(
                {"error": "No search data available"}, 
                status=status.HTTP_503_SERVICE_UNAVAILABLE
            )
        
        # Basic statistics
        stats = {
            'total_chunks': len(chunks_data),
            'total_books': len(search_index.get('books', {})) if search_index else 0,
            'total_authors': len(search_index.get('authors', {})) if search_index else 0,
            'data_available': True
        }
        
        # Book statistics
        if search_index:
            books_info = []
            for book_name, book_data in search_index.get('books', {}).items():
                books_info.append({
                    'name': book_name,
                    'author': book_data.get('author', 'Unknown'),
                    'chunk_count': book_data.get('chunk_count', 0)
                })
            
            # Sort by chunk count
            books_info.sort(key=lambda x: x['chunk_count'], reverse=True)
            stats['books'] = books_info[:20]  # Top 20 books
            
            # Author statistics
            authors_info = []
            for author_name, author_data in search_index.get('authors', {}).items():
                authors_info.append({
                    'name': author_name,
                    'book_count': len(author_data.get('books', [])),
                    'chunk_count': author_data.get('chunk_count', 0)
                })
            
            authors_info.sort(key=lambda x: x['chunk_count'], reverse=True)
            stats['authors'] = authors_info
        
        return Response(stats, status=status.HTTP_200_OK)
        
    except Exception as e:
        logger.error(f"Error getting search stats: {e}")
        return Response(
            {"error": f"Internal server error: {str(e)}"}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
def health_check(request):
    """Check if semantic search is ready."""
    try:
        model = load_model()
        chunks_data = load_chunks_data()
        
        health_status = {
            'model_loaded': model is not None,
            'data_loaded': chunks_data is not None,
            'total_chunks': len(chunks_data) if chunks_data else 0,
            'ready': model is not None and chunks_data is not None
        }
        
        status_code = status.HTTP_200_OK if health_status['ready'] else status.HTTP_503_SERVICE_UNAVAILABLE
        
        return Response(health_status, status=status_code)
        
    except Exception as e:
        return Response(
            {
                'model_loaded': False,
                'data_loaded': False,
                'ready': False,
                'error': str(e)
            }, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        ) 