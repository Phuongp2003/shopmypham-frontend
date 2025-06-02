export interface CosmeticReview {
    id: string;
    cosmeticId: string;
    orderId: string;
    userId: string;
    rating: number;
    title?: string;
    content?: string;
    userName?: string;
    createdAt: string;
    updatedAt: string;
}
