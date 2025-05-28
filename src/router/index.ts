import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import { authMiddleware } from '@/middleware/auth.middleware'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      component: () => import('@/views/LoginView.vue'),
      meta: {
        layout: 'blank',
      },
    },
    {
      path: '/',
      children: [
        {
          path: '',
          component: HomeView,
        },
        {
          path: 'articles',
          children: [
            {
              path: 'news',
              component: () => import('@/views/articles/NewsView.vue'),
              meta: {
                requiresAuth: true,
              },
            },
            {
              path: 'events',
              component: () => import('@/views/articles/EventsView.vue'),
              meta: {
                requiresAuth: true,
              },
            },
            {
              path: ':category/create',
              component: () => import('@/views/articles/ArticleEditView.vue'),
              meta: {
                requiresAuth: true,
              },
            },
            {
              path: ':category/edit/:slug',
              component: () => import('@/views/articles/ArticleEditView.vue'),
              meta: {
                requiresAuth: true,
              },
            },
          ],
        },
        // Catch unmatched routes
        {
          path: ':pathMatch(.*)*',
          component: HomeView,
        },
      ],
    },
    {
      path: '/logout',
      name: 'logout',
      component: () => import('@/views/LogoutView.vue'),
    },
    {
      path: '/auth/google',
      component: () => import('@/views/GoogleLoginMiddleware.vue'),
      meta: {
        layout: 'blank',
      },
    },
    {
      path: '/auth/success',
      component: () => import('@/views/GoogleAuthSuccess.vue'),
      meta: {
        layout: 'blank',
      },
    },
  ],
})

// Add global auth middleware
router.beforeEach((to, from, next) => {
  if (to.path === '/logout') return next()
  return authMiddleware(to, from, next)
})

export default router
