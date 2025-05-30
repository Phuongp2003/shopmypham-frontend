import HomeView from '@/common/pages/HomeView.vue';

export default [
    {
        path: '/',
        name: 'home',
        component: HomeView,
    },
    {
        path: '/logout',
        name: 'logout',
        component: () => import('@/modules/auth/pages/LogoutView.vue'),
    },
];
