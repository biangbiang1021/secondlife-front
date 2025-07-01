<template>
  <div class="profile">
    <!-- 用户信息卡片 -->
    <van-cell-group class="user-card">
      <van-cell>
        <template #icon>
          <van-image
            round
            width="60"
            height="60"
            src="https://via.placeholder.com/60x60?text=头像"
          />
        </template>
        <template #title>
          <div class="user-info">
            <h3>{{ displayUsername }}</h3>
            <p>{{ displayEmail }}</p>
          </div>
        </template>
      </van-cell>
    </van-cell-group>

    <!-- 功能菜单 -->
    <van-cell-group class="menu-group">
      <van-cell title="我的帖子" icon="records" is-link @click="goToMyPosts" />
      <van-cell title="我的收藏" icon="star-o" is-link />
      <van-cell title="我的订单" icon="orders-o" is-link />
      <van-cell title="消息通知" icon="bell" is-link />
    </van-cell-group>

    <van-cell-group class="menu-group">
      <van-cell title="账户设置" icon="setting-o" is-link />
      <van-cell title="隐私设置" icon="shield-o" is-link />
      <van-cell title="帮助中心" icon="question-o" is-link />
      <van-cell title="关于我们" icon="info-o" is-link @click="goToAbout" />
    </van-cell-group>

    <!-- 退出登录 -->
    <div class="logout-section">
      <van-button type="danger" block @click="handleLogout">退出登录</van-button>
    </div>

    <!-- 统计数据 -->
    <van-cell-group class="stats-group">
      <van-grid :column-num="3" :border="false">
        <van-grid-item>
          <div class="stat-item">
            <div class="stat-number">{{ userStats.posts }}</div>
            <div class="stat-label">发布帖子</div>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div class="stat-item">
            <div class="stat-number">{{ userStats.products }}</div>
            <div class="stat-label">发布商品</div>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div class="stat-item">
            <div class="stat-number">{{ userStats.followers }}</div>
            <div class="stat-label">关注者</div>
          </div>
        </van-grid-item>
      </van-grid>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: 'ProfilePage',
  data() {
    return {
      userStats: {
        posts: 12,
        products: 5,
        followers: 28
      }
    }
  },
  computed: {
    displayUsername() {
      try {
        return this.$store.state.user.username || '未登录用户'
      } catch (error) {
        console.error('获取用户名失败:', error)
        return '未登录用户'
      }
    },
    displayEmail() {
      try {
        return this.$store.state.user.email || '请先登录'
      } catch (error) {
        console.error('获取邮箱失败:', error)
        return '请先登录'
      }
    }
  },
  methods: {
    goToMyPosts() {
      try {
        this.$router.push('/my-posts')
      } catch (error) {
        console.error('跳转到我的帖子失败:', error)
        this.$toast('页面跳转失败')
      }
    },
    goToAbout() {
      try {
        this.$router.push('/about')
      } catch (error) {
        console.error('跳转到关于页面失败:', error)
        this.$toast('页面跳转失败')
      }
    },
    handleLogout() {
      try {
        // 简单的退出登录，不使用Dialog
        this.$store.dispatch('user/logout')
        this.$toast('已退出登录')
        this.$router.push('/')
      } catch (error) {
        console.error('退出登录失败:', error)
        this.$toast('退出登录失败')
      }
    }
  },
  mounted() {
    console.log('个人中心页面已加载')
    console.log('当前用户状态:', this.$store.state.user)
  }
}
</script>

<style scoped>
.profile {
  max-width: 800px;
  margin: 0 auto;
}

.user-card {
  margin-bottom: 20px;
  background: white;
  border-radius: 8px;
}

.user-info h3 {
  margin: 0 0 5px 0;
  color: #333;
  font-size: 18px;
}

.user-info p {
  margin: 0;
  color: #666;
  font-size: 14px;
}

.menu-group {
  margin-bottom: 20px;
  background: white;
  border-radius: 8px;
}

.logout-section {
  margin: 20px 0;
  padding: 0 15px;
}

.stats-group {
  background: white;
  border-radius: 8px;
  padding: 20px 0;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 24px;
  font-weight: bold;
  color: #409EFF;
  margin-bottom: 5px;
}

.stat-label {
  color: #666;
  font-size: 12px;
}

/* 移动端优化 */
@media (max-width: 768px) {
  .profile {
    margin: 0;
  }
  
  .user-card,
  .menu-group,
  .stats-group {
    border-radius: 0;
  }
  
  .logout-section {
    padding: 0 15px;
  }
}

/* 桌面端样式 */
@media (min-width: 769px) {
  .user-card,
  .menu-group,
  .stats-group {
    margin-left: 20px;
    margin-right: 20px;
  }
  
  .logout-section {
    padding: 0 20px;
  }
  
  .stat-number {
    font-size: 28px;
    margin-bottom: 8px;
  }
  
  .stat-label {
    font-size: 14px;
  }
}
</style> 