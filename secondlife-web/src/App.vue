<template>
  <div id="app" :class="{ 'mobile-app': isMobile }">
    <!-- 桌面端布局 -->
    <template v-if="!isMobile">
      <el-container>
        <el-header>
          <nav-header />
        </el-header>
        <el-main>
          <router-view />
        </el-main>
        <el-footer>
          <nav-footer />
        </el-footer>
      </el-container>
    </template>
    
    <!-- 移动端布局 -->
    <template v-else>
      <mobile-header />
      <div class="mobile-content">
        <router-view />
      </div>
      <mobile-nav />
    </template>
  </div>
</template>

<script>
import NavHeader from '@/components/NavHeader.vue'
import NavFooter from '@/components/NavFooter.vue'
import MobileHeader from '@/components/MobileHeader.vue'
import MobileNav from '@/components/MobileNav.vue'
import { isMobile } from '@/utils/device.js'

export default {
  name: 'App',
  components: {
    NavHeader,
    NavFooter,
    MobileHeader,
    MobileNav
  },
  data() {
    return {
      isMobile: false
    }
  },
  mounted() {
    this.checkDevice()
    window.addEventListener('resize', this.checkDevice)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkDevice)
  },
  methods: {
    checkDevice() {
      this.isMobile = isMobile()
    }
  }
}
</script>

<style>
#app {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

/* 桌面端样式 */
.el-header {
  background-color: #409EFF;
  color: white;
  line-height: 60px;
  padding: 0;
}

.el-main {
  min-height: calc(100vh - 120px);
  padding: 20px;
}

.el-footer {
  background-color: #f5f5f5;
  color: #666;
  text-align: center;
  line-height: 60px;
}

/* 移动端样式 */
.mobile-app {
  background-color: #f7f8fa;
}

.mobile-content {
  padding: 10px;
  padding-bottom: 60px; /* 为底部导航留出空间 */
  min-height: calc(100vh - 46px - 50px); /* 减去头部和底部导航的高度 */
}

/* 响应式设计 */
@media (max-width: 768px) {
  .el-main {
    padding: 10px;
  }
  
  .el-footer {
    display: none; /* 移动端隐藏桌面端底部 */
  }
}

/* 移动端优化 */
@media (max-width: 768px) {
  body {
    font-size: 14px;
  }
  
  .el-button {
    font-size: 14px;
    padding: 8px 15px;
  }
  
  .el-input {
    font-size: 14px;
  }
}
</style> 