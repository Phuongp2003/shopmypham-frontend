import { api } from '@/plugins/axios';
import type {
    CosmeticCreateReq,
    CosmeticQueryParams,
    CosmeticRes,
    CosmeticUpdateReq,
    PaginatedCosmeticRes,
} from './cosmetic.dto';
import type { Cosmetic, CosmeticResponse } from './cosmetic.types';

export const getAllCosmeticsApi = async (
    req: CosmeticQueryParams,
): Promise<PaginatedCosmeticRes> => {
    const response = await api
        .get<PaginatedCosmeticRes>('/cosmetics', { params: req })
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
    return response.data;
};

export const getCosmeticByIdApi = async (id: string): Promise<CosmeticResponse> => {
    const response = await api.get<CosmeticResponse>(`/cosmetics/${id}`).catch((err) => {
        throw new Error(err.response.data.message);
    });
    return response.data;
};

export const createCosmeticApi = async (cosmetic: CosmeticCreateReq): Promise<CosmeticRes> => {
    const response = await api.post<CosmeticRes>('/cosmetics', cosmetic).catch((err) => {
        throw new Error(err.response.data.message);
    });
    return response.data;
};

export const updateCosmeticApi = async (
    id: string,
    cosmetic: CosmeticUpdateReq,
): Promise<CosmeticRes> => {
    const response = await api.put<CosmeticRes>(`/cosmetics/${id}`, cosmetic).catch((err) => {
        throw new Error(err.response.data.message);
    });
    return response.data;
};

export const deleteCosmeticApi = async (id: string): Promise<void> => {
    await api.delete<void>(`/cosmetics/${id}`).catch((err) => {
        throw new Error(err.response.data.message);
    });
};
