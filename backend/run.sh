#!/bin/bash
set -e

echo "Starting Celery worker container..."

# Validate required environment variables
required_vars="REDIS_HOST REDIS_PORT DJANGO_SETTINGS_MODULE"
for var in $required_vars; do
    if [ -z "${!var}" ]; then
        echo "ERROR: Required environment variable $var is not set"
        exit 1
    fi
done

# Get the port from environment or default to 8080
PORT=${PORT:-8080}
echo "Health check server will listen on port $PORT"
echo "Environment: REDIS_HOST=${REDIS_HOST}, REDIS_PORT=${REDIS_PORT}"

# Wait for dependencies (Redis)
echo "Checking Redis connection..."
max_retries=30
retry_count=0
while [ $retry_count -lt $max_retries ]; do
    if python -c "import redis; r = redis.Redis(host='${REDIS_HOST:-localhost}', port=${REDIS_PORT:-6379}, socket_connect_timeout=5); r.ping()" 2>/dev/null; then
        echo "Redis connection successful"
        break
    else
        echo "Waiting for Redis... (attempt $((retry_count + 1))/$max_retries)"
        sleep 2
        retry_count=$((retry_count + 1))
    fi
done

if [ $retry_count -eq $max_retries ]; then
    echo "ERROR: Could not connect to Redis after $max_retries attempts"
    exit 1
fi

# Start the health check server in the background
echo "Starting health check server on port $PORT..."
python /app/health_server.py &
HEALTH_PID=$!

# Wait a moment for health server to start
sleep 2

# Check if health server started successfully
if ! kill -0 $HEALTH_PID 2>/dev/null; then
    echo "ERROR: Health check server failed to start"
    exit 1
fi

echo "Health check server started successfully (PID: $HEALTH_PID)"

# Test Celery configuration
echo "Testing Celery configuration..."
if ! python /app/test_celery.py; then
    echo "ERROR: Celery configuration test failed"
    kill $HEALTH_PID 2>/dev/null || true
    exit 1
fi

# Start the Celery worker in the foreground
echo "Starting Celery worker..."
exec celery -A core worker -l INFO --concurrency=2 --without-gossip --without-mingle --without-heartbeat 