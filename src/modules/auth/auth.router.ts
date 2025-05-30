export default [
    {
        path: 'auth',
        name: 'authRouter',
        children: [
            {
                path: 'login',
                name: 'auth-login',
                component: () => import('@/modules/auth/pages/LoginView.vue'),
                meta: {
                    layout: 'blank',
                },
            },
            {
                path: 'register',
                name: 'auth-register',
                component: () => import('@/modules/auth/pages/SignUpView.vue'),
                meta: {
                    layout: 'blank',
                },
            },
            {
                path: 'google',
                name: 'auth-google',
                component: () => import('@/modules/auth/pages/GoogleLoginMiddleware.vue'),
                meta: {
                    layout: 'blank',
                },
            },
            {
                path: 'success',
                name: 'auth-success',
                component: () => import('@/modules/auth/pages/GoogleAuthSuccess.vue'),
                meta: {
                    layout: 'blank',
                },
            },
        ],
    },
];
