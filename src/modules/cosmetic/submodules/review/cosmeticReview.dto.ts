import type { CosmeticReview } from './cosmeticReview.types';
import type { Paginated, QueryParams} from '@/common/api.type';

export type CosmeticReviewCreateReq = {
    cosmeticId: string;
    rating: number;
    title?: string;
    content?: string;
};

export type CosmeticReviewUpdateReq = Partial<CosmeticReviewCreateReq> & {
    isApproved?: boolean;
};

export type CosmeticReviewQueryParams = QueryParams & {
    rating?: number;
    isApproved?: boolean;
    isVerified?: boolean;
    sortBy?: 'rating' | 'createdAt';
};

export type CosmeticReviewResponse = {
    id: CosmeticReview['id'];
    cosmeticId: CosmeticReview['cosmeticId'];
    userId?: CosmeticReview['userId'];
    rating: CosmeticReview['rating'];
    title?: CosmeticReview['title'];
    content?: CosmeticReview['content'];
    isVerified: CosmeticReview['isVerified'];
    isApproved: CosmeticReview['isApproved'];
    userName?: string;
    createdAt: CosmeticReview['createdAt'];
    updatedAt: CosmeticReview['updatedAt'];
};

export type PaginatedCosmeticReviewRes = Paginated & {
    reviews: CosmeticReviewResponse[];
};
