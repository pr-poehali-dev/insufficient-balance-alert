@echo off
echo ========================================
echo    ШиноПро - Запуск локального сервера
echo ========================================
echo.

where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ОШИБКА] Node.js не установлен!
    echo Скачайте и установите Node.js с https://nodejs.org/
    pause
    exit /b 1
)

if not exist "node_modules\" (
    echo [1/2] Установка зависимостей...
    call npm install
    echo.
)

echo [2/2] Запуск проекта...
echo.
echo Backend API: http://localhost:3001
echo Frontend:    http://localhost:5173
echo.
echo Нажмите Ctrl+C для остановки
echo.

npx concurrently "npx tsx server/index.ts" "vite"