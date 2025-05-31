import type { User } from '@/modules/user/user.types';
import { useLayoutStore } from './layout.store';
import { useAuthStore } from '@/modules/auth/auth.store';
import { useCartStore } from '@/modules/cart/cart.store';
import { setAccessToken } from '@/plugins/axios';

export async function initializeStores() {
    // Initialize user store and load auth state from cookies
    const authStore = useAuthStore();
    const layoutStore = useLayoutStore();
    const cartStore = useCartStore();
    await authStore.initializeAuth();
    setAccessToken(authStore.accessToken || '');
    layoutStore.setLayoutByUserType(authStore.userType as User['role']);
    if (authStore.userId && authStore.userType === 'user') {
        await cartStore.fetchCart(authStore.userId);
    }
}
