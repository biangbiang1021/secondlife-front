<template>
  <div class="post-list">
    <!-- 搜索区域 -->
    <el-card>
      <el-form :inline="true" :model="searchForm" class="search-form">
        <el-form-item label="标题">
          <el-input v-model="searchForm.title" placeholder="请输入标题关键词" />
        </el-form-item>
        <el-form-item label="分类">
          <el-select v-model="searchForm.category" placeholder="请选择分类">
            <el-option label="全部" value="" />
            <el-option
              v-for="category in categories"
              :key="category.id"
              :label="category.name"
              :value="category.name"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchForm.status" placeholder="请选择状态">
            <el-option label="全部" value="" />
            <el-option label="已发布" value="published" />
            <el-option label="草稿" value="draft" />
            <el-option label="已删除" value="deleted" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">搜索</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 帖子列表 -->
    <el-card>
      <div slot="header">
        <span>帖子管理</span>
      </div>
      
      <el-table
        v-loading="loading"
        :data="postList"
        style="width: 100%"
      >
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="title" label="标题" min-width="200" />
        <el-table-column prop="author" label="作者" width="120" />
        <el-table-column prop="category" label="分类" width="100" />
        <el-table-column prop="views" label="浏览量" width="100" />
        <el-table-column prop="replies" label="回复数" width="100" />
        <el-table-column prop="status" label="状态" width="100">
          <template slot-scope="scope">
            <el-tag :type="getStatusType(scope.row.status)">
              {{ getStatusText(scope.row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="发布时间" width="160" />
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleView(scope.row)">查看</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="pagination-container">
        <el-pagination
          :current-page="pagination.page"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pagination.pageSize"
          :total="totalPosts"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>

    <!-- 查看帖子对话框 -->
    <el-dialog
      title="帖子详情"
      :visible.sync="dialogVisible"
      width="800px"
    >
      <div v-if="currentPost">
        <h3>{{ currentPost.title }}</h3>
        <p><strong>作者：</strong>{{ currentPost.author }}</p>
        <p><strong>分类：</strong>{{ currentPost.category }}</p>
        <p><strong>发布时间：</strong>{{ currentPost.createTime }}</p>
        <p><strong>浏览量：</strong>{{ currentPost.views }}</p>
        <p><strong>回复数：</strong>{{ currentPost.replies }}</p>
        <div style="margin-top: 20px;">
          <h4>内容：</h4>
          <div style="border: 1px solid #eee; padding: 15px; border-radius: 4px;">
            {{ currentPost.content }}
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'PostList',
  data() {
    return {
      searchForm: {
        title: '',
        category: '',
        status: ''
      },
      pagination: {
        page: 1,
        pageSize: 10
      },
      dialogVisible: false,
      currentPost: null
    }
  },
  computed: {
    ...mapState('forum', ['postList', 'totalPosts', 'categories', 'loading'])
  },
  mounted() {
    this.loadPostList()
    this.loadCategories()
  },
  methods: {
    ...mapActions('forum', ['getPostList', 'deletePost', 'getCategories']),

    async loadPostList() {
      const params = {
        ...this.searchForm,
        ...this.pagination
      }
      await this.getPostList(params)
    },

    async loadCategories() {
      await this.getCategories()
    },

    handleSearch() {
      this.pagination.page = 1
      this.loadPostList()
    },

    handleReset() {
      this.searchForm = {
        title: '',
        category: '',
        status: ''
      }
      this.pagination.page = 1
      this.loadPostList()
    },

    handleSizeChange(size) {
      this.pagination.pageSize = size
      this.loadPostList()
    },

    handleCurrentChange(page) {
      this.pagination.page = page
      this.loadPostList()
    },

    handleView(row) {
      this.currentPost = row
      this.dialogVisible = true
    },

    async handleDelete(row) {
      try {
        await this.$confirm('确定要删除该帖子吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        
        await this.deletePost(row.id)
        this.$message.success('删除成功')
        this.loadPostList()
      } catch (error) {
        if (error !== 'cancel') {
          this.$message.error('删除失败')
        }
      }
    },

    getStatusType(status) {
      const types = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return types[status] || 'info'
    },

    getStatusText(status) {
      const texts = {
        published: '已发布',
        draft: '草稿',
        deleted: '已删除'
      }
      return texts[status] || status
    }
  }
}
</script>

<style scoped>
.search-form .el-form-item {
  margin-bottom: 15px;
}

.pagination-container {
  text-align: center;
  margin-top: 20px;
}
</style> 