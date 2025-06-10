import http.server
import socketserver
import os
import sys
import signal

PORT = int(os.environ.get("PORT", 8080))  # Read port from environment variable

class HealthCheckHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/healthz' or self.path == '/health':
            try:
                # Basic health check
                self.send_response(200)
                self.send_header("Content-type", "application/json")
                self.send_header("Cache-Control", "no-cache")
                self.end_headers()
                response = {
                    "status": "healthy",
                    "service": "celery-worker",
                    "timestamp": str(os.environ.get("START_TIME", "unknown"))
                }
                import json
                self.wfile.write(json.dumps(response).encode())
                print(f"Health check requested: {self.path} - OK", flush=True)
            except Exception as e:
                self.send_response(500)
                self.send_header("Content-type", "text/plain")
                self.end_headers()
                self.wfile.write(f"Health check failed: {str(e)}".encode())
                print(f"Health check error: {e}", flush=True)
        elif self.path == '/ready':
            # Simple readiness check - just respond OK
            self.send_response(200)
            self.send_header("Content-type", "text/plain")
            self.send_header("Cache-Control", "no-cache")
            self.end_headers()
            self.wfile.write(b"ready")
            print(f"Readiness check requested: {self.path} - ready", flush=True)
        else:
            self.send_response(404)
            self.send_header("Content-type", "text/plain")
            self.end_headers()
            self.wfile.write(b"Not Found")
            print(f"404 request: {self.path}", flush=True)

    def log_message(self, format, *args):
        # Suppress verbose HTTP logs to avoid cluttering Celery output
        return

def signal_handler(sig, frame):
    print("\nHealth server shutting down gracefully...", flush=True)
    sys.exit(0)

# Handle graceful shutdown
signal.signal(signal.SIGINT, signal_handler)
signal.signal(signal.SIGTERM, signal_handler)

try:
    # Allow socket reuse to avoid "Address already in use" errors
    socketserver.TCPServer.allow_reuse_address = True
    
    with socketserver.TCPServer(("", PORT), HealthCheckHandler) as httpd:
        print(f"Health check server listening on port {PORT}", flush=True)
        print(f"Health check endpoints: /healthz, /health, and /ready", flush=True)
        print(f"Server startup time: {os.environ.get('START_TIME', 'unknown')}", flush=True)
        httpd.serve_forever()
except OSError as e:
    if e.errno == 98:  # Address already in use
        print(f"ERROR: Port {PORT} is already in use. Another health server may be running.", flush=True)
    else:
        print(f"ERROR: Failed to start health server on port {PORT}: {e}", flush=True)
    sys.exit(1)
except KeyboardInterrupt:
    print("\nHealth server shutting down due to keyboard interrupt...", flush=True)
    sys.exit(0)
except Exception as e:
    print(f"ERROR: Health server crashed: {e}", flush=True)
    import traceback
    traceback.print_exc()
    sys.exit(1) 