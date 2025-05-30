import type { User } from '@/modules/user/user.types';
import { useLayoutStore } from './layout.store';
import { useAuthStore } from '@/modules/auth/auth.store';
import setupAxios from '@/plugins/axios';

export async function initializeStores() {
    // Initialize user store and load auth state from cookies
    const authStore = useAuthStore();
    const layoutStore = useLayoutStore();
    await authStore.initializeAuth();
    setupAxios(authStore.authHeader);
    layoutStore.setLayoutByUserType(authStore.userType as User['role']);
}
