import { api } from '@/plugins/axios';
import type {
    ChangePasswordReq,
    GenerateOTPKeyReq,
    GenerateOTPKeyRes,
    LoginReq,
    LoginRes,
    RefreshTokenReq,
    RefreshTokenRes,
    RegisterReq,
    RegisterRes,
} from './auth.dto';

export const loginApi = async (req: LoginReq): Promise<LoginRes> => {
    const response = await api.post<LoginRes>('/auth/login', req).catch((err) => {
        throw new Error(err.response.data.message);
    });
    return response.data;
};

export const registerApi = async (req: RegisterReq): Promise<RegisterRes> => {
    const response = await api.post<RegisterRes>('/auth/register', req).catch((err) => {
        throw new Error(err.response.data.message);
    });
    return response.data;
};

export const refreshTokenApi = async (req: RefreshTokenReq): Promise<RefreshTokenRes> => {
    const response = await api.post<RefreshTokenRes>('/auth/refresh-token', req).catch((err) => {
        throw new Error(err.response.data.message);
    });
    return response.data;
};

export const logoutApi = async (): Promise<void> => {
    const response = await api.post('/auth/logout').catch((err) => {
        throw new Error(err.response.data.message);
    });
    return response.data;
};

export const generateOTPKeyApi = async (req: GenerateOTPKeyReq): Promise<GenerateOTPKeyRes> => {
    const response = await api.post('/auth/generate-otp-key', req).catch((err) => {
        throw new Error(err.response.data.message);
    });
    return response.data;
};

export const regenerateOTPKeyApi = async (req: GenerateOTPKeyReq): Promise<GenerateOTPKeyRes> => {
    const response = await api.post('/auth/regenerate-otp-key', req).catch((err) => {
        throw new Error(err.response.data.message);
    });
    return response.data;
};
