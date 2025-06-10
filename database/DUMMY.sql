INSERT INTO verify (nim, is_verified, kp_id, img_type) VALUES
-- UNTAR (Manajemen)
('117250001', true, 15, 'jpeg'),
('117250002', true, 15, 'jpeg'),
('117250003', true, 15, 'jpeg'),
('117250004', true, 15, 'jpeg'),
('117250005', true, 15, 'jpeg'),

-- UNTAR (TI)
('535250001', true, 1, 'jpeg'),
('535250002', true, 1, 'jpeg'),
('535250003', true, 1, 'jpeg'),
('535250004', true, 1, 'jpeg'),
('535250005', true, 1, 'jpeg'),

-- UNTAR (TM)
('515250001', true, 22, 'jpeg'),
('515250002', true, 22, 'jpeg'),
('515250003', true, 22, 'jpeg'),
('515250004', true, 22, 'jpeg'),
('515250005', true, 22, 'jpeg'),

-- UNTAR (Hukum)
('205250001', true, 19, 'jpeg'),
('205250002', true, 19, 'jpeg'),
('205250003', true, 19, 'jpeg'),
('205250004', true, 19, 'jpeg'),
('205250005', true, 19, 'jpeg'),

-- ITB
('111250001', true, 6, 'jpeg'),
('111250002', true, 6, 'jpeg'),
('111250003', true, 6, 'jpeg'),
('111250004', true, 6, 'jpeg'),
('111250005', true, 6, 'jpeg'),

-- UI
('222250001', true, 3, 'jpeg'),
('222250002', true, 3, 'jpeg'),
('222250003', true, 3, 'jpeg'),
('222250004', true, 3, 'jpeg'),
('222250005', true, 3, 'jpeg');


INSERT INTO users (id, email, username, verify_id) VALUES
(1, 'john.doe@example.com', 'John Doe', '117250001'),
(2, 'jane.smith@example.com', 'Jane Smith', '117250002'),
(3, 'michael.brown@example.com', 'Michael Brown', '117250003'),
(4, 'emily.jones@example.com', 'Emily Jones', '117250004'),
(5, 'david.wilson@example.com', 'David Wilson', '117250005'),

(6, 'sarah.taylor@example.com', 'Sarah Taylor', '535250001'),
(7, 'chris.moore@example.com', 'Chris Moore', '535250002'),
(8, 'laura.martin@example.com', 'Laura Martin', '535250003'),
(9, 'robert.jackson@example.com', 'Robert Jackson', '535250004'),
(10, 'lisa.white@example.com', 'Lisa White', '535250005'),

(11, 'mark.thomas@example.com', 'Mark Thomas', '515250001'),
(12, 'amy.davis@example.com', 'Amy Davis', '515250002'),
(13, 'steven.miller@example.com', 'Steven Miller', '515250003'),
(14, 'karen.anderson@example.com', 'Karen Anderson', '515250004'),
(15, 'paul.martinez@example.com', 'Paul Martinez', '515250005'),

(16, 'susan.lee@example.com', 'Susan Lee', '205250001'),
(17, 'james.hernandez@example.com', 'James Hernandez', '205250002'),
(18, 'mary.gonzalez@example.com', 'Mary Gonzalez', '205250003'),
(19, 'brian.wright@example.com', 'Brian Wright', '205250004'),
(20, 'jennifer.lopez@example.com', 'Jennifer Lopez', '205250005'),

(21, 'kevin.clark@example.com', 'Kevin Clark', '111250001'),
(22, 'linda.lewis@example.com', 'Linda Lewis', '111250002'),
(23, 'daniel.walker@example.com', 'Daniel Walker', '111250003'),
(24, 'patricia.hall@example.com', 'Patricia Hall', '111250004'),
(25, 'eric.allen@example.com', 'Eric Allen', '111250005'),

(26, 'nancy.young@example.com', 'Nancy Young', '222250001'),
(27, 'matthew.king@example.com', 'Matthew King', '222250002'),
(28, 'debra.scott@example.com', 'Debra Scott', '222250003'),
(29, 'joseph.green@example.com', 'Joseph Green', '222250004'),
(30, 'betty.adams@example.com', 'Betty Adams', '222250005');


