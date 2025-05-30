export interface CosmeticReview {
    id: string;
    cosmeticId: string;
    userId: string;
    rating: number;
    title?: string;
    content?: string;
    userName?: string;
    isVerified: boolean;
    isApproved: boolean;
    createdAt: string;
    updatedAt: string;
}
