import http.server
import socketserver
import os
import sys
import signal

PORT = int(os.environ.get("PORT", 8080))  # Read port from environment variable

class HealthCheckHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/healthz' or self.path == '/health':
            self.send_response(200)
            self.send_header("Content-type", "text/plain")
            self.send_header("Cache-Control", "no-cache")
            self.end_headers()
            response = "Celery worker health check: OK"
            self.wfile.write(response.encode())
            print(f"Health check requested: {self.path} - OK", flush=True)
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
    with socketserver.TCPServer(("", PORT), HealthCheckHandler) as httpd:
        print(f"Health check server listening on port {PORT}", flush=True)
        print(f"Health check endpoints: /healthz and /health", flush=True)
        httpd.serve_forever()
except OSError as e:
    print(f"ERROR: Failed to start health server on port {PORT}: {e}", flush=True)
    sys.exit(1)
except Exception as e:
    print(f"ERROR: Health server crashed: {e}", flush=True)
    sys.exit(1) 