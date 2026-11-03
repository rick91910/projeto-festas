-- 1. Criação das Tabelas

CREATE TABLE "User" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(200) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'USER'
);

CREATE TABLE EventCategory (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE Event (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    location VARCHAR(200) NOT NULL,
    event_date TIMESTAMP NOT NULL,
    capacity INT NOT NULL,
    cover_url VARCHAR(255),
    organizer_id INT NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
    category_id INT NOT NULL REFERENCES EventCategory(id) ON DELETE CASCADE
);

CREATE TABLE Attendance (
    id SERIAL PRIMARY KEY,
    event_id INT NOT NULL REFERENCES Event(id) ON DELETE CASCADE,
    user_id INT NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
    attended BOOLEAN DEFAULT FALSE,
    UNIQUE(event_id, user_id)
);

CREATE TABLE MaintainEvent (
    id SERIAL PRIMARY KEY,
    event_id INT NOT NULL REFERENCES Event(id) ON DELETE CASCADE,
    user_id INT NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
    operation VARCHAR(50) NOT NULL,
    operation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Povoamento Inicial (Dados de Teste)

INSERT INTO EventCategory (name) VALUES 
('Aniversário'),
('Churrasco'),
('Festas Temáticas');

INSERT INTO "User" (name, email, password_hash, role) VALUES 
('Carlos Silva', 'carlos@email.com', 'hash123', 'ORGANIZER'),
('Mariana Souza', 'mariana@email.com', 'hash456', 'USER');

INSERT INTO Event (title, description, location, event_date, capacity, cover_url, organizer_id, category_id) VALUES 
('Aniversário de 30 Anos', 'Festa de comemoração com música ao vivo', 'Rua das Flores, 123', '2026-11-20 20:00:00', 50, 'http://example.com/capa.jpg', 1, 1);

INSERT INTO Attendance (event_id, user_id, attended) VALUES 
(1, 2, TRUE);

INSERT INTO MaintainEvent (event_id, user_id, operation) VALUES 
(1, 1, 'CREATE');