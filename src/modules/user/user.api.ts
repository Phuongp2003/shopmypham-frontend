import { api } from '@/plugins/axios';
import type {
    ChangePasswordReq,
    CreateUserReq,
    GetUserRes,
    PaginationUserRes,
    UpdateUserReq,
} from './user.dto';
import type { UserStatus } from './user.types';
// manager own user
export const getMyInfoApi = async (): Promise<GetUserRes> => {
    const response = await api.get<GetUserRes>('/users/me').catch((err) => {
        throw new Error(err.response.data.message);
    });
    return response.data;
};
export const updateMyInfoApi = async (data: UpdateUserReq) => {
    const response = await api.put<GetUserRes>('/users/me', data).catch((err) => {
        throw new Error(err.response.data.message);
    });
    return response.data;
};
export const deleteMyInfoApi = async () => {
    const response = await api.delete<GetUserRes>('/users/me').catch((err) => {
        throw new Error(err.response.data.message);
    });
    return response.data;
};

export const unlinkGoogleApi = async () => {
    const response = await api.delete<GetUserRes>('/users/me/unlink-google').catch((err) => {
        throw new Error(err.response.data.message);
    });
    return response.data;
};

export const changePasswordApi = async (data: ChangePasswordReq) => {
    const response = await api.put<GetUserRes>('/users/me/password', data).catch((err) => {
        throw new Error(err.response.data.message);
    });
    return response.data;
};

export const getUsersApi = async (
    page: number,
    limit: number,
    search: string,
): Promise<PaginationUserRes> => {
    const response = await api
        .get<PaginationUserRes>('/users', {
            params: {
                page,
                limit,
                q: search,
            },
        })
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
    return response.data;
};

export const getUserByIdApi = async (id: string): Promise<GetUserRes> => {
    const response = await api.get<GetUserRes>(`/users/${id}`).catch((err) => {
        throw new Error(err.response.data.message);
    });
    return response.data;
};

export const createUserApi = async (data: CreateUserReq) => {
    const response = await api.post<GetUserRes>('/users', data).catch((err) => {
        throw new Error(err.response.data.message);
    });
    return response.data;
};

export const updateUserApi = async (id: string, data: UpdateUserReq) => {
    const response = await api.put<GetUserRes>(`/users/${id}`, data).catch((err) => {
        throw new Error(err.response.data.message);
    });
    return response.data;
};

export const changeUserStatusApi = async (id: string, status: UserStatus) => {
    const response = await api.patch<GetUserRes>(`/users/${id}/status`, { status }).catch((err) => {
        throw new Error(err.response.data.message);
    });
    return response.data;
};

export const deleteUserApi = async (id: string) => {
    await api.delete(`/users/${id}`).catch((err) => {
        throw new Error(err.response.data.message);
    });
};
