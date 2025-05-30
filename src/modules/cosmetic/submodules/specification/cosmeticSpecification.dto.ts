export type CosmeticSpecificationCreateReq = {
    cosmeticId: string;
    specKey: string;
    specValue: string;
};

export type CosmeticSpecificationUpdateReq = Partial<
    Pick<CosmeticSpecificationCreateReq, 'specKey' | 'specValue'>
>;

export type CosmeticSpecificationResponse = {
    id: string;
    cosmeticId: string;
    specKey: string;
    specValue: string;
    createdAt: Date;
    updatedAt: Date;
};
