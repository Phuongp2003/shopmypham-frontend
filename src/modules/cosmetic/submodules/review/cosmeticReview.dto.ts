import type { CosmeticReview } from './cosmeticReview.types';
import type { Paginated, QueryParams } from '@/common/api.type';

export type CosmeticReviewCreateReq = {
    cosmeticId: string;
    orderId: string;
    rating: number;
    title?: string;
    content?: string;
};

export type CosmeticReviewUpdateReq = Partial<CosmeticReviewCreateReq>;

export type CosmeticReviewQueryParams = QueryParams & {
    rating?: number;
    sortBy?: 'rating' | 'createdAt';
};

export type CosmeticReviewResponse = {
    id: string;
    cosmeticId: string;
    orderId: string;
    userId?: string;
    rating: number;
    title?: string;
    content?: string;
    userName?: string;
    createdAt: string;
    updatedAt: string;
};

export type PaginatedCosmeticReviewRes = Paginated & {
    reviews: CosmeticReviewResponse[];
};
