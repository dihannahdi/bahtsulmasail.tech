#!/bin/bash
set -e

# Set start time for health checks
export START_TIME=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

echo "Starting Celery worker container at $START_TIME..."

# Cleanup function for graceful shutdown
cleanup() {
    echo "Received shutdown signal, cleaning up..."
    if [ ! -z "$HEALTH_PID" ] && kill -0 $HEALTH_PID 2>/dev/null; then
        echo "Stopping health check server (PID: $HEALTH_PID)..."
        kill $HEALTH_PID 2>/dev/null || true
        wait $HEALTH_PID 2>/dev/null || true
    fi
    echo "Cleanup completed"
    exit 0
}

# Set up signal handlers
trap cleanup SIGTERM SIGINT

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

# Wait a moment for health server to start and test it
sleep 3

# Check if health server started successfully
if ! kill -0 $HEALTH_PID 2>/dev/null; then
    echo "ERROR: Health check server failed to start"
    exit 1
fi

# Test health check server
max_health_retries=10
retry_count=0
while [ $retry_count -lt $max_health_retries ]; do
    if curl -f http://localhost:$PORT/healthz 2>/dev/null; then
        echo "Health check server is responding successfully"
        break
    else
        echo "Waiting for health server to respond... (attempt $((retry_count + 1))/$max_health_retries)"
        sleep 1
        retry_count=$((retry_count + 1))
    fi
done

if [ $retry_count -eq $max_health_retries ]; then
    echo "ERROR: Health check server is not responding after $max_health_retries attempts"
    kill $HEALTH_PID 2>/dev/null || true
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
echo "Celery worker configuration:"
echo "  - Concurrency: 2"
echo "  - Log Level: INFO" 
echo "  - Redis: ${REDIS_HOST}:${REDIS_PORT}"

# Start Celery worker with improved configuration for Cloud Run
celery -A core worker \
    --loglevel=INFO \
    --concurrency=2 \
    --without-gossip \
    --without-mingle \
    --without-heartbeat \
    --pool=solo 