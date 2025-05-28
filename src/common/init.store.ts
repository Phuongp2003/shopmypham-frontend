import type { User } from '@/types/user/user.type'
import { useLayoutStore } from './layout.store'
import { useAuthStore } from '@/modules/auth/auth.store'

export async function initializeStores() {
  // Initialize user store and load auth state from cookies
  const authStore = useAuthStore()
  const layoutStore = useLayoutStore()
  await authStore.initializeAuth()
  layoutStore.setLayoutByUserType(authStore.userType as User['role'])
}
