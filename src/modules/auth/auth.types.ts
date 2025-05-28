import type { User } from '@/modules/user/user.types';

export type AuthUser = Pick<User, 'id' | 'email' | 'role' | 'name' | 'googleId'>

export type AuthTokens = {
	accessToken: string;
	refreshToken: string;
};

export type JWTPayload = {
	id: User['id'];
	email: User['email'];
	role: User['role'];
	name: User['name'];
	googleId?: User['googleId'];
  status: User['status'];
  exp: number;
  iat: number;
};
