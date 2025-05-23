import http.server
import socketserver
import os

PORT = int(os.environ.get("PORT", 8080)) # Read port from environment variable

class HealthCheckHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/healthz':
            self.send_response(200)
            self.send_header("Content-type", "text/plain")
            self.end_headers()
            self.wfile.write(b"ok")
        else:
            self.send_response(404)
            self.end_headers()
            self.wfile.write(b"Not Found")

    def log_message(self, format, *args):
        # Suppress стали в логи, чтобы не замусоривать вывод Celery
        return

with socketserver.TCPServer(("", PORT), HealthCheckHandler) as httpd:
    print(f"Health check server listening on port {PORT}", flush=True)
    httpd.serve_forever() 