export default {}

export enum VerifyStatus {
    Verified,
    NotVerified,
    Pending,
}

export type VerifyStatusFetchType = {
    data: {
        Status: "Pending" | "NotVerified" | "Verified";
    };
}
