import { api } from '@/plugins/axios';
import type { User } from './user.types';
import type { ChangePasswordReq, GetUserRes, UpdateUserReq } from './user.dto';
// manager own user
export const getMyInfoApi = async (): Promise<GetUserRes> => {
    const response = await api.get<GetUserRes>('/users/me');
    return response.data;
};
export const updateMyInfoApi = async (data: UpdateUserReq) => {
    const response = await api.put<GetUserRes>('/users/me', data);
    return response.data;
};
export const deleteMyInfoApi = async () => {
    const response = await api.delete<GetUserRes>('/users/me');
    return response.data;
};

export const unlinkGoogleApi = async () => {
    const response = await api.delete<GetUserRes>('/users/me/unlink-google');
    return response.data;
};

export const changePasswordApi = async (data: ChangePasswordReq) => {
    const response = await api.put<GetUserRes>('/users/me/password', data);
    return response.data;
};
