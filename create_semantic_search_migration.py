#!/usr/bin/env python
"""
Standalone script to create TextChunk migration for semantic search feature.
This can be run in production environment with PostgreSQL + pgvector.
"""

import os
import sys
import django
from pathlib import Path

# Add the backend directory to Python path
backend_dir = Path(__file__).parent / 'backend'
sys.path.insert(0, str(backend_dir))

# Set Django settings
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
os.environ.setdefault('USE_POSTGRESQL', 'true')

# Setup Django
django.setup()

from django.core.management import execute_from_command_line

def create_migrations():
    """Create migrations for the TextChunk model."""
    print("Creating migrations for semantic search feature...")
    
    try:
        # Create migrations for documents app
        execute_from_command_line(['manage.py', 'makemigrations', 'documents'])
        print("✅ Migrations created successfully!")
        
        # Run the migrations
        print("Running migrations...")
        execute_from_command_line(['manage.py', 'migrate', '--noinput'])
        print("✅ Migrations applied successfully!")
        
    except Exception as e:
        print(f"❌ Error creating/applying migrations: {e}")
        return False
    
    return True

def verify_setup():
    """Verify that the semantic search setup is working."""
    try:
        from documents.models import TextChunk
        print("✅ TextChunk model imported successfully")
        
        # Test that we can query the model
        count = TextChunk.objects.count()
        print(f"✅ Current TextChunk count: {count}")
        
        return True
    except Exception as e:
        print(f"❌ Error verifying setup: {e}")
        return False

if __name__ == "__main__":
    print("=== Semantic Search Migration Setup ===")
    
    # Create and apply migrations
    if create_migrations():
        print("\n=== Verifying Setup ===")
        if verify_setup():
            print("\n🎉 Semantic search feature is ready for deployment!")
            print("\nNext steps:")
            print("1. Upload Arabic books to Azure Blob Storage")
            print("2. Run: python manage.py process_books --books-dir /path/to/books")
            print("3. Test the semantic search API endpoint")
        else:
            print("\n⚠️ Setup verification failed. Check the error messages above.")
    else:
        print("\n⚠️ Migration creation failed. Check the error messages above.") 