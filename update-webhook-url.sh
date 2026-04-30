#!/bin/bash

# Скрипт для оновлення URL вебхука в проекті
# Використання: ./update-webhook-url.sh NEW_NGROK_URL

if [ -z "$1" ]; then
    echo "❌ Помилка: Не вказано новий URL"
    echo "Використання: $0 <новий_ngrok_url>"
    echo "Приклад: $0 https://88c66447ddba.ngrok-free.app"
    exit 1
fi

NEW_URL="$1"

# Видаляємо https:// з початку URL якщо є
CLEAN_URL=$(echo "$NEW_URL" | sed 's|^https://||')

echo "🔄 Оновлюємо URL вебхука на: https://$CLEAN_URL"

# Знаходимо старий URL в файлах
OLD_URLS=$(grep -r "https://.*-.*-.*-.*\.ngrok-free\.app" src/ 2>/dev/null | grep -o "https://[^'\"]*ngrok-free\.app" | sort -u)

if [ -z "$OLD_URLS" ]; then
    echo "⚠️ Попередні ngrok URL не знайдено"
else
    echo "📍 Знайдені старі URL:"
    echo "$OLD_URLS"
fi

# Файли для оновлення
FILES=(
    "src/ui/CreateRoute.jsx"
    "src/ui/SearchRoute.jsx"
)

echo ""
echo "📝 Оновлюємо файли:"

for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "  ✅ $file"
        # Замінюємо старі ngrok URL на новий
        sed -i.bak "s|https://[^'\"]*ngrok-free\.app|https://$CLEAN_URL|g" "$file"
        # Видаляємо backup файл
        rm -f "$file.bak"
    else
        echo "  ❌ $file (файл не знайдено)"
    fi
done

echo ""
echo "✅ Оновлення завершено!"
echo "🔗 Новий URL: https://$CLEAN_URL"

# Перевіряємо результат
echo ""
echo "🔍 Перевірка оновлених URL:"
grep -r "https://.*ngrok-free\.app" src/ 2>/dev/null | grep -v ".bak" || echo "❌ URL не знайдено" 