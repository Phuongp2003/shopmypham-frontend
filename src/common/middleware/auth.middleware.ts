import type { NavigationGuard } from 'vue-router';
import { useAuthStore } from '@/modules/auth/auth.store';

export const authMiddleware: NavigationGuard = async (to, from, next) => {
    const authStore = useAuthStore();
    const authRoutes = ['/auth/login', '/auth/register', '/auth/google'];
    const publicRoutes = ['home', '/about', '/contact', 'post-public-list', 'post-detail', 'cosmetic-list', 'cosmetic-detail', 'auth-success', 'auth-fail'];
    // Allow access to public routes
    if (authRoutes.includes(to.fullPath)) {
        // If already logged in and trying to access public routes, redirect to home
        if (authStore.isAuthenticated) {
            return next('/');
        }
        return next(true);
    }
    if (publicRoutes.includes(to.name as string)) return next(true);

    // Check if user is already logged in
    if (authStore.isAuthenticated) {
        // Verify that the token is still valid
        const isValid = await authStore.verifyUser();

        if (isValid) {
            // Token is valid, proceed to requested route
            return next(true);
        } else {
            // Token invalid, try to refresh
            const refreshSuccess = await authStore.requestRefreshToken();
            if (refreshSuccess) {
                // Token refreshed successfully, proceed to requested route
                return next(true);
            } else {
                // Refresh failed, redirect to login
                console.log('Refresh failed, redirect to login');
                return next('/auth/login');
            }
        }
    } else {
        // Authentication failed, redirect to login
        console.log('Authentication failed, redirect to login');
        return next('/auth/login');
    }
};
