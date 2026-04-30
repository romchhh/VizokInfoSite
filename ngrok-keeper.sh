#!/bin/bash
# Скрипт для постійного запуску ngrok з автоперезапуском

LOGFILE="/var/log/ngrok-keeper.log"
PIDFILE="/var/run/ngrok-keeper.pid"

# Функція логування
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOGFILE"
}

# Функція очищення при виході
cleanup() {
    log "🛑 Stopping ngrok keeper..."
    if [ -f "$PIDFILE" ]; then
        rm "$PIDFILE"
    fi
    pkill -f "ngrok http 8001"
    exit 0
}

# Обробка сигналів
trap cleanup SIGTERM SIGINT

# Збереження PID
echo $$ > "$PIDFILE"

log "🚀 Starting ngrok keeper..."

while true; do
    log "▶️ Starting ngrok tunnel..."
    
    # Перевірка чи ngrok встановлений
    if ! command -v ngrok &> /dev/null; then
        log "❌ Ngrok not found! Please install ngrok first."
        exit 1
    fi
    
    # Перевірка чи порт 8001 доступний
    if ! nc -z localhost 8001 2>/dev/null; then
        log "⚠️ Warning: Port 8001 is not responding. Make sure your webhook server is running."
    fi
    
    # Запуск ngrok з детальним логуванням
    log "🔧 Running: ngrok http 8001 --log stdout"
    ngrok http 8001 --log stdout 2>&1 | while IFS= read -r line; do
        echo "[$(date '+%Y-%m-%d %H:%M:%S')] $line" | tee -a "$LOGFILE"
        
        # Якщо знайдено URL тунелю, виведемо його
        if echo "$line" | grep -q "https://.*ngrok.*app"; then
            URL=$(echo "$line" | grep -o 'https://[^[:space:]]*ngrok[^[:space:]]*')
            log "🌐 Tunnel URL: $URL"
            
            # Автоматичне оновлення URL в коді (якщо потрібно)
            if [ -f "/root/VizokInfoSite/src/ui/CreateRoute.jsx" ]; then
                log "🔄 Updating webhook URL in code..."
                sed -i "s|https://[^']*ngrok-free\.app|$URL|g" /root/VizokInfoSite/src/ui/CreateRoute.jsx
                log "✅ Code updated with new URL: $URL"
            fi
        fi
        
        # Перевірка на помилки
        if echo "$line" | grep -qi "error\|failed\|invalid"; then
            log "❌ Error detected: $line"
        fi
    done
    
    EXIT_CODE=$?
    log "❌ Ngrok stopped with exit code: $EXIT_CODE. Restarting in 10 seconds..."
    sleep 10
done