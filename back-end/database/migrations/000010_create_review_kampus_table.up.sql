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
