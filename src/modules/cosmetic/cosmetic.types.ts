import type { CosmeticBadge } from './submodules/badge/cosmeticBadge.types';
import type { CosmeticBenefit } from './submodules/benefit/cosmeticBenefit.types';
import type { CosmeticDistributor } from './submodules/distributor/cosmeticDistributor.types';
import type { VariantResponse } from './submodules/option/cosmesticOptions.types';
import type { CosmeticReview } from './submodules/review/cosmeticReview.types';
import type { ShippingPolicy } from './submodules/shipping/shippingPolicy.types';
import type {
    CosmeticSpec,
    CosmeticSpecification,
} from './submodules/specification/cosmeticSpecification.types';
import type { CosmeticVariant } from './submodules/variant/cosmeticVariant.types';

export interface CosmeticResponse {
    id: string;
    name: string;
    image: string;
    price: number;
    stock: number;
    description?: string;
    distributor?: CosmeticDistributor;
    variants: VariantResponse[];
    usageInstructions?: string;
    averageRating?: number;
    totalReviews?: number;
    benefits?: CosmeticBenefit[];
    badges?: CosmeticBadge[];
    shippingPolicy?: ShippingPolicy;
    reviews?: CosmeticReview[];
    specifications?: CosmeticSpecification[];
    createdAt: string;
    updatedAt: string;
    type: CosmeticType;
}

export type Cosmetic = {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    type: CosmeticType;
    image?: string;
    distributorId: string;
    createdAt: Date;
    updatedAt: Date;
    distributor: CosmeticDistributor;
    variants: CosmeticVariant[];
    specifications: CosmeticSpec[];
    usageInstructions: string;
};

export type CosmeticType =
    | 'SKINCARE'
    | 'MAKEUP'
    | 'HAIRCARE'
    | 'FRAGRANCE'
    | 'BODYCARE'
    | 'NAILCARE'
    | 'OTHER';
