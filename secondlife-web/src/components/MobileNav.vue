<template>
  <div class="mobile-nav">
    <van-tabbar v-model="active" @change="onChange">
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="chat-o" to="/forum">论坛</van-tabbar-item>
      <van-tabbar-item icon="shop-o" to="/market">市场</van-tabbar-item>
      <van-tabbar-item icon="guide-o" to="/guide">指南</van-tabbar-item>
      <van-tabbar-item icon="user-o" to="/profile">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'MobileNav',
  data() {
    return {
      active: 0
    }
  },
  methods: {
    onChange(index) {
      this.active = index
    }
  },
  watch: {
    $route(to) {
      // 根据路由更新激活状态
      const routes = ['/', '/forum', '/market', '/guide', '/profile']
      const index = routes.indexOf(to.path)
      if (index !== -1) {
        this.active = index
      }
    }
  },
  mounted() {
    // 初始化激活状态
    const routes = ['/', '/forum', '/market', '/guide', '/profile']
    const index = routes.indexOf(this.$route.path)
    if (index !== -1) {
      this.active = index
    }
  }
}
</script>

<style scoped>
.mobile-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

/* 自定义图标样式 */
.van-tabbar-item__icon {
  font-size: 20px;
}
</style> 