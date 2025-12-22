#!/usr/bin/env node

console.log('\n╔════════════════════════════════════════════════════════════════╗');
console.log('║                                                                ║');
console.log('║        🚀 ЗАПУСК СИСТЕМЫ УПРАВЛЕНИЯ ШИНОМОНТАЖОМ              ║');
console.log('║                                                                ║');
console.log('╚════════════════════════════════════════════════════════════════╝\n');

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

const isWin = process.platform === 'win32';

const backend = spawn(
  isWin ? 'bun.exe' : 'bun',
  ['run', join(rootDir, 'server/index.ts')],
  { 
    cwd: rootDir,
    shell: isWin,
    stdio: 'inherit'
  }
);

setTimeout(() => {
  const frontend = spawn(
    isWin ? 'npm.cmd' : 'npm',
    ['run', 'dev:client'],
    { 
      cwd: rootDir,
      shell: isWin,
      stdio: 'pipe'
    }
  );

  frontend.stdout.on('data', (data) => {
    const output = data.toString();
    console.log(output);
    
    if (output.includes('Local:')) {
      console.log('\n╔════════════════════════════════════════════════════════════════╗');
      console.log('║                                                                ║');
      console.log('║  ✅ ПРОЕКТ УСПЕШНО ЗАПУЩЕН!                                    ║');
      console.log('║                                                                ║');
      console.log('║  🌐 Откройте в браузере:                                       ║');
      console.log('║                                                                ║');
      console.log('║     👉  http://localhost:5173                                  ║');
      console.log('║                                                                ║');
      console.log('║  📄 Страницы:                                                  ║');
      console.log('║     • /         - Главная (онлайн-запись)                     ║');
      console.log('║     • /admin    - Админ-панель                                ║');
      console.log('║     • /master   - Рабочее место мастера                       ║');
      console.log('║                                                                ║');
      console.log('║  ⏹️  Для остановки нажмите Ctrl+C                             ║');
      console.log('║                                                                ║');
      console.log('╚════════════════════════════════════════════════════════════════╝\n');
    }
  });

  frontend.stderr.on('data', (data) => {
    console.error(data.toString());
  });

  frontend.on('close', (code) => {
    if (code !== 0) {
      console.error(`\n❌ Frontend завершился с кодом ${code}`);
    }
    backend.kill();
    process.exit(code || 0);
  });
}, 2000);

backend.on('close', (code) => {
  if (code !== 0) {
    console.error(`\n❌ Backend завершился с кодом ${code}`);
  }
  process.exit(code || 0);
});

process.on('SIGINT', () => {
  console.log('\n\n⏹️  Останавливаю серверы...\n');
  backend.kill();
  process.exit(0);
});

process.on('SIGTERM', () => {
  backend.kill();
  process.exit(0);
});
