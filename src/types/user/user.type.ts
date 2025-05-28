export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
  MANAGER = 'manager',
}

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  phone?: string | null
  googleId?: string | null
  createdAt: string
  updatedAt: string
}
