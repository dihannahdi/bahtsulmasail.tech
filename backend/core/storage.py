from django.conf import settings
from storages.backends.gcloud import GoogleCloudStorage
import os
from urllib.parse import urljoin
from google.cloud import storage as gcs_storage
from datetime import timedelta

class MediaStorage(GoogleCloudStorage):
    """
    Custom storage class for media files in Google Cloud Storage.
    Provides more fine-grained control over file storage and retrieval.
    """
    location = settings.GS_LOCATION if hasattr(settings, 'GS_LOCATION') else 'media'
    
    def get_available_name(self, name, max_length=None):
        name = self._normalize_name(name)
        dir_name, file_name = os.path.split(name)
        file_root, file_ext = os.path.splitext(file_name)
        count = 1
        while self.exists(name):
            name = os.path.join(dir_name, f"{file_root}_{count}{file_ext}")
            count += 1
        return name
    
    def url(self, name):
        name = self._normalize_name(self._clean_name(name))
        if settings.GS_DEFAULT_ACL == 'private' and settings.GS_QUERYSTRING_AUTH:
            return self._get_signed_url(name)
        return urljoin(settings.MEDIA_URL, name)

class DocumentStorage(MediaStorage):
    """
    Custom storage class specifically for document files.
    Stores files in a 'documents' subdirectory within the media location.
    """
    location = os.path.join(
        settings.GS_LOCATION if hasattr(settings, 'GS_LOCATION') else 'media',
        'documents'
    )
    def get_valid_name(self, name):
        """
        Returns a filename suitable for use with the underlying storage system.
        Ensures filenames are sanitized and secure.
        """
        return super().get_valid_name(name)

def upload_to_gcs(file, filename):
    """
    Utility to upload a file-like object to GCS using DocumentStorage.
    Returns the GCS path.
    """
    storage = DocumentStorage()
    path = storage.save(filename, file)
    return path

def generate_gcs_signed_url(file_path, expiration_minutes=60):
    """
    Generate a signed URL for a private GCS file.
    """
    client = gcs_storage.Client()
    bucket = client.bucket(settings.GS_BUCKET_NAME)
    blob = bucket.blob(file_path)
    url = blob.generate_signed_url(expiration=timedelta(minutes=expiration_minutes))
    return url
        """
        # First, use the parent class's get_valid_name method
        name = super().get_valid_name(name)
        
        # Then, add a timestamp to ensure uniqueness
        import time
        file_root, file_ext = os.path.splitext(name)
        timestamp = int(time.time())
        return f"{file_root}_{timestamp}{file_ext}"