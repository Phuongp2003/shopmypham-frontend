export default [
    {
        path: 'articles',
        children: [
            {
                path: 'news',
                component: () => import('@/modules/post/pages/NewsView.vue'),
                meta: {
                    requiresAuth: true,
                },
            },
            {
                path: 'events',
                component: () => import('@/modules/post/pages/EventsView.vue'),
                meta: {
                    requiresAuth: true,
                },
            },
            {
                path: ':category/create',
                component: () => import('@/modules/post/pages/ArticleEditView.vue'),
                meta: {
                    requiresAuth: true,
                },
            },
            {
                path: ':category/edit/:slug',
                component: () => import('@/modules/post/pages/ArticleEditView.vue'),
                meta: {
                    requiresAuth: true,
                },
            },
        ],
    },
];
