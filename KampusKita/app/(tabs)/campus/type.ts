export default {};

export enum Categories {
    Fasilitas = "Fasilitas",
    Wifi = "Wifi",
    Lokasi = "Lokasi",
    Organisasi = "Organisasi",
    WorthIt = "Worth It",
}

export type KampusRatingType = {
    fasilitas: number;
    wifi: number;
    lokasi: number;
    organisasi: number;
    worthIt: number;
}

export type KampusDataType = {
    id: number;
    jumlahDosen: number;
    nama: string;
    akreditasi: string;
    rating: KampusRatingType;
}

export type KampusFetchType = {
    data: {
        akreditasi: string;
        kampusId: number;
        nama: string;
        rating: KampusRatingType;
        jumlah_dosen: number;
    };
}

export const kampusDataDummy: KampusDataType = {
    id: 1,
    jumlahDosen: 80,
    nama: "Institut Teknologi Bandung",
    akreditasi: "A",
    rating: {
        fasilitas: 4.5,
        wifi: 4.5,
        lokasi: 4.5,
        organisasi: 4.5,
        worthIt: 4.5,
    },
};

export type KampusReviewType = {
    id: number;
    date: Date;
    content: string;
    like: number;
    dislike: number;
    hasLiked: true;
    hasDisliked: false;
    categoryRatings: KampusRatingType;
}

export type KampusReviewFetchType = {
    data: {
        content: string;
        date: string;
        dislike: number;
        hasDisliked: boolean;
        like: number;
        hasLiked: boolean;
        rating: {
            fasilitas: number;
            wifi: number;
            lokasi: number;
            organisasi: number;
            worth_it: number;
        };
        reviewId: number;
    }[];
}

export const kampusReviewDummy: KampusReviewType[] = [
    {
        id: 1,
        date: new Date("2025-05-05"),
        content:
            "It's more fun and less nerdy than you think. You'll find people like you. It definitely is hard though, no matter who you are.",
        like: 7,
        dislike: 1,
        hasLiked: true,
        hasDisliked: false,
        categoryRatings: {
            fasilitas: 4.5,
            wifi: 4.5,
            lokasi: 4.5,
            organisasi: 4.5,
            worthIt: 4.5,
        },
    },
    {
        id: 1,
        date: new Date("2025-05-05"),
        content:
            "It's more fun and less nerdy than you think. You'll find people like you. It definitely is hard though, no matter who you are.",
        like: 7,
        dislike: 1,
        hasLiked: true,
        hasDisliked: false,
        categoryRatings: {
            fasilitas: 4.5,
            wifi: 4.5,
            lokasi: 4.5,
            organisasi: 4.5,
            worthIt: 4.5,
        },
    },
];

