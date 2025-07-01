<template>
  <div class="my-posts">
    <!-- 移动端头部 -->
    <div class="my-posts-header">
      <h1>📝 我的帖子</h1>
    </div>

    <!-- 帖子列表 -->
    <div class="posts-list">
      <van-cell-group v-if="myPosts.length > 0">
        <van-cell 
          v-for="post in myPosts" 
          :key="post.id"
          :title="post.title"
          :label="post.content"
          is-link
          @click="viewPost(post.id)"
        >
          <template #icon>
            <van-tag type="primary" size="small">{{ post.category }}</van-tag>
          </template>
          <template #right-icon>
            <div class="post-actions">
              <van-button 
                size="mini" 
                type="danger" 
                @click.stop="deletePost(post.id)"
              >
                删除
              </van-button>
            </div>
          </template>
        </van-cell>
      </van-cell-group>
      
      <!-- 空状态 -->
      <div v-else class="empty-state">
        <van-empty description="暂无帖子" />
        <van-button type="primary" @click="$router.push('/forum')">
          去发布帖子
        </van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyPosts',
  data() {
    return {
      myPosts: []
    }
  },
  computed: {
    username() {
      try {
        return this.$store.state.user.username
      } catch (error) {
        console.error('获取用户名失败:', error)
        return ''
      }
    }
  },
  methods: {
    viewPost(id) {
      try {
        this.$router.push(`/post/${id}`)
      } catch (error) {
        console.error('查看帖子失败:', error)
        this.$toast('查看帖子失败')
      }
    },
    deletePost(id) {
      try {
        // 简单的删除逻辑
        this.myPosts = this.myPosts.filter(post => post.id !== id)
        this.$toast('删除成功')
      } catch (error) {
        console.error('删除帖子失败:', error)
        this.$toast('删除失败')
      }
    },
    loadMyPosts() {
      try {
        // 模拟从store获取帖子数据
        const allPosts = this.$store.state.forum?.posts || []
        this.myPosts = allPosts.filter(post => post.author === this.username)
      } catch (error) {
        console.error('加载我的帖子失败:', error)
        this.myPosts = []
      }
    }
  },
  mounted() {
    console.log('我的帖子页面已加载')
    this.loadMyPosts()
  }
}
</script>

<style scoped>
.my-posts {
  max-width: 1000px;
  margin: 0 auto;
}

.my-posts-header {
  margin-bottom: 20px;
  padding: 0 15px;
}

.my-posts-header h1 {
  margin: 0;
  color: #333;
  font-size: 20px;
}

.posts-list {
  margin-bottom: 20px;
}

.post-actions {
  display: flex;
  align-items: center;
}

.empty-state {
  text-align: center;
  padding: 40px 20px;
}

/* 移动端优化 */
@media (max-width: 768px) {
  .my-posts {
    margin: 0;
  }
  
  .my-posts-header {
    padding: 0 15px;
  }
}

/* 桌面端样式 */
@media (min-width: 769px) {
  .my-posts-header {
    margin-bottom: 30px;
    padding: 0 20px;
  }
  
  .my-posts-header h1 {
    font-size: 24px;
  }
}
</style> 