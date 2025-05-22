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