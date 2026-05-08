CREATE TABLE IF NOT EXISTS bookings (
    id          SERIAL PRIMARY KEY,
    technician  VARCHAR(50) NOT NULL,
    date        DATE NOT NULL,
    description TEXT NOT NULL,
    device      VARCHAR(100) NOT NULL,
    created_at  TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS inventory (
    id         SERIAL PRIMARY KEY,
    part_name  VARCHAR(100) NOT NULL,
    quantity   INT NOT NULL DEFAULT 0,
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS orders (
    id         SERIAL PRIMARY KEY,
    part_name  VARCHAR(100) NOT NULL,
    quantity   INT NOT NULL,
    status     VARCHAR(50) NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT NOW()
);

-- Seed data
INSERT INTO bookings (technician, date, description, device) VALUES
    ('jan',  '2026-05-07', 'Replace battery', 'iPhone 13'),
    ('jan',  '2026-05-07', 'Fix screen', 'Samsung Galaxy S24'),
    ('jill', '2026-05-07', 'Water damage repair', 'iPhone 14 Pro'),
    ('jill', '2026-05-08', 'Replace charging port', 'Google Pixel 8');

INSERT INTO inventory (part_name, quantity) VALUES
    ('iPhone 13 Battery', 5),
    ('Samsung Galaxy S24 Screen', 2),
    ('iPhone 14 Pro Screen', 3),
    ('USB-C Charging Port', 8),
    ('iPhone 13 Screen', 1);
