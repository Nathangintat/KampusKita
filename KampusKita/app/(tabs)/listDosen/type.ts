import { SearchDosenType } from "../search/types";

export default {};

export type DosenListItemType = {
    id: number;
    nama: string;
    prodi: string;
    rating: number;
}

export type DosenListFetchType = {
    data: {
        dosenId: number;
        nama: string;
        prodi: string;
        rating: number;
    }[];
}

export const kampusNameDummy = "Institut Teknologi Bandung";
export const dosenListDummy: SearchDosenType[] = [
  { id: 1, nama: "Ocean Charlie Gunawan", prodi: "Teknik Informatika", rating: 4.5, },
  { id: 2, nama: "Ocean Charlie Gunawan", prodi: "Teknik Informatika", rating: 4.5, },
  { id: 3, nama: "Ocean Charlie Gunawan", prodi: "Teknik Informatika", rating: 4.5, },
  { id: 4, nama: "Ocean Charlie Gunawan", prodi: "Teknik Informatika", rating: 4.5, },
];

