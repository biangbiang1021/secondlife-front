<template>
  <div class="forum">
    <!-- 移动端头部 -->
    <div class="forum-header">
      <h1>📝 论坛讨论</h1>
      <van-button type="primary" size="small" @click="showCreateDialog = true" v-if="isLoggedIn">
        <van-icon name="plus" /> 发布
      </van-button>
    </div>

    <!-- 分类筛选 -->
    <div class="filter-section">
      <van-tabs v-model="selectedCategory" @change="filterPosts" sticky>
        <van-tab title="全部" name=""></van-tab>
        <van-tab v-for="category in categories" :key="category" :title="category" :name="category"></van-tab>
      </van-tabs>
    </div>

    <!-- 帖子列表 -->
    <div class="posts-list">
      <van-cell-group>
        <van-cell 
          v-for="post in filteredPosts" 
          :key="post.id" 
          :title="post.title"
          :label="post.content"
          is-link
          @click="viewPost(post.id)"
        >
          <template #icon>
            <van-tag :type="getTagType(post.category)" size="small">{{ post.category }}</van-tag>
          </template>
          <template #right-icon>
            <div class="post-meta">
              <div class="post-author">
                <van-icon name="user-o" />
                <span>{{ post.author }}</span>
              </div>
              <div class="post-stats">
                <van-icon name="eye-o" />
                <span>{{ post.views }}</span>
                <van-icon name="chat-o" />
                <span>{{ post.replies }}</span>
              </div>
            </div>
          </template>
        </van-cell>
      </van-cell-group>
    </div>

    <!-- 发布帖子弹窗 -->
    <van-popup v-model="showCreateDialog" position="bottom" :style="{ height: '80%' }" round>
      <div class="create-post">
        <van-nav-bar
          title="发布新帖子"
          left-text="取消"
          right-text="发布"
          @click-left="showCreateDialog = false"
          @click-right="createPost"
        />
        <van-form @submit="createPost">
          <van-field
            v-model="newPost.title"
            name="title"
            label="标题"
            placeholder="请输入帖子标题"
            :rules="[{ required: true, message: '请输入标题' }]"
          />
          <van-field
            v-model="newPost.category"
            name="category"
            label="分类"
            placeholder="请选择分类"
            readonly
            @click="showCategoryPicker = true"
            :rules="[{ required: true, message: '请选择分类' }]"
          />
          <van-field
            v-model="newPost.content"
            name="content"
            label="内容"
            type="textarea"
            placeholder="请输入帖子内容"
            rows="6"
            :rules="[{ required: true, message: '请输入内容' }]"
          />
          <van-field
            v-model="newPost.tags"
            name="tags"
            label="标签"
            placeholder="请输入标签，用逗号分隔"
          />
        </van-form>
      </div>
    </van-popup>

    <!-- 分类选择器 -->
    <van-popup v-model="showCategoryPicker" position="bottom">
      <van-picker
        :columns="categories"
        @confirm="onCategoryConfirm"
        @cancel="showCategoryPicker = false"
      />
    </van-popup>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ForumPage',
  data() {
    return {
      selectedCategory: '',
      showCreateDialog: false,
      showCategoryPicker: false,
      newPost: {
        title: '',
        category: '',
        content: '',
        tags: ''
      }
    }
  },
  computed: {
    ...mapGetters('forum', ['allPosts', 'categories']),
    ...mapGetters('user', ['isLoggedIn']),
    filteredPosts() {
      if (!this.selectedCategory) {
        return this.allPosts
      }
      return this.allPosts.filter(post => post.category === this.selectedCategory)
    }
  },
  methods: {
    ...mapActions('forum', ['createPost']),
    filterPosts() {
      // 分类筛选逻辑已在computed中处理
    },
    viewPost(id) {
      this.$router.push(`/post/${id}`)
    },
    getTagType(category) {
      const types = {
        'iPhone': 'primary',
        '华为': 'success',
        '小米': 'warning',
        'OPPO': 'info',
        'vivo': 'danger',
        '三星': 'primary',
        '其他': ''
      }
      return types[category] || ''
    },
    onCategoryConfirm(value) {
      this.newPost.category = value
      this.showCategoryPicker = false
    },
    createPost() {
      if (!this.newPost.title || !this.newPost.category || !this.newPost.content) {
        this.$toast('请填写完整信息')
        return
      }
      
      const postData = {
        ...this.newPost,
        author: this.$store.state.user.username,
        tags: this.newPost.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      }
      
      this.$store.dispatch('forum/createPost', postData)
      this.showCreateDialog = false
      this.$toast('帖子发布成功！')
      this.newPost = { title: '', category: '', content: '', tags: '' }
    }
  }
}
</script>

<style scoped>
.forum {
  max-width: 1000px;
  margin: 0 auto;
}

.forum-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 0 15px;
}

.forum-header h1 {
  margin: 0;
  color: #333;
  font-size: 20px;
}

.filter-section {
  margin-bottom: 20px;
  background: white;
  border-radius: 8px;
}

.posts-list {
  margin-bottom: 20px;
}

.post-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 5px;
  font-size: 12px;
  color: #999;
}

.post-author {
  display: flex;
  align-items: center;
  gap: 3px;
}

.post-stats {
  display: flex;
  align-items: center;
  gap: 8px;
}

.create-post {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.create-post .van-form {
  flex: 1;
  padding: 20px;
}

/* 移动端优化 */
@media (max-width: 768px) {
  .forum {
    margin: 0;
  }
  
  .forum-header {
    padding: 0 15px;
  }
  
  .filter-section {
    border-radius: 0;
  }
}

/* 桌面端样式 */
@media (min-width: 769px) {
  .forum-header {
    margin-bottom: 30px;
    padding: 0 20px;
  }
  
  .forum-header h1 {
    font-size: 24px;
  }
  
  .filter-section {
    margin-bottom: 30px;
    padding: 20px;
    background-color: #f5f5f5;
  }
  
  .posts-list {
    margin-bottom: 40px;
  }
}
</style> 