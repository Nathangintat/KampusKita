export default {};

export interface LecturerItem {
    dosenId: number;
    nama: string;
    kampus: string;
    prodi: string;
    rating: number;
};

export interface UniversityItem {
    kampusId: number;
    nama: string;
    namaPendek: string;
    rating: number;
}

export const lecturers: LecturerItem[] = [
    { dosenId: 1, nama: "Ocean Charlie Gunawan", kampus: "Institut Teknologi Bandung", prodi: "Sistem Informasi", rating: 4.5 },
    { dosenId: 2, nama: "Dosen Kedua", kampus: "Universitas Indonesia", prodi: "Teknik Informatika", rating: 4.2, },
    { dosenId: 3, nama: "Dosen Ketiga", kampus: "Universitas Gadjah Mada", prodi: "Ilmu Hukum", rating: 4.1, },
];

export const universities: UniversityItem[] = [
  { kampusId: 1, nama: "Universitas Tarumanagara", namaPendek: "Untar", rating: 4.3, },
  { kampusId: 2, nama: "Institut Teknologi Bandung", namaPendek: "ITB", rating: 4.2, },
  { kampusId: 3, nama: "Universitas Indonesia", namaPendek: "UI", rating: 4.1, },
];


