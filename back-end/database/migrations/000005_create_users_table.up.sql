-- users
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    username VARCHAR(30),
    verify_id VARCHAR(20),
    FOREIGN KEY (verify_id) REFERENCES verify(nim) ON DELETE SET NULL
);