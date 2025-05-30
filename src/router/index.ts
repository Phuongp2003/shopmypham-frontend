import { createRouter, createWebHistory } from 'vue-router'
import { authMiddleware } from '@/common/middleware/auth.middleware'
import commonRouter from '@/common/common.router'
import postRouter from '@/modules/post/post.router'
import authRouter from '@/modules/auth/auth.router'
import NotFoundView from '@/common/pages/NotFound.vue'
import userRouter from '@/modules/user/user.router'
import cosmeticRouter from '@/modules/cosmetic/cosmetic.router'
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      children: [
        ...commonRouter,
        ...postRouter,
        ...authRouter,
        ...userRouter,
        ...cosmeticRouter,
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
