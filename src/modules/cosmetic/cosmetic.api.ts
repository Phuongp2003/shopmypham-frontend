import { api } from '@/plugins/axios';
import type {
    CosmeticCreateReq,
    CosmeticQueryParams,
    CosmeticRes,
    CosmeticUpdateReq,
    PaginatedCosmeticRes,
} from './cosmetic.dto';
import type { Cosmetic } from './cosmetic.types';

export const getAllCosmeticsApi = async (
    req: CosmeticQueryParams,
): Promise<PaginatedCosmeticRes> => {
    const response = await api.get<PaginatedCosmeticRes>('/cosmetics', { params: req });
    return response.data;
};

export const getCosmeticByIdApi = async (id: string): Promise<Cosmetic> => {
    const response = await api.get<Cosmetic>(`/cosmetics/${id}`);
    return response.data;
};

export const createCosmeticApi = async (cosmetic: CosmeticCreateReq): Promise<CosmeticRes> => {
    const response = await api.post<CosmeticRes>('/cosmetics', cosmetic);
    return response.data;
};

export const updateCosmeticApi = async (
    id: string,
    cosmetic: CosmeticUpdateReq,
): Promise<CosmeticRes> => {
    const response = await api.put<CosmeticRes>(`/cosmetics/${id}`, cosmetic);
    return response.data;
};
