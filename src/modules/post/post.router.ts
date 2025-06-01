export default [
    {
        path: 'post',
        name: 'post-router',
        children: [
            {
                path: 'list',
                name: 'post-public-list',
                component: () => import('@/modules/post/pages/ArticlePublicListView.vue'),
                meta: { requiresAuth: false },
            },
            {
                path: ':id',
                name: 'post-detail',
                component: () => import('@/modules/post/pages/ArticleDetailView.vue'),
                meta: { requiresAuth: false },
            },
        ],
    },
];
