import { createRouter, createWebHistory } from 'vue-router'
import { useUsersStore } from '../stores/users'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
      meta: { requiresAuth: false }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const store = useUsersStore()

  if (to.matched.some(route => route.meta.requiresAuth)) {
    if (store.currentUser) {
      next()
    } else {
      next({ name: 'login' })
    } 
  } else if (to.name === 'login' && store.currentUser || to.name === 'register' && store.currentUser) {
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router
