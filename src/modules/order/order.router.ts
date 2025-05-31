export default [
    {
        path: '/order',
        name: 'order',
        children: [
            {
                path: 'list',
                name: 'order-list',
                component: () => import('./pages/OrderListView.vue'),
            },
            {
                path: ':id',
                name: 'order-detail',
                component: () => import('./pages/OrderDetailView.vue'),
            },
        ],
    },
];
