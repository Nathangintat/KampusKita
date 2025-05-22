-- kampus
CREATE TABLE IF NOT EXISTS kampus (
    id SERIAL PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    nama_singkat VARCHAR(10),
    akreditasi VARCHAR(20)
);