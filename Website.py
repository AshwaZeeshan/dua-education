from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer


class SecureStaticHandler(SimpleHTTPRequestHandler):
    """Serve the static site with conservative browser security headers."""

    def end_headers(self):
        self.send_header("X-Content-Type-Options", "nosniff")
        self.send_header("X-Frame-Options", "DENY")
        self.send_header("Referrer-Policy", "strict-origin-when-cross-origin")
        self.send_header("Permissions-Policy", "geolocation=(), microphone=(), camera=()")
        self.send_header(
            "Content-Security-Policy",
            "default-src 'self'; "
            "img-src 'self' data: https://images.unsplash.com https://www.isacademy.net https://www.mekomit.co.il; "
            "style-src 'self'; "
            "script-src 'self'; "
            "object-src 'none'; "
            "base-uri 'self'; "
            "form-action 'self'",
        )
        super().end_headers()


if __name__ == "__main__":
    host = "127.0.0.1"
    port = 8000
    server = ThreadingHTTPServer((host, port), SecureStaticHandler)
    print(f"Education website running at http://{host}:{port}")
    server.serve_forever()
