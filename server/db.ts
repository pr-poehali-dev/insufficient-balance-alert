import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database(path.join(__dirname, 'shinopro.db'));

db.exec(`
  CREATE TABLE IF NOT EXISTS clients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS masters (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone TEXT,
    location TEXT NOT NULL,
    is_active INTEGER DEFAULT 1,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    client_id INTEGER,
    client_name TEXT NOT NULL,
    client_phone TEXT NOT NULL,
    client_email TEXT,
    location TEXT NOT NULL,
    car_type TEXT NOT NULL,
    service TEXT NOT NULL,
    service_duration INTEGER NOT NULL,
    service_price INTEGER NOT NULL,
    booking_date TEXT NOT NULL,
    booking_time TEXT NOT NULL,
    status TEXT DEFAULT 'pending',
    assigned_master_id INTEGER,
    assigned_at TEXT,
    notes TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES clients(id),
    FOREIGN KEY (assigned_master_id) REFERENCES masters(id)
  );

  CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
  CREATE INDEX IF NOT EXISTS idx_orders_booking_date ON orders(booking_date);
  CREATE INDEX IF NOT EXISTS idx_orders_assigned_master ON orders(assigned_master_id);
`);

const mastersCount = db.prepare('SELECT COUNT(*) as count FROM masters').get() as { count: number };

if (mastersCount.count === 0) {
  const insertMaster = db.prepare(`
    INSERT INTO masters (name, phone, location) 
    VALUES (?, ?, ?)
  `);

  insertMaster.run('Иван Петров', '+7 (999) 111-11-11', 'ул. Ленина, 45');
  insertMaster.run('Сергей Иванов', '+7 (999) 222-22-22', 'пр. Мира, 123');
  insertMaster.run('Алексей Смирнов', '+7 (999) 333-33-33', 'ул. Гагарина, 78');

  console.log('✓ Мастера добавлены в базу данных');
}

export default db;
