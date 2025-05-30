import type { User } from '@/modules/user/user.types';

export type LoginReq = {
    email: User['email'];
    password: string;
};

export type LoginRes = {
    accessToken: string;
    refreshToken: string;
};

export type RegisterReq = {
    email: User['email'];
    password: string;
    name: User['name'];
    phone: User['phone'];
};

export type RegisterRes = {
    accessToken: string;
    refreshToken: string;
};

export type RefreshTokenReq = {
    refreshToken: string;
};

export type RefreshTokenRes = {
    accessToken: string;
    refreshToken: string;
};

export type ChangePasswordReq = {
    oldPassword: string;
    newPassword: string;
    OTPKey: string;
};

export type GenerateOTPKeyReq = {
    email: User['email'];
};

export type GenerateOTPKeyRes = {
    otp: string;
};
