export default [
    {
      path: 'products',
      name: 'cosmetic-manager',
        children: [
          {
            path: '',
            name: 'cosmetic-manager-list',
            component: () => import('./pages/manager/CosmeticTable.vue'),
          },
          {
            path: 'create',
            name: 'cosmetic-manager-create',
            component: () => import('./pages/manager/CosmeticForm.vue'),
          },
          {
            path: ':id',
            name: 'cosmetic-manager-edit',
            component: () => import('./pages/manager/CosmeticForm.vue'),
          },
          // {
          //   path: 'categories',
          //   name: 'cosmetic-manager-category',
          //   component: () => import('./pages/manager/CosmeticCategoryView.vue'),
          // },
          // {
          //   path: 'distributors',
          //   name: 'cosmetic-manager-distributor',
          //   component: () => import('./pages/manager/CosmeticDistributorView.vue'),
          // }
      ]
    }
]
