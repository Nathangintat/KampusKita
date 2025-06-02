import { SearchDosenType } from "../search/types";

export default {};

export type DosenType = SearchDosenType & {
    kampusId: number;
}

export type DosenFetchType = {
    data: {
        id: number;
        kampus: string;
        kampus_id: number;
        nama: string;
        prodi: string;
        rating: number;
    };
}

export const dosenDummy: DosenType = {
    id: 1,
    kampusId: 1,
    rating: 4.8,
    nama: "Ocean Charlie Gunawan",
    prodi: "Teknik Informatika",
    kampus:"Institut Teknologi Bandung",
};

export type DosenReviewType = {
    id: number;
    date: Date;
    content: string;
    matkul: string;
    like: number;
    dislike: number;
    hasLiked: boolean;
    hasDisliked: boolean;
    rating: number;
}

export type DosenReviewFetchType = {
    data: {
        kampusId: number;
        nama: string;
        rating: {
            reviewId: number;
            date: Date;
            content: string;
            matkul: string;
            like: number;
            dislike: number;
            hasLiked: boolean;
            hasDisliked: boolean;
        }[] | null
    };
}

export const dosenReviewDummy: DosenReviewType[] = [
    { id: 1, date: new Date(), content: "Dosen yang luar biasa, menjelaskan semuanya dengan jelas.", matkul: "Statistik", like: 7, dislike: 1, hasLiked: false, hasDisliked: false, rating: 4.2 },
    { id: 2, date: new Date(), content: "Dosen yang luar biasa, menjelaskan semuanya dengan jelas.", matkul: "Statistik", like: 7, dislike: 1, hasLiked: false, hasDisliked: false, rating: 4.2 },
    { id: 3, date: new Date(), content: "Dosen yang luar biasa, menjelaskan semuanya dengan jelas.", matkul: "Statistik", like: 7, dislike: 1, hasLiked: false, hasDisliked: false, rating: 4.2 },
    { id: 4, date: new Date(), content: "Dosen yang luar biasa, menjelaskan semuanya dengan jelas.", matkul: "Statistik", like: 7, dislike: 1, hasLiked: false, hasDisliked: false, rating: 4.2 },
    { id: 5, date: new Date(), content: "Dosen yang luar biasa, menjelaskan semuanya dengan jelas.", matkul: "Statistik", like: 7, dislike: 1, hasLiked: false, hasDisliked: false, rating: 4.2 },
    { id: 6, date: new Date(), content: "Dosen yang luar biasa, menjelaskan semuanya dengan jelas.", matkul: "Statistik", like: 7, dislike: 1, hasLiked: false, hasDisliked: false, rating: 4.2 },
];


