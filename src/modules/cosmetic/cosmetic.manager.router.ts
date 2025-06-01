export default [
    {
      path: 'products',
      name: 'cosmetic-manager',
        children: [
          {
            path: 'list',
            name: 'cosmetic-manager-list',
            component: () => import('./pages/manager/CosmeticTable.vue'),
          },
          {
            path: 'create',
            name: 'cosmetic-manager-create',
            component: () => import('./pages/manager/CosmeticCreateView.vue'),
          },
          {
            path: ':id',
            name: 'cosmetic-manager-edit',
            component: () => import('./pages/manager/CosmeticEditView.vue'),
          },
          {
            path: 'distributors',
            name: 'cosmetic-manager-distributor',
            component: () => import('./pages/manager/CosmeticDistributorView.vue'),
          }
      ]
    }
]
