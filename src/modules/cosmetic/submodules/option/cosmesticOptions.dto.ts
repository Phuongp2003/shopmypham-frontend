export type CosmeticOptionCreateReq = {
    optionKey: string;
    optionValue: string;
};

export type CosmeticOptionUpdateReq = Partial<
    Pick<CosmeticOptionCreateReq, 'optionKey' | 'optionValue'>
>;
export type CosmeticOptionResponse = {
    id: string;
    optionKey: string;
    optionValue: string;
    createdAt: Date;
    updatedAt: Date;
};

// DTO for VariantOption/VariantResponse
// TODO: Define DTO structure as needed
