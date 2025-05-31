-- Hapus data dari tabel dosen
DELETE FROM dosen WHERE nama IN (
                                 'Lina',
                                 'Irvan Lawenusa',
                                 'Teny Handhayani',
                                 'Jeanny Pragantha',
                                 'Janson Hendryli',
                                 'Lely Hiryanto',
                                 'Chairisni Lubis',
                                 'Viny Christanti Mawardi',
                                 'Darius Andana Haris',
                                 'Manatap Dolok Lauro',
                                 'Agus Budi Dharmawan',
                                 'RR Dyah Erny Herwindiati',
                                 'Wasino',
                                 'Zyad Rusdi',
                                 'Ery Dewayani',
                                 'Tony',
                                 'Bagus Mulyawan',
                                 'Dedi Trisnawarman',
                                 'Desi Arisandi',
                                 'Tri Sutrisno',
                                 'Jap Tji Beng',
                                 'Novario Jaya Perdana'
    );

-- Hapus data dari tabel kp_map
DELETE FROM kp_map WHERE id IN (1, 2);

-- Hapus data dari tabel prodi
DELETE FROM prodi WHERE id IN (1, 2);

-- Hapus data dari tabel kampus
DELETE FROM kampus WHERE id = 1;
