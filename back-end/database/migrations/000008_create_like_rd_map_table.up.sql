-- rd = review_dosen
CREATE TABLE IF NOT EXISTS like_rd_map (
    rd_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    PRIMARY KEY (rd_id, user_id),
    FOREIGN KEY (rd_id) REFERENCES review_dosen(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);