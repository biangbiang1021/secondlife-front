<template>
  <div class="post-detail">
    <!-- 帖子详情 -->
    <van-cell-group class="post-card">
      <van-cell>
        <template #title>
          <div class="post-header">
            <h1>{{ post.title }}</h1>
            <div class="post-meta">
              <span class="author">{{ post.author }}</span>
              <span class="time">{{ post.createTime }}</span>
              <span class="views">{{ post.views }} 阅读</span>
            </div>
          </div>
        </template>
      </van-cell>
      
      <van-cell>
        <template #default>
          <div class="post-content">
            <p>{{ post.content }}</p>
          </div>
        </template>
      </van-cell>
    </van-cell-group>

    <!-- 评论区 -->
    <van-cell-group class="comments-section">
      <van-cell title="💬 评论" />
      <van-cell v-if="comments.length === 0">
        <template #default>
          <div class="empty-comments">
            <p>暂无评论，快来发表第一条评论吧！</p>
          </div>
        </template>
      </van-cell>
      <van-cell 
        v-for="comment in comments" 
        :key="comment.id"
        :title="comment.author"
        :label="comment.content"
      >
        <template #right-icon>
          <span class="comment-time">{{ comment.time }}</span>
        </template>
      </van-cell>
    </van-cell-group>

    <!-- 发表评论 -->
    <div class="comment-form">
      <van-field
        v-model="newComment"
        type="textarea"
        placeholder="写下你的评论..."
        rows="3"
      />
      <van-button type="primary" block @click="submitComment">
        发表评论
      </van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostDetail',
  data() {
    return {
      newComment: '',
      comments: []
    }
  },
  computed: {
    post() {
      try {
        const id = parseInt(this.$route.params.id)
        const allPosts = this.$store.state.forum?.posts || []
        return allPosts.find(post => post.id === id) || {
          title: '帖子不存在',
          author: '',
          createTime: '',
          views: 0,
          content: '该帖子已被删除或不存在。'
        }
      } catch (error) {
        console.error('获取帖子详情失败:', error)
        return {
          title: '帖子不存在',
          author: '',
          createTime: '',
          views: 0,
          content: '该帖子已被删除或不存在。'
        }
      }
    }
  },
  methods: {
    submitComment() {
      if (!this.newComment.trim()) {
        this.$toast('请输入评论内容')
        return
      }
      
      try {
        const comment = {
          id: Date.now(),
          author: this.$store.state.user.username || '匿名用户',
          content: this.newComment,
          time: new Date().toLocaleString()
        }
        
        this.comments.unshift(comment)
        this.newComment = ''
        this.$toast('评论发表成功')
      } catch (error) {
        console.error('发表评论失败:', error)
        this.$toast('评论发表失败')
      }
    },
    loadComments() {
      // 模拟加载评论数据
      this.comments = [
        {
          id: 1,
          author: '用户A',
          content: '这个帖子很有用，感谢分享！',
          time: '2024-01-01 10:00'
        },
        {
          id: 2,
          author: '用户B',
          content: '学到了很多，谢谢楼主',
          time: '2024-01-01 09:30'
        }
      ]
    }
  },
  mounted() {
    console.log('帖子详情页面已加载')
    this.loadComments()
  }
}
</script>

<style scoped>
.post-detail {
  max-width: 800px;
  margin: 0 auto;
}

.post-card {
  margin-bottom: 20px;
  background: white;
  border-radius: 8px;
}

.post-header h1 {
  margin: 0 0 10px 0;
  color: #333;
  font-size: 20px;
}

.post-meta {
  display: flex;
  gap: 15px;
  color: #999;
  font-size: 12px;
}

.author {
  color: #409EFF;
}

.post-content {
  line-height: 1.8;
  color: #333;
  padding: 10px 0;
}

.comments-section {
  margin-bottom: 20px;
  background: white;
  border-radius: 8px;
}

.empty-comments {
  text-align: center;
  color: #999;
  padding: 20px;
}

.comment-time {
  font-size: 12px;
  color: #999;
}

.comment-form {
  background: white;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
}

/* 移动端优化 */
@media (max-width: 768px) {
  .post-detail {
    margin: 0;
  }
  
  .post-header h1 {
    font-size: 18px;
  }
  
  .post-card,
  .comments-section,
  .comment-form {
    border-radius: 0;
  }
  
  .comment-form {
    margin: 0 15px 20px 15px;
  }
}

/* 桌面端样式 */
@media (min-width: 769px) {
  .post-header h1 {
    font-size: 24px;
  }
  
  .post-card,
  .comments-section,
  .comment-form {
    margin-left: 20px;
    margin-right: 20px;
  }
}
</style> 