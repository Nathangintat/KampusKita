-- kampus_prodi_map
-- kp = kampus_prodi
CREATE TABLE IF NOT EXISTS kp_map (
    id SERIAL PRIMARY KEY,
    kampus_id INTEGER NOT NULL,
    prodi_id INTEGER NOT NULL,
    FOREIGN KEY (kampus_id) REFERENCES kampus(id) ON DELETE CASCADE,
    FOREIGN KEY (prodi_id) REFERENCES prodi(id) ON DELETE CASCADE
);