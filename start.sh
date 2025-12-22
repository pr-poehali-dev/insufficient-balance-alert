#!/bin/bash

echo "🚀 Запуск ШиноПро..."
echo ""
echo "📦 Проверка зависимостей..."

if ! command -v node &> /dev/null; then
    echo "❌ Node.js не установлен!"
    echo "Скачайте и установите Node.js с https://nodejs.org/"
    exit 1
fi

if [ ! -d "node_modules" ]; then
    echo "📦 Установка зависимостей..."
    npm install
fi

echo ""
echo "✅ Запуск проекта..."
echo ""
echo "📍 Backend API: http://localhost:3001"
echo "📍 Frontend:    http://localhost:5173"
echo ""
echo "Нажмите Ctrl+C для остановки"
echo ""

npx concurrently "npx tsx server/index.ts" "vite"