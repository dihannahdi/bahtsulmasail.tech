#!/usr/bin/env python

import os
import sys
import django

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

def test_celery_connectivity():
    """Test Celery and Redis connectivity"""
    print("Testing Celery configuration...")
    
    try:
        # Test basic imports
        from core.celery import app
        print(f"✓ Celery app loaded: {app}")
        
        # Test Redis connection (avoiding Django DB connection)
        redis_host = os.environ.get('REDIS_HOST', 'localhost')
        redis_port = int(os.environ.get('REDIS_PORT', '6379'))
        
        print(f"✓ Broker URL: redis://{redis_host}:{redis_port}/0")
        
        # Test Redis connectivity with retry logic
        import redis
        max_retries = 5
        for attempt in range(max_retries):
            try:
                r = redis.Redis(host=redis_host, port=redis_port, socket_connect_timeout=5)
                r.ping()
                print(f"✓ Redis connection successful: {redis_host}:{redis_port}")
                break
            except Exception as redis_error:
                if attempt == max_retries - 1:
                    raise redis_error
                print(f"  Redis connection attempt {attempt + 1} failed, retrying...")
                import time
                time.sleep(2)
        
        # Test basic Celery app configuration
        print(f"✓ Celery task serializer: {app.conf.task_serializer}")
        print(f"✓ Celery result backend: {app.conf.result_backend}")
        print(f"✓ Celery broker URL: {app.conf.broker_url}")
        
        # Test Celery worker can be instantiated
        try:
            from celery.worker import worker
            print("✓ Celery worker class available")
        except ImportError as e:
            print(f"⚠ Warning: Celery worker import issue: {e}")
        
        print("\n✓ All Celery tests passed!")
        return True
        
    except Exception as e:
        print(f"✗ Celery test failed: {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    success = test_celery_connectivity()
    sys.exit(0 if success else 1) 