<template>
  <div class="admin-container">
    <!-- 侧边栏 -->
    <div class="admin-sidebar">
      <div class="logo">
        <h2>后台管理</h2>
      </div>
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical"
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#409eff"
        router
      >
        <el-menu-item index="/dashboard">
          <i class="el-icon-s-home"></i>
          <span slot="title">仪表盘</span>
        </el-menu-item>
        
        <el-submenu index="/user">
          <template slot="title">
            <i class="el-icon-user"></i>
            <span>用户管理</span>
          </template>
          <el-menu-item index="/user/list">用户列表</el-menu-item>
          <el-menu-item index="/user/add">添加用户</el-menu-item>
        </el-submenu>
        
        <el-submenu index="/forum">
          <template slot="title">
            <i class="el-icon-chat-dot-round"></i>
            <span>论坛管理</span>
          </template>
          <el-menu-item index="/forum/posts">帖子管理</el-menu-item>
          <el-menu-item index="/forum/categories">分类管理</el-menu-item>
        </el-submenu>
        
        <el-submenu index="/market">
          <template slot="title">
            <i class="el-icon-shopping-cart-full"></i>
            <span>市场管理</span>
          </template>
          <el-menu-item index="/market/products">商品管理</el-menu-item>
          <el-menu-item index="/market/categories">分类管理</el-menu-item>
        </el-submenu>
        
        <el-submenu index="/system">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span>系统管理</span>
          </template>
          <el-menu-item index="/system/settings">系统设置</el-menu-item>
          <el-menu-item index="/system/logs">系统日志</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>

    <!-- 主内容区 -->
    <div class="admin-main">
      <!-- 头部 -->
      <div class="admin-header">
        <div class="header-left">
          <h3>{{ $route.meta.title || '后台管理' }}</h3>
        </div>
        <div class="header-right">
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              <el-avatar :size="32" :src="adminInfo.avatar || 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'"></el-avatar>
              <span style="margin-left: 8px;">{{ adminInfo.username || 'admin' }}</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="profile">个人资料</el-dropdown-item>
              <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>

      <!-- 内容区 -->
      <div class="admin-content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Layout',
  computed: {
    ...mapGetters('user', ['adminInfo'])
  },
  mounted() {
    console.log('Layout组件已加载')
    console.log('当前路由:', this.$route.path)
    console.log('adminInfo:', this.adminInfo)
  },
  methods: {
    handleCommand(command) {
      if (command === 'logout') {
        this.$confirm('确定要退出登录吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('user/logout')
          this.$router.push('/login')
          this.$message.success('已退出登录')
        }).catch(() => {})
      } else if (command === 'profile') {
        this.$message.info('个人资料功能开发中...')
      }
    }
  }
}
</script>

<style scoped>
.admin-container {
  height: 100vh;
  display: flex;
}

.admin-sidebar {
  width: 200px;
  background-color: #304156;
  color: #fff;
  overflow-y: auto;
}

.admin-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #f0f2f5;
}

.admin-header {
  height: 60px;
  background-color: #fff;
  border-bottom: 1px solid #e8e8e8;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}

.admin-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

.logo {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #2b2f3a;
  color: #fff;
}

.logo h2 {
  margin: 0;
  font-size: 18px;
}

.el-menu-vertical {
  border-right: none;
}

.header-left h3 {
  margin: 0;
  color: #333;
}

.header-right {
  display: flex;
  align-items: center;
}

.el-dropdown-link {
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #333;
}
</style> 