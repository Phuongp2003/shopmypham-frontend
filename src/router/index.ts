import { createRouter, createWebHistory } from 'vue-router';
import { authMiddleware } from '@/common/middleware/auth.middleware';
import commonRouter from '@/common/common.router';
import postRouter from '@/modules/post/post.router';
import authRouter from '@/modules/auth/auth.router';
import NotFoundView from '@/common/pages/NotFound.vue';
import userRouter from '@/modules/user/user.router';
import cosmeticRouter from '@/modules/cosmetic/cosmetic.router';
import orderRouter from '@/modules/order/order.router';
import cartRouter from '@/modules/cart/cart.router';
import checkoutRouter from '@/modules/checkout/checkout.router';
import userManagerRouter from '@/modules/user/user.manager.router';
import cosmeticManagerRouter from '@/modules/cosmetic/cosmetic.manager.router';
import orderManagerRouter from '@/modules/order/order.manager.router';
import postManagerRouter from '@/modules/post/post.manager.router';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'client-router',
            children: [
                ...commonRouter,
                ...postRouter,
                ...authRouter,
                ...userRouter,
                ...cosmeticRouter,
                ...orderRouter,
                ...cartRouter,
                ...checkoutRouter,
            ],
        },
        {
            path: '/manager',
            name: 'manager-router',
            children: [
                ...userManagerRouter,
                ...cosmeticManagerRouter,
                ...orderManagerRouter,
                ...postManagerRouter,
            ],
        },
        {
            path: '/:pathMatch(.*)*',
            component: NotFoundView,
        },
    ],
});

// Add global auth middleware
router.beforeEach((to, from, next) => {
    if (to.path === '/logout') return next();
    return authMiddleware(to, from, next);
});

export default router;
