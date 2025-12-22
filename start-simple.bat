@echo off
chcp 65001 >nul
cls

echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║                                                                ║
echo ║        🚀 ЗАПУСК СИСТЕМЫ УПРАВЛЕНИЯ ШИНОМОНТАЖОМ              ║
echo ║                                                                ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.
echo 📦 Запускаю backend сервер...
echo.

start "Backend Server" cmd /k "npx tsx server/index.ts"

timeout /t 3 /nobreak >nul

echo.
echo 📦 Запускаю frontend приложение...
echo.

start "Frontend App" cmd /k "npm run dev"

echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║                                                                ║
echo ║  ✅ ПРОЕКТ ЗАПУЩЕН!                                            ║
echo ║                                                                ║
echo ║  🌐 Откройте в браузере:                                       ║
echo ║                                                                ║
echo ║     👉  http://localhost:5173                                  ║
echo ║                                                                ║
echo ║  📄 Страницы:                                                  ║
echo ║     • /         - Главная (онлайн-запись)                     ║
echo ║     • /admin    - Админ-панель                                ║
echo ║     • /master   - Рабочее место мастера                       ║
echo ║                                                                ║
echo ║  ⏹️  Закройте окна терминалов для остановки                   ║
echo ║                                                                ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.
pause
