-- verify
-- NOTE: ktm disimpan di filesystem aja. Nama file pakai NIM
-- contoh: 535990001.jpg
CREATE TABLE IF NOT EXISTS verify (
    nim VARCHAR(20) PRIMARY KEY,
    kampus VARCHAR(100) NOT NULL,
    prodi VARCHAR(100) NOT NULL,
    is_verified BOOLEAN DEFAULT FALSE
);