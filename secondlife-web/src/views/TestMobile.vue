<template>
  <div class="test-mobile">
    <van-nav-bar title="移动端测试" left-arrow @click-left="$router.go(-1)" />
    
    <div class="test-content">
      <van-cell-group>
        <van-cell title="设备检测" :value="deviceInfo" />
        <van-cell title="当前路由" :value="$route.path" />
        <van-cell title="用户状态" :value="userStatus" />
      </van-cell-group>
      
      <van-button type="primary" block @click="testToast">测试Toast</van-button>
      <van-button type="success" block @click="testDialog">测试Dialog</van-button>
      <van-button type="warning" block @click="testNavigation">测试导航</van-button>
    </div>
  </div>
</template>

<script>
import { isMobile } from '@/utils/device.js'

export default {
  name: 'TestMobile',
  data() {
    return {
      deviceInfo: '',
      userStatus: ''
    }
  },
  mounted() {
    this.deviceInfo = isMobile() ? '移动端' : '桌面端'
    this.userStatus = this.$store.state.user.isLoggedIn ? '已登录' : '未登录'
  },
  methods: {
    testToast() {
      this.$toast('Toast测试成功！')
    },
    testDialog() {
      this.$dialog.alert({
        title: '测试',
        message: 'Dialog测试成功！'
      })
    },
    testNavigation() {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.test-mobile {
  background: #f7f8fa;
  min-height: 100vh;
}

.test-content {
  padding: 20px;
}

.test-content .van-button {
  margin: 10px 0;
}
</style> 