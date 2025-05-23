#!/bin/sh

# Start the health check server in the background
python /app/health_server.py &

# Start the Celery worker in the foreground
# Attempt to run as 'nobody' user. Fallback to root if user doesn't exist or command fails.
if id nobody > /dev/null 2>&1; then
  echo "Attempting to run Celery worker as user nobody..."
  celery -A core worker -l INFO --uid=nobody --gid=nogroup || celery -A core worker -l INFO
else
  echo "User nobody not found. Running Celery worker as root (not recommended for production)..."
  celery -A core worker -l INFO
fi 