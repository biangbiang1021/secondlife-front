<template>
  <div class="about">
    <!-- 移动端头部 -->
    <div class="about-header">
      <h1>📱 关于我们</h1>
      <p>二手手机论坛 - 移动端H5适配版本</p>
    </div>

    <!-- 功能介绍 -->
    <van-cell-group class="feature-group">
      <van-cell title="移动端适配" icon="mobile-o">
        <template #label>
          完美支持手机、平板等移动设备，提供原生移动端体验
        </template>
      </van-cell>
      <van-cell title="响应式设计" icon="desktop-o">
        <template #label>
          自动适配不同屏幕尺寸，桌面端和移动端无缝切换
        </template>
      </van-cell>
      <van-cell title="触摸优化" icon="touch-o">
        <template #label>
          针对触摸操作优化，按钮尺寸和交互体验更友好
        </template>
      </van-cell>
      <van-cell title="性能优化" icon="speed-o">
        <template #label>
          移动端性能优化，加载速度快，运行流畅
        </template>
      </van-cell>
    </van-cell-group>

    <!-- 技术栈 -->
    <van-cell-group class="tech-group">
      <van-cell title="前端技术栈" icon="setting-o">
        <template #label>
          Vue 2.7 + Element UI + Vant 2.x + Vue Router + Vuex
        </template>
      </van-cell>
      <van-cell title="移动端框架" icon="apps-o">
        <template #label>
          Vant 2.12.54 - 有赞移动端组件库
        </template>
      </van-cell>
      <van-cell title="构建工具" icon="tool-o">
        <template #label>
          Vue CLI 5.x + Webpack 5.x
        </template>
      </van-cell>
    </van-cell-group>

    <!-- 设备支持 -->
    <van-cell-group class="device-group">
      <van-cell title="支持的设备" icon="phone-o">
        <template #label>
          iPhone 6+ / Android 5.0+ / iPad / Android平板
        </template>
      </van-cell>
      <van-cell title="支持的浏览器" icon="browser-o">
        <template #label>
          Safari / Chrome / 微信浏览器 / QQ浏览器 / UC浏览器
        </template>
      </van-cell>
    </van-cell-group>

    <!-- 联系方式 -->
    <van-cell-group class="contact-group">
      <van-cell title="联系我们" icon="contact" />
      <van-cell title="邮箱" label="contact@phoneforum.com" icon="envelop-o" />
      <van-cell title="电话" label="400-123-4567" icon="phone-o" />
      <van-cell title="地址" label="北京市朝阳区科技园区" icon="location-o" />
    </van-cell-group>

    <!-- 版本信息 -->
    <div class="version-info">
      <van-button type="primary" block @click="showVersionInfo">
        查看版本信息
      </van-button>
    </div>

    <!-- 版本信息弹窗 -->
    <van-dialog
      v-model="showVersionDialog"
      title="版本信息"
      :show-cancel-button="false"
    >
      <div class="version-details">
        <p><strong>当前版本：</strong>v1.0.0</p>
        <p><strong>移动端适配：</strong>v1.0.0</p>
        <p><strong>Vue版本：</strong>2.7.16</p>
        <p><strong>Vant版本：</strong>2.12.54</p>
        <p><strong>Element UI版本：</strong>2.15.14</p>
        <p><strong>构建时间：</strong>{{ buildTime }}</p>
      </div>
    </van-dialog>
  </div>
</template>

<script>
export default {
  name: 'AboutPage',
  data() {
    return {
      showVersionDialog: false,
      buildTime: new Date().toLocaleString()
    }
  },
  methods: {
    showVersionInfo() {
      this.showVersionDialog = true
    }
  }
}
</script>

<style scoped>
.about {
  max-width: 800px;
  margin: 0 auto;
}

.about-header {
  text-align: center;
  margin-bottom: 30px;
  padding: 20px 15px;
}

.about-header h1 {
  margin: 0 0 10px 0;
  color: #333;
  font-size: 24px;
}

.about-header p {
  margin: 0;
  color: #666;
  font-size: 16px;
}

.feature-group,
.tech-group,
.device-group,
.contact-group {
  margin-bottom: 20px;
  background: white;
  border-radius: 8px;
}

.version-info {
  margin: 30px 15px;
}

.version-details {
  padding: 20px;
}

.version-details p {
  margin: 10px 0;
  color: #333;
}

/* 移动端优化 */
@media (max-width: 768px) {
  .about {
    margin: 0;
  }
  
  .about-header {
    padding: 15px;
  }
  
  .about-header h1 {
    font-size: 20px;
  }
  
  .about-header p {
    font-size: 14px;
  }
  
  .feature-group,
  .tech-group,
  .device-group,
  .contact-group {
    border-radius: 0;
  }
  
  .version-info {
    margin: 20px 15px;
  }
}

/* 桌面端样式 */
@media (min-width: 769px) {
  .about-header {
    padding: 30px 20px;
  }
  
  .about-header h1 {
    font-size: 28px;
  }
  
  .about-header p {
    font-size: 18px;
  }
  
  .feature-group,
  .tech-group,
  .device-group,
  .contact-group {
    margin-left: 20px;
    margin-right: 20px;
  }
  
  .version-info {
    margin: 40px 20px;
  }
}
</style> 