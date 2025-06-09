-- kampus
CREATE TABLE IF NOT EXISTS kampus (
    id SERIAL PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    nama_singkat VARCHAR(10),
    akreditasi VARCHAR(20)
);

-- prodi
CREATE TABLE IF NOT EXISTS prodi (
    id SERIAL PRIMARY KEY,
    nama VARCHAR(100) NOT NULL
);

-- kampus_prodi_map
-- kp = kampus_prodi
CREATE TABLE IF NOT EXISTS kp_map (
    id SERIAL PRIMARY KEY,
    kampus_id INTEGER NOT NULL,
    prodi_id INTEGER NOT NULL,
    FOREIGN KEY (kampus_id) REFERENCES kampus(id) ON DELETE CASCADE,
    FOREIGN KEY (prodi_id) REFERENCES prodi(id) ON DELETE CASCADE
);

-- verify
-- NOTE: ktm disimpan di filesystem aja. Nama file pakai NIM
-- contoh: 535990001.jpg
CREATE TABLE IF NOT EXISTS verify (
    nim VARCHAR(20) PRIMARY KEY,
    kp_id INTEGER,
    img_type VARCHAR(10),
    is_verified BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (kp_id) REFERENCES kp_map(id) ON DELETE SET NULL
);

-- users
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    username VARCHAR(30),
    verify_id VARCHAR(20),
    FOREIGN KEY (verify_id) REFERENCES verify(nim) ON DELETE SET NULL
);

-- dosen
CREATE TABLE IF NOT EXISTS dosen (
    id SERIAL PRIMARY KEY,
    nama VARCHAR(50) NOT NULL,
    kp_id INTEGER,
    FOREIGN KEY (kp_id) REFERENCES kp_map(id) ON DELETE SET NULL
);

-- review_dosen
CREATE TABLE IF NOT EXISTS review_dosen (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    dosen_id INTEGER NOT NULL,
    matkul VARCHAR(50) NOT NULL,
    content TEXT,
    rating INTEGER NOT NULL CHECK (rating BETWEEN 1 and 5),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (dosen_id) REFERENCES dosen(id) ON DELETE CASCADE
);

-- rd = review_dosen
CREATE TABLE IF NOT EXISTS like_rd_map (
    rd_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    PRIMARY KEY (rd_id, user_id),
    FOREIGN KEY (rd_id) REFERENCES review_dosen(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS dislike_rd_map (
    rd_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    PRIMARY KEY (rd_id, user_id),
    FOREIGN KEY (rd_id) REFERENCES review_dosen(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- review_kampus
CREATE TABLE IF NOT EXISTS review_kampus (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    kp_id INTEGER,
    content TEXT,
    rating_fasilitas INTEGER NOT NULL CHECK (rating_fasilitas BETWEEN 1 AND 5),
    rating_internet INTEGER NOT NULL CHECK (rating_internet BETWEEN 1 AND 5),
    rating_lokasi INTEGER NOT NULL CHECK (rating_lokasi BETWEEN 1 AND 5),
    rating_ormawa INTEGER NOT NULL CHECK (rating_ormawa BETWEEN 1 AND 5),
    rating_worth_it INTEGER NOT NULL CHECK (rating_worth_it BETWEEN 1 AND 5),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (kp_id) REFERENCES kp_map(id) ON DELETE SET NULL
);

-- rk = review_kampus
CREATE TABLE IF NOT EXISTS like_rk_map (
    rk_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    PRIMARY KEY (rk_id, user_id),
    FOREIGN KEY (rk_id) REFERENCES review_kampus(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS dislike_rk_map (
    rk_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    PRIMARY KEY (rk_id, user_id),
    FOREIGN KEY (rk_id) REFERENCES review_kampus(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
