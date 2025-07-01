<template>
  <div class="nav-header">
    <div class="nav-container">
      <div class="logo">
        <router-link to="/">
          <h2>📱 二手手机论坛</h2>
        </router-link>
      </div>
      <div class="nav-menu">
        <el-menu
          :default-active="activeIndex"
          mode="horizontal"
          background-color="#409EFF"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
        >
          <el-menu-item index="/">首页</el-menu-item>
          <el-menu-item index="/forum">论坛</el-menu-item>
          <el-menu-item index="/market">二手市场</el-menu-item>
          <el-menu-item index="/guide">购机指南</el-menu-item>
          <el-menu-item index="/about">关于我们</el-menu-item>
        </el-menu>
      </div>
      <div class="user-actions">
        <template v-if="!isLoggedIn">
          <el-button type="text" @click="showLoginDialog = true">登录</el-button>
          <el-button type="text" @click="showRegisterDialog = true">注册</el-button>
        </template>
        <template v-else>
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              {{ username }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="profile">个人中心</el-dropdown-item>
              <el-dropdown-item command="posts">我的帖子</el-dropdown-item>
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
        <!-- 管理员入口 -->
        <el-button 
          type="text" 
          class="admin-link"
          @click="goToAdmin"
        >
          <i class="el-icon-setting"></i> 管理后台
        </el-button>
      </div>
    </div>

    <!-- 登录对话框 -->
    <el-dialog title="用户登录" :visible.sync="showLoginDialog" width="400px">
      <el-form :model="loginForm" :rules="loginRules" ref="loginForm">
        <el-form-item prop="username" label="用户名">
          <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input v-model="loginForm.password" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="showLoginDialog = false">取消</el-button>
        <el-button type="primary" @click="handleLogin">登录</el-button>
      </div>
    </el-dialog>

    <!-- 注册对话框 -->
    <el-dialog title="用户注册" :visible.sync="showRegisterDialog" width="400px">
      <el-form :model="registerForm" :rules="registerRules" ref="registerForm">
        <el-form-item prop="username" label="用户名">
          <el-input v-model="registerForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="邮箱">
          <el-input v-model="registerForm.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input v-model="registerForm.password" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item prop="confirmPassword" label="确认密码">
          <el-input v-model="registerForm.confirmPassword" type="password" placeholder="请确认密码"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="showRegisterDialog = false">取消</el-button>
        <el-button type="primary" @click="handleRegister">注册</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'NavHeader',
  data() {
    return {
      activeIndex: '/',
      showLoginDialog: false,
      showRegisterDialog: false,
      loginForm: {
        username: '',
        password: ''
      },
      registerForm: {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      loginRules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      registerRules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        confirmPassword: [
          { required: true, message: '请确认密码', trigger: 'blur' },
          { validator: this.validateConfirmPassword, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.user.isLoggedIn
    },
    username() {
      return this.$store.state.user.username
    }
  },
  methods: {
    validateConfirmPassword(rule, value, callback) {
      if (value !== this.registerForm.password) {
        callback(new Error('两次输入的密码不一致'))
      } else {
        callback()
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$store.dispatch('user/login', this.loginForm)
          this.showLoginDialog = false
          this.$message.success('登录成功')
        }
      })
    },
    handleRegister() {
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          this.$store.dispatch('user/register', this.registerForm)
          this.showRegisterDialog = false
          this.$message.success('注册成功')
        }
      })
    },
    handleCommand(command) {
      switch (command) {
        case 'profile':
          this.$router.push('/profile')
          break
        case 'posts':
          this.$router.push('/my-posts')
          break
        case 'logout':
          this.$store.dispatch('user/logout')
          this.$message.success('已退出登录')
          break
      }
    },
    goToAdmin() {
      // 跳转到后台管理系统
      window.open('http://localhost:8081/login', '_blank')
    }
  },
  watch: {
    $route(to) {
      this.activeIndex = to.path
    }
  }
}
</script>

<style scoped>
.nav-header {
  height: 60px;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 20px;
}

.logo a {
  text-decoration: none;
  color: white;
}

.logo h2 {
  margin: 0;
  font-size: 24px;
}

.nav-menu {
  flex: 1;
  margin: 0 40px;
}

.user-actions {
  display: flex;
  align-items: center;
}

.user-actions .el-button {
  color: white;
  margin-left: 10px;
}

.admin-link {
  color: #ffd04b !important;
  font-weight: bold;
}

.admin-link:hover {
  color: #fff !important;
  background-color: rgba(255, 255, 255, 0.1);
}

.el-dropdown-link {
  color: white;
  cursor: pointer;
}

.el-dropdown-link:hover {
  color: #ffd04b;
}
</style> 