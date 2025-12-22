CREATE TABLE masters (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    location VARCHAR(255),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE orders ADD COLUMN assigned_master_id INTEGER REFERENCES masters(id);
ALTER TABLE orders ADD COLUMN assigned_at TIMESTAMP;

INSERT INTO masters (name, location) VALUES 
    ('Иван Петров', 'ул. Ленина, 45'),
    ('Сергей Иванов', 'пр. Мира, 123'),
    ('Алексей Смирнов', 'ул. Гагарина, 78');

CREATE INDEX idx_orders_master ON orders(assigned_master_id);
