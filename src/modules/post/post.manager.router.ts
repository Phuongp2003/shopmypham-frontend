export default [
  {
    path: 'post',
    children: [
        {
            path: '',
            component: () => import('@/modules/post/pages/ArticleListView.vue'),
            meta: {
                requiresAuth: true,
            },
        },
        {
            path: 'create',
            component: () => import('@/modules/post/pages/ArticleEditView.vue'),
            meta: {
                requiresAuth: true,
            },
        },
        {
            path: 'edit/:id',
            component: () => import('@/modules/post/pages/ArticleEditView.vue'),
            meta: {
                requiresAuth: true,
            },
        },
    ],
  },
]
