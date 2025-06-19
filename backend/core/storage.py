from django.conf import settings
from django.core.files.storage import Storage
from azure.storage.blob import BlobServiceClient, generate_blob_sas, BlobSasPermissions
from datetime import datetime, timedelta
import os
from urllib.parse import urljoin

class AzureBlobStorage(Storage):
    """
    Custom storage class for media files in Azure Blob Storage.
    Provides more fine-grained control over file storage and retrieval.
    """
    
    def __init__(self, location=None):
        self.location = location or getattr(settings, 'AZURE_LOCATION', 'media')
        self.account_name = getattr(settings, 'AZURE_ACCOUNT_NAME', None)
        self.account_key = getattr(settings, 'AZURE_ACCOUNT_KEY', None)
        self.container_name = getattr(settings, 'AZURE_CONTAINER_NAME', None)
        
        if self.account_name and self.account_key and self.container_name:
            self.blob_service_client = BlobServiceClient(
                account_url=f"https://{self.account_name}.blob.core.windows.net",
                credential=self.account_key
            )
        else:
            self.blob_service_client = None
    
    def _get_blob_name(self, name):
        """Get full blob name including location prefix"""
        return os.path.join(self.location, name).replace('\\', '/')
    
    def _open(self, name, mode='rb'):
        """Open file from Azure Blob Storage"""
        if not self.blob_service_client:
            raise ValueError("Azure Blob Storage not properly configured")
        
        blob_name = self._get_blob_name(name)
        blob_client = self.blob_service_client.get_blob_client(
            container=self.container_name, 
            blob=blob_name
        )
        
        try:
            blob_data = blob_client.download_blob().readall()
            from django.core.files.base import ContentFile
            return ContentFile(blob_data)
        except Exception as e:
            raise FileNotFoundError(f"File {name} not found in Azure Blob Storage: {e}")
    
    def _save(self, name, content):
        """Save file to Azure Blob Storage"""
        if not self.blob_service_client:
            raise ValueError("Azure Blob Storage not properly configured")
        
        blob_name = self._get_blob_name(name)
        blob_client = self.blob_service_client.get_blob_client(
            container=self.container_name, 
            blob=blob_name
        )
        
        # Reset content position if it's a file-like object
        if hasattr(content, 'seek'):
            content.seek(0)
        
        blob_client.upload_blob(content, overwrite=True)
        return name
    
    def delete(self, name):
        """Delete file from Azure Blob Storage"""
        if not self.blob_service_client:
            return
        
        blob_name = self._get_blob_name(name)
        blob_client = self.blob_service_client.get_blob_client(
            container=self.container_name, 
            blob=blob_name
        )
        
        try:
            blob_client.delete_blob()
        except Exception:
            pass  # File might not exist
    
    def exists(self, name):
        """Check if file exists in Azure Blob Storage"""
        if not self.blob_service_client:
            return False
        
        blob_name = self._get_blob_name(name)
        blob_client = self.blob_service_client.get_blob_client(
            container=self.container_name, 
            blob=blob_name
        )
        
        try:
            blob_client.get_blob_properties()
            return True
        except Exception:
            return False
    
    def size(self, name):
        """Get file size from Azure Blob Storage"""
        if not self.blob_service_client:
            return 0
        
        blob_name = self._get_blob_name(name)
        blob_client = self.blob_service_client.get_blob_client(
            container=self.container_name, 
            blob=blob_name
        )
        
        try:
            properties = blob_client.get_blob_properties()
            return properties.size
        except Exception:
            return 0
    
    def url(self, name):
        """Get URL for file in Azure Blob Storage"""
        if not self.blob_service_client:
            return ""
        
        blob_name = self._get_blob_name(name)
        
        # Generate SAS token for private access
        if getattr(settings, 'AZURE_DEFAULT_ACL', 'private') == 'private':
            return self._get_signed_url(blob_name)
        
        # Return public URL
        return f"https://{self.account_name}.blob.core.windows.net/{self.container_name}/{blob_name}"
    
    def _get_signed_url(self, blob_name, expiration_hours=1):
        """Generate a signed URL for private blob access"""
        sas_token = generate_blob_sas(
            account_name=self.account_name,
            container_name=self.container_name,
            blob_name=blob_name,
            account_key=self.account_key,
            permission=BlobSasPermissions(read=True),
            expiry=datetime.utcnow() + timedelta(hours=expiration_hours)
        )
        
        return f"https://{self.account_name}.blob.core.windows.net/{self.container_name}/{blob_name}?{sas_token}"
    
    def get_available_name(self, name, max_length=None):
        """Get an available name for the file"""
        dir_name, file_name = os.path.split(name)
        file_root, file_ext = os.path.splitext(file_name)
        count = 1
        while self.exists(name):
            name = os.path.join(dir_name, f"{file_root}_{count}{file_ext}")
            count += 1
        return name

class MediaStorage(AzureBlobStorage):
    """
    Custom storage class for media files in Azure Blob Storage.
    """
    def __init__(self):
        super().__init__(location=getattr(settings, 'AZURE_LOCATION', 'media'))

class DocumentStorage(AzureBlobStorage):
    """
    Custom storage class specifically for document files.
    Stores files in a 'documents' subdirectory within the media location.
    """
    def __init__(self):
        super().__init__(location=os.path.join(
            getattr(settings, 'AZURE_LOCATION', 'media'),
            'documents'
        ))

def upload_to_azure(file, filename):
    """
    Utility to upload a file-like object to Azure Blob Storage using DocumentStorage.
    Returns the blob path.
    """
    storage = DocumentStorage()
    path = storage.save(filename, file)
    return path

def generate_azure_signed_url(file_path, expiration_hours=1):
    """
    Generate a signed URL for a private Azure blob.
    """
    storage = DocumentStorage()
    return storage._get_signed_url(file_path, expiration_hours)