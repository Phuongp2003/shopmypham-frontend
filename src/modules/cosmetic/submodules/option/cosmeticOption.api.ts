import { api } from '@/plugins/axios';
import type { CosmeticOptionCreateReq, CosmeticOptionUpdateReq } from './cosmesticOptions.dto';
import type { CosmeticOption } from './cosmesticOptions.types';

export const getAllOptionsApi = async (): Promise<CosmeticOption[]> => {
    const response = await api.get<CosmeticOption[]>('/cosmetics/options').catch((err) => {
        throw new Error(err.response.data.message);
    });
    return response.data;
};

export const createOptionApi = async (data: CosmeticOptionCreateReq) => {
    const response = await api.post('/cosmetics/options', data);
    return response.data;
};

export const updateOptionApi = async (id: string, data: CosmeticOptionUpdateReq) => {
    const response = await api.put(`/cosmetics/options/${id}`, data).catch((err) => {
        throw new Error(err.response.data.message);
    });
    return response.data;
};

export const deleteOptionApi = async (id: string) => {
    const response = await api.delete(`/cosmetics/options/${id}`).catch((err) => {
        throw new Error(err.response.data.message);
    });
    return response.data;
};

export const getOptionByIdApi = async (id: string) => {
    const response = await api.get(`/cosmetics/options/${id}`).catch((err) => {
        throw new Error(err.response.data.message);
    });
    return response.data;
};
