export default {};

export type ReviewDataFetchType = {
    data: {
        content: string;
        rating: {
            fasilitas: number;
            lokasi: number;
            organisasi: number;
            wifi: number;
            worth_it: number;
        };
        reviewId: number;
    }[];
}
