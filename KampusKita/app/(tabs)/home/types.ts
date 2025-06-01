export default {};

export type TopDosenType = {
    id: number;
    rank: number;
    nama: string;
    kampus: string;
}

export type TopKampusType = {
    id: number;
    rank: number,
    nama: string,
    namaPendek: string,
}

export const topDosenDummy: TopDosenType[] = [
  { id: 1, nama: "Ocean Charlie Gunawan", kampus: "Institut Teknologi Bandung", rank: 1 },
  { id: 2, nama: "Rina Maulani", kampus: "Universitas Indonesia", rank: 2 },
  { id: 3, nama: "Ahmad Santoso", kampus: "Universitas Gadjah Mada", rank: 3 },
  { id: 4, nama: "Tania Wijaya", kampus: "Universitas Brawijaya", rank: 4 },
  { id: 5, nama: "Budi Hartono", kampus: "Universitas Airlangga", rank: 5 },
];

export const topKampusDummy: TopKampusType[] = [
  { id: 1, nama: "Universitas Tarumanagara", namaPendek: "Untar", rank: 1 },
  { id: 2, nama: "Universitas Bina Nusantara", namaPendek: "Binus", rank: 2 },
  { id: 3, nama: "Universitas Indonesia", namaPendek: "UI", rank: 3 },
  { id: 4, nama: "Universitas Gadjah Mada", namaPendek: "UGM", rank: 4 },
  { id: 5, nama: "Institut Teknologi Bandung", namaPendek: "ITB", rank: 5 },
];
