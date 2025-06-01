export default [
    {
        path: '/cosmetic',
        name: 'cosmetic-router',
        children: [
            {
                path: 'list',
                name: 'cosmetic-list',
                component: () => import('./pages/CosmeticList.vue'),
            },
            {
                path: ':id',
                name: 'cosmetic-detail',
                component: () => import('./pages/CosmeticDetail.vue'),
            },
        ],
    },
];
