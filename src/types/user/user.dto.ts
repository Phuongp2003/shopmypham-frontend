import { UserRole } from './user.type'

export interface CreateUserDTO {
  email: string
  password: string
  name: string
  role?: UserRole
}

export interface UpdateUserDTO {
  name?: string
  email?: string
  password?: string
}

export interface LoginDTO {
  email: string
  password: string
}

export interface TokenResponse {
  accessToken: string
  refreshToken: string
}
