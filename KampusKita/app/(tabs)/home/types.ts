export default {};

export interface TopLecturerItem {
    dosenId: number;
    ranking: number;
    nama: string;
    kampus: string;
}

export interface TopUniversityItem {
    kampusId: number;
    ranking: number,
    nama: string,
    namaPendek: string,
}

export const topLecturers: TopLecturerItem[] = [
  { dosenId: 1, nama: "Ocean Charlie Gunawan", kampus: "Institut Teknologi Bandung", ranking: 1 },
  { dosenId: 2, nama: "Rina Maulani", kampus: "Universitas Indonesia", ranking: 2 },
  { dosenId: 3, nama: "Ahmad Santoso", kampus: "Universitas Gadjah Mada", ranking: 3 },
  { dosenId: 4, nama: "Tania Wijaya", kampus: "Universitas Brawijaya", ranking: 4 },
  { dosenId: 5, nama: "Budi Hartono", kampus: "Universitas Airlangga", ranking: 5 },
];

export const topUniversities: TopUniversityItem[] = [
  { kampusId: 1, nama: "Universitas Tarumanagara", namaPendek: "Untar", ranking: 1 },
  { kampusId: 2, nama: "Universitas Bina Nusantara", namaPendek: "Binus", ranking: 2 },
  { kampusId: 3, nama: "Universitas Indonesia", namaPendek: "UI", ranking: 3 },
  { kampusId: 4, nama: "Universitas Gadjah Mada", namaPendek: "UGM", ranking: 4 },
  { kampusId: 5, nama: "Institut Teknologi Bandung", namaPendek: "ITB", ranking: 5 },
];
