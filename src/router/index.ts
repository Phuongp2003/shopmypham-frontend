import { createRouter, createWebHistory } from 'vue-router'
import { authMiddleware } from '@/common/middleware/auth.middleware'
import commonRouter from '@/common/common.router'
import postRouter from '@/modules/post/post.router'
import authRouter from '@/modules/auth/auth.router'
import NotFoundView from '@/common/pages/NotFound.vue'
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      children: [
        ...commonRouter, // Note: common router cần đề cuối cùng vì nó có route catch all
        ...postRouter,
        ...authRouter,
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      component: NotFoundView,
    },
  ],
})

// Add global auth middleware
router.beforeEach((to, from, next) => {
  if (to.path === '/logout') return next()
  return authMiddleware(to, from, next)
})

export default router
