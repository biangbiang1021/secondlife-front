import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/components/Layout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    meta: { title: '登录' }
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/Dashboard.vue'),
        meta: { title: '仪表盘', icon: 'el-icon-s-home' }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/list',
    meta: { title: '用户管理', icon: 'el-icon-user' },
    children: [
      {
        path: 'list',
        name: 'UserList',
        component: () => import('@/views/user/UserList.vue'),
        meta: { title: '用户列表' }
      },
      {
        path: 'add',
        name: 'UserAdd',
        component: () => import('@/views/user/UserAdd.vue'),
        meta: { title: '添加用户' }
      }
    ]
  },
  {
    path: '/forum',
    component: Layout,
    redirect: '/forum/posts',
    meta: { title: '论坛管理', icon: 'el-icon-chat-dot-round' },
    children: [
      {
        path: 'posts',
        name: 'PostList',
        component: () => import('@/views/forum/PostList.vue'),
        meta: { title: '帖子管理' }
      },
      {
        path: 'categories',
        name: 'CategoryList',
        component: () => import('@/views/forum/CategoryList.vue'),
        meta: { title: '分类管理' }
      }
    ]
  },
  {
    path: '/market',
    component: Layout,
    redirect: '/market/products',
    meta: { title: '市场管理', icon: 'el-icon-shopping-cart-full' },
    children: [
      {
        path: 'products',
        name: 'ProductList',
        component: () => import('@/views/market/ProductList.vue'),
        meta: { title: '商品管理' }
      },
      {
        path: 'categories',
        name: 'MarketCategoryList',
        component: () => import('@/views/market/CategoryList.vue'),
        meta: { title: '分类管理' }
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    redirect: '/system/settings',
    meta: { title: '系统管理', icon: 'el-icon-setting' },
    children: [
      {
        path: 'settings',
        name: 'SystemSettings',
        component: () => import('@/views/system/Settings.vue'),
        meta: { title: '系统设置' }
      },
      {
        path: 'logs',
        name: 'SystemLogs',
        component: () => import('@/views/system/Logs.vue'),
        meta: { title: '系统日志' }
      }
    ]
  },
  // 添加一个通配符路由，确保所有未匹配的路由都重定向到dashboard
  {
    path: '*',
    redirect: '/dashboard'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: '/admin/',
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('admin_token')
  
  if (to.path === '/login') {
    next()
  } else {
    if (token) {
      next()
    } else {
      next('/login')
    }
  }
})

export default router 