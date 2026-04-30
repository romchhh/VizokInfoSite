#!/bin/bash
# Скрипт для діагностики проблем з ngrok

echo "🔍 Debugging ngrok setup..."

# Перевірка встановлення ngrok
echo "1. Checking ngrok installation:"
which ngrok
ngrok version

echo ""
echo "2. Checking ngrok config:"
ngrok config check

echo ""
echo "3. Testing ngrok manually:"
echo "Starting ngrok for 10 seconds..."
timeout 10s ngrok http 8001 --log stdout || echo "Ngrok failed to start"

echo ""
echo "4. Checking if port 8001 is available:"
netstat -tlnp | grep :8001 || echo "Port 8001 is not in use"

echo ""
echo "5. Checking ngrok auth:"
cat ~/.ngrok2/ngrok.yml 2>/dev/null || echo "No ngrok config found"

echo ""
echo "6. Testing simple HTTP server on port 8001:"
python3 -c "
import http.server
import socketserver
import threading
import time

def start_server():
    with socketserver.TCPServer(('', 8001), http.server.SimpleHTTPRequestHandler) as httpd:
        httpd.timeout = 5
        httpd.handle_request()

server_thread = threading.Thread(target=start_server)
server_thread.start()
time.sleep(1)
print('Test server started on port 8001')
server_thread.join()
" &

sleep 2
curl -s http://localhost:8001 > /dev/null && echo "✅ Port 8001 is accessible" || echo "❌ Port 8001 is not accessible"

echo ""
echo "�� Debug complete!" 