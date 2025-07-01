import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/forum',
    name: 'Forum',
    component: () => import('@/views/Forum.vue')
  },
  {
    path: '/market',
    name: 'Market',
    component: () => import('@/views/Market.vue')
  },
  {
    path: '/guide',
    name: 'Guide',
    component: () => import('@/views/Guide.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue')
  },
  {
    path: '/post/:id',
    name: 'PostDetail',
    component: () => import('@/views/PostDetail.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/Profile.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/my-posts',
    name: 'MyPosts',
    component: () => import('@/views/MyPosts.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/test-mobile',
    name: 'TestMobile',
    component: () => import('@/views/TestMobile.vue')
  },
  {
    path: '/admin',
    name: 'AdminRedirect',
    beforeEnter: (to, from, next) => {
      // 重定向到后台管理系统的登录页面
      window.location.href = 'http://localhost:8081/admin/login'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => { // eslint-disable-line no-unused-vars
  const isLoggedIn = localStorage.getItem('isLoggedIn')
  
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isLoggedIn) {
      next('/')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router 