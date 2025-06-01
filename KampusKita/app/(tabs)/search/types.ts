export default {};

export type SearchDosenType = {
    id: number;
    nama: string;
    kampus: string;
    prodi: string;
    rating: number;
};

export type SearchKampusType = {
    id: number;
    nama: string;
    namaPendek: string;
    rating: number;
}

export const searchDosenDummy: SearchDosenType[] = [
    { id: 1, nama: "Ocean Charlie Gunawan", kampus: "Institut Teknologi Bandung", prodi: "Sistem Informasi", rating: 4.5 },
    { id: 2, nama: "Dosen Kedua", kampus: "Universitas Indonesia", prodi: "Teknik Informatika", rating: 4.2, },
    { id: 3, nama: "Dosen Ketiga", kampus: "Universitas Gadjah Mada", prodi: "Ilmu Hukum", rating: 4.1, },
];

export const searchKampusDummy: SearchKampusType[] = [
  { id: 1, nama: "Universitas Tarumanagara", namaPendek: "Untar", rating: 4.3, },
  { id: 2, nama: "Institut Teknologi Bandung", namaPendek: "ITB", rating: 4.2, },
  { id: 3, nama: "Universitas Indonesia", namaPendek: "UI", rating: 4.1, },
];
