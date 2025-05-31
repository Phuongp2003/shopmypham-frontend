import type { CosmeticVariant } from "../cosmetic/submodules/variant/cosmeticVariant.types";

export class GetCart  {
  userId!: string;
}

export type AddToCartDto = {
  variantId: string;
  quantity: number;
};

export type UpdateCartItemDto = {
  variantId?: string;
  quantity?: number;
};

export type RemoveCartItemDto = {
  variantId: string;
};

export type GetUserCartRes = {
  id: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  items: CosmeticVariant[];
}
