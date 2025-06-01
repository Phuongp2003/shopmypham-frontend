import type { Cosmetic } from '@/modules/cosmetic/cosmetic.types';
import type { CosmeticOption } from '../option/cosmesticOptions.types';
export type CosmeticVariant = {
    id: string;
    cosmeticName: string;
    cosmeticId: Cosmetic['id'];
    variantId: CosmeticVariant['id'];
    sku: string;
    price: number;
    image?: string;
    quantity: number;
    stock: number;
    createdAt: Date;
    updatedAt: Date;
    variantOptions?: CosmeticVariantOption[];
    cosmetic?: Cosmetic;
    CosmeticOption: CosmeticOption[];
};
export type CosmeticVariantOption = {
    id: string;
    variantId: CosmeticVariant['id'];
    optionId: CosmeticOption['id'];
    createdAt: Date;
    updatedAt: Date;
};
