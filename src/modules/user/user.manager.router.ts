export default [
    {
        path: 'users',
        name: 'user-manager-router',
        children: [
            {
                path: '',
                name: 'user-manager-list',
                component: () => import('./pages/manager/UserListView.vue'),
            },
            {
                path: ':id',
                name: 'user-manager-edit',
                component: () => import('./pages/manager/UserEditView.vue'),
            },
            {
                path: 'create',
                name: 'user-manager-create',
                component: () => import('./pages/manager/UserCreateView.vue'),
            },
        ],
    },
];
