export default [
    {
        path: 'orders',
        name: 'order-manager',
        children: [
            {
                path: '',
                name: 'order-manager-list',
                component: () => import('./pages/manager/OrderManagerListView.vue'),
            },
            {
                path: ':id',
                name: 'order-manager-detail',
                component: () => import('./pages/manager/OrderManagerDetailView.vue'),
            },
        ],
    },
];
