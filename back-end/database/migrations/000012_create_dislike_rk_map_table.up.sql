CREATE TABLE IF NOT EXISTS dislike_rk_map (
    rk_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    PRIMARY KEY (rk_id, user_id),
    FOREIGN KEY (rk_id) REFERENCES review_kampus(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);