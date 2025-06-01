import type { QueryParams, Paginated } from '@/common/api.type';
import type {  Cosmetic, CosmeticType } from './cosmetic.types';
import type { VariantResponse } from './submodules/option/cosmesticOptions.types';
import type { CosmeticBenefit } from './submodules/benefit/cosmeticBenefit.types';
import type { CosmeticBadge } from './submodules/badge/cosmeticBadge.types';

export interface CosmeticRes {
    id: Cosmetic['id'];
    name: Cosmetic['name'];
    description: Cosmetic['description'];
    price: Cosmetic['price'];
    type: Cosmetic['type'];
    distributor?: Cosmetic['distributor'];
    specifications: Cosmetic['specifications'];
    image: Cosmetic['image'];
    variants: VariantResponse[];
    stock: Cosmetic['stock'];
    usageInstructions: Cosmetic['usageInstructions'];
}
export interface GetAllCosmeticRes {
    id: Cosmetic['id'];
    name: Cosmetic['name'];
    description: Cosmetic['description'];
    price: Cosmetic['price'];
    stock: Cosmetic['stock'];
}
export interface PaginatedCosmeticRes extends Paginated {
    cosmetics: GetAllCosmeticRes[];
}
export type CosmeticQueryParams = QueryParams & {
    type?: CosmeticType;
    minPrice?: number;
    maxPrice?: number;
    sortBy?: 'price' | 'name' | 'createdAt';
    inStock?: boolean;
    hasVariants?: boolean;
};
export type CosmeticVariantInput = {
    name: string;
    sku: string;
    price: number;
    stock: number;
    optionIds: string[];
};

export type CosmeticSpecificationInput = {
    key: string;
    value: string;
};

export type CosmeticCreateReq = {
    name: string;
    description?: string;
    price: number;
    stock: number;
    type: CosmeticType;
    image: string;
    usageInstructions?: string;
    distributorId: string;
    shippingPolicyId: string;
    specifications?: CosmeticSpecificationInput[];
    variants?: CosmeticVariantInput[];
    benefits?: CosmeticBenefit[];
    badges?: CosmeticBadge[];
};