INSERT INTO review_kampus (user_id, kp_id, content, rating_fasilitas, rating_internet, rating_lokasi, rating_ormawa, rating_worth_it) VALUES
(1, 15, 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Dolor sit amet consectetur adipiscing elit quisque faucibus.', 1, 2, 3, 4, 5),
(6, 1, 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Dolor sit amet consectetur adipiscing elit quisque faucibus.', 2, 3, 4, 5, 1),
(11, 22, 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Dolor sit amet consectetur adipiscing elit quisque faucibus.', 3, 4, 5, 1, 2),
(16, 15, 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Dolor sit amet consectetur adipiscing elit quisque faucibus.', 4, 5, 1, 2, 3),
(2, 15, 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Dolor sit amet consectetur adipiscing elit quisque faucibus.', 5, 1, 2, 3, 4),

(21, 6, 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Dolor sit amet consectetur adipiscing elit quisque faucibus.', 4, 5, 3, 4, 5),
(22, 6, 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Dolor sit amet consectetur adipiscing elit quisque faucibus.', 4, 5, 3, 4, 5),
(23, 6, 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Dolor sit amet consectetur adipiscing elit quisque faucibus.', 4, 5, 3, 4, 5),
(24, 6, 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Dolor sit amet consectetur adipiscing elit quisque faucibus.', 4, 5, 3, 4, 5),
(25, 6, 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Dolor sit amet consectetur adipiscing elit quisque faucibus.', 4, 5, 3, 4, 5),

(26, 3, 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Dolor sit amet consectetur adipiscing elit quisque faucibus.', 5, 5, 4, 4, 5),
(27, 3, 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Dolor sit amet consectetur adipiscing elit quisque faucibus.', 5, 5, 4, 4, 5),
(28, 3, 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Dolor sit amet consectetur adipiscing elit quisque faucibus.', 5, 5, 4, 4, 5),
(29, 3, 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Dolor sit amet consectetur adipiscing elit quisque faucibus.', 5, 5, 4, 4, 5),
(30, 3, 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Dolor sit amet consectetur adipiscing elit quisque faucibus.', 5, 5, 4, 4, 5);


INSERT INTO review_dosen (user_id, dosen_id, matkul, content, rating) VALUES
(1, 40, 'Manajemen Keuangan', 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Dolor sit amet consectetur adipiscing elit quisque faucibus.', 1),
(2, 40, 'Manajemen Keuangan', 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Dolor sit amet consectetur adipiscing elit quisque faucibus.', 2),
(3, 40, 'Manajemen Keuangan', 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Dolor sit amet consectetur adipiscing elit quisque faucibus.', 3),
(4, 40, 'Manajemen Keuangan', 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Dolor sit amet consectetur adipiscing elit quisque faucibus.', 4),
(5, 40, 'Manajemen Keuangan', 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Dolor sit amet consectetur adipiscing elit quisque faucibus.', 5),

(6, 2, 'Back-End Programming', 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Dolor sit amet consectetur adipiscing elit quisque faucibus.', 2),
(7, 2, 'Back-End Programming', 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Dolor sit amet consectetur adipiscing elit quisque faucibus.', 2),
(8, 2, 'Back-End Programming', 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Dolor sit amet consectetur adipiscing elit quisque faucibus.', 1),
(9, 2, 'Back-End Programming', 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Dolor sit amet consectetur adipiscing elit quisque faucibus.', 4),
(10, 2, 'Back-End Programming', 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Dolor sit amet consectetur adipiscing elit quisque faucibus.', 4),

(11, 250, '3D Printing', 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Dolor sit amet consectetur adipiscing elit quisque faucibus.', 4),
(12, 250, '3D Printing', 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Dolor sit amet consectetur adipiscing elit quisque faucibus.', 3),
(13, 250, '3D Printing', 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Dolor sit amet consectetur adipiscing elit quisque faucibus.', 3),
(14, 250, '3D Printing', 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Dolor sit amet consectetur adipiscing elit quisque faucibus.', 3),
(15, 250, '3D Printing', 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Dolor sit amet consectetur adipiscing elit quisque faucibus.', 4),

(16, 177, 'Hukum Bisnis', 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Dolor sit amet consectetur adipiscing elit quisque faucibus.', 1),
(17, 177, 'Hukum Bisnis', 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Dolor sit amet consectetur adipiscing elit quisque faucibus.', 2),
(18, 177, 'Hukum Bisnis', 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Dolor sit amet consectetur adipiscing elit quisque faucibus.', 3),
(19, 177, 'Hukum Bisnis', 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Dolor sit amet consectetur adipiscing elit quisque faucibus.', 4),
(20, 177, 'Hukum Bisnis', 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Dolor sit amet consectetur adipiscing elit quisque faucibus.', 5);

-- Fix Insert User
SELECT setval('users_id_seq', (SELECT MAX(id) FROM users) + 1);
