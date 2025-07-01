<template>
  <div class="mobile-header">
    <van-nav-bar
      :title="title"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <template #right>
        <van-icon name="search" size="18" @click="onSearch" />
      </template>
    </van-nav-bar>
    
    <!-- 用户操作弹窗 -->
    <van-popup v-model="showUserActions" position="bottom" round>
      <div class="user-actions">
        <template v-if="!isLoggedIn">
          <van-button type="primary" block @click="showLogin = true">登录</van-button>
          <van-button type="default" block @click="showRegister = true">注册</van-button>
        </template>
        <template v-else>
          <van-cell-group>
            <van-cell title="个人中心" icon="user-o" @click="goToProfile" />
            <van-cell title="我的帖子" icon="records" @click="goToPosts" />
            <van-cell title="退出登录" icon="close" @click="logout" />
          </van-cell-group>
        </template>
      </div>
    </van-popup>

    <!-- 登录弹窗 -->
    <van-dialog
      v-model="showLogin"
      title="用户登录"
      show-cancel-button
      @confirm="handleLogin"
    >
      <van-field
        v-model="loginForm.username"
        label="用户名"
        placeholder="请输入用户名"
        required
      />
      <van-field
        v-model="loginForm.password"
        label="密码"
        type="password"
        placeholder="请输入密码"
        required
      />
    </van-dialog>

    <!-- 注册弹窗 -->
    <van-dialog
      v-model="showRegister"
      title="用户注册"
      show-cancel-button
      @confirm="handleRegister"
    >
      <van-field
        v-model="registerForm.username"
        label="用户名"
        placeholder="请输入用户名"
        required
      />
      <van-field
        v-model="registerForm.email"
        label="邮箱"
        placeholder="请输入邮箱"
        required
      />
      <van-field
        v-model="registerForm.password"
        label="密码"
        type="password"
        placeholder="请输入密码"
        required
      />
      <van-field
        v-model="registerForm.confirmPassword"
        label="确认密码"
        type="password"
        placeholder="请确认密码"
        required
      />
    </van-dialog>
  </div>
</template>

<script>
export default {
  name: 'MobileHeader',
  data() {
    return {
      showUserActions: false,
      showLogin: false,
      showRegister: false,
      loginForm: {
        username: '',
        password: ''
      },
      registerForm: {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
    }
  },
  computed: {
    title() {
      const routeTitles = {
        '/': '二手手机论坛',
        '/forum': '论坛讨论',
        '/market': '二手市场',
        '/guide': '购机指南',
        '/about': '关于我们',
        '/profile': '个人中心',
        '/my-posts': '我的帖子'
      }
      return routeTitles[this.$route.path] || '二手手机论坛'
    },
    isLoggedIn() {
      return this.$store.state.user.isLoggedIn
    }
  },
  methods: {
    onClickLeft() {
      if (this.$route.path !== '/') {
        this.$router.go(-1)
      }
    },
    onClickRight() {
      this.showUserActions = true
    },
    onSearch() {
      this.$toast('搜索功能开发中...')
    },
    goToProfile() {
      this.showUserActions = false
      this.$router.push('/profile')
    },
    goToPosts() {
      this.showUserActions = false
      this.$router.push('/my-posts')
    },
    logout() {
      this.showUserActions = false
      this.$store.dispatch('user/logout')
      this.$toast('已退出登录')
    },
    handleLogin() {
      if (!this.loginForm.username || !this.loginForm.password) {
        this.$toast('请填写完整信息')
        return
      }
      this.$store.dispatch('user/login', this.loginForm)
      this.$toast('登录成功')
    },
    handleRegister() {
      if (!this.registerForm.username || !this.registerForm.email || 
          !this.registerForm.password || !this.registerForm.confirmPassword) {
        this.$toast('请填写完整信息')
        return
      }
      if (this.registerForm.password !== this.registerForm.confirmPassword) {
        this.$toast('两次输入的密码不一致')
        return
      }
      this.$store.dispatch('user/register', this.registerForm)
      this.$toast('注册成功')
    }
  }
}
</script>

<style scoped>
.mobile-header {
  position: sticky;
  top: 0;
  z-index: 999;
}

.user-actions {
  padding: 20px;
}

.user-actions .van-button {
  margin-bottom: 10px;
}

.user-actions .van-cell-group {
  margin-top: 10px;
}
</style> 