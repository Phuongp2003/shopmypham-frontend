export type Cosmetic = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  type: CosmeticType;
  distributorId: string;
  createdAt: Date;
  updatedAt: Date;
  distributor: CosmeticDistributor;
  variants: CosmeticVariant[];
  specifications: CosmeticSpec[];
};

export type CosmeticType = 'SKINCARE' | 'MAKEUP' | 'HAIRCARE' | 'FRAGRANCE' | 'BODYCARE' | 'NAILCARE' | 'OTHER';

export type CosmeticVariant = {
  id: string;
  cosmeticId: Cosmetic['id']
  sku: string;
  price: number;
  stock: number;
  optionId: CosmeticOption['id'];
  createdAt: Date;
  updatedAt: Date;
  option: CosmeticOption;
  cosmetic: Cosmetic;
};

export type CosmeticOption = {
  id: string;
  optionKey: string;
  optionValue: string;
  createdAt: Date;
  updatedAt: Date;
  cosmeticVariant: CosmeticVariant[];
};

export type CosmeticVariantOption = {
  id: string;
  variantId: CosmeticVariant['id'];
  optionId: CosmeticOption['id'];
  createdAt: Date;
  updatedAt: Date;
};

export type CosmeticSpec = {
  id: string;
  cosmeticId: Cosmetic['id'];
  specKey: string;
  specValue: string;
  createdAt: Date;
  updatedAt: Date;
  cosmetic: Cosmetic;
};

export type CosmeticDistributor = {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  cosmetics: Cosmetic[];
};
