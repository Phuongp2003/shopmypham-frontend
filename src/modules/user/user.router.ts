const profileRouter = [
    {
        name: 'profile',
        path: '/profile',
        children: [
            {
                name: 'profile-me',
                path: 'me',
                component: () => import('@/modules/user/pages/ProfileMe.vue'),
            },
            {
                name: 'profile-me-edit',
                path: 'me/edit',
                component: () => import('@/modules/user/pages/ProfileMeEdit.vue'),
            },
        ],
    },
];

export default [...profileRouter];
