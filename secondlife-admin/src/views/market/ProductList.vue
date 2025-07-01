<template>
  <div class="product-list">
    <!-- 搜索区域 -->
    <el-card>
      <el-form :inline="true" :model="searchForm" class="search-form">
        <el-form-item label="标题">
          <el-input v-model="searchForm.title" placeholder="请输入商品标题" />
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
            <el-option label="在售" value="on_sale" />
            <el-option label="已售出" value="sold" />
            <el-option label="已下架" value="off_shelf" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">搜索</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 商品列表 -->
    <el-card>
      <div slot="header">
        <span>商品管理</span>
      </div>
      
      <el-table
        v-loading="loading"
        :data="productList"
        style="width: 100%"
      >
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column label="图片" width="100">
          <template slot-scope="scope">
            <el-image
              :src="scope.row.images[0]"
              style="width: 60px; height: 60px"
              fit="cover"
            />
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" min-width="200" />
        <el-table-column prop="price" label="价格" width="100">
          <template slot-scope="scope">
            ¥{{ scope.row.price }}
          </template>
        </el-table-column>
        <el-table-column prop="condition" label="成色" width="100" />
        <el-table-column prop="seller" label="卖家" width="120" />
        <el-table-column prop="location" label="地区" width="100" />
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
          :total="totalProducts"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>

    <!-- 查看商品对话框 -->
    <el-dialog
      title="商品详情"
      :visible.sync="dialogVisible"
      width="800px"
    >
      <div v-if="currentProduct">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-image
              :src="currentProduct.images[0]"
              style="width: 100%; height: 300px"
              fit="cover"
            />
          </el-col>
          <el-col :span="12">
            <h3>{{ currentProduct.title }}</h3>
            <p><strong>价格：</strong>¥{{ currentProduct.price }}</p>
            <p><strong>原价：</strong>¥{{ currentProduct.originalPrice }}</p>
            <p><strong>成色：</strong>{{ currentProduct.condition }}</p>
            <p><strong>卖家：</strong>{{ currentProduct.seller }}</p>
            <p><strong>地区：</strong>{{ currentProduct.location }}</p>
            <p><strong>发布时间：</strong>{{ currentProduct.createTime }}</p>
            <p><strong>浏览量：</strong>{{ currentProduct.views }}</p>
          </el-col>
        </el-row>
        <div style="margin-top: 20px;">
          <h4>商品描述：</h4>
          <div style="border: 1px solid #eee; padding: 15px; border-radius: 4px;">
            {{ currentProduct.description }}
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'ProductList',
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
      currentProduct: null
    }
  },
  computed: {
    ...mapState('market', ['productList', 'totalProducts', 'categories', 'loading'])
  },
  mounted() {
    this.loadProductList()
    this.loadCategories()
  },
  methods: {
    ...mapActions('market', ['getProductList', 'deleteProduct', 'getCategories']),

    async loadProductList() {
      const params = {
        ...this.searchForm,
        ...this.pagination
      }
      await this.getProductList(params)
    },

    async loadCategories() {
      await this.getCategories()
    },

    handleSearch() {
      this.pagination.page = 1
      this.loadProductList()
    },

    handleReset() {
      this.searchForm = {
        title: '',
        category: '',
        status: ''
      }
      this.pagination.page = 1
      this.loadProductList()
    },

    handleSizeChange(size) {
      this.pagination.pageSize = size
      this.loadProductList()
    },

    handleCurrentChange(page) {
      this.pagination.page = page
      this.loadProductList()
    },

    handleView(row) {
      this.currentProduct = row
      this.dialogVisible = true
    },

    async handleDelete(row) {
      try {
        await this.$confirm('确定要删除该商品吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        
        await this.deleteProduct(row.id)
        this.$message.success('删除成功')
        this.loadProductList()
      } catch (error) {
        if (error !== 'cancel') {
          this.$message.error('删除失败')
        }
      }
    },

    getStatusType(status) {
      const types = {
        on_sale: 'success',
        sold: 'info',
        off_shelf: 'danger'
      }
      return types[status] || 'info'
    },

    getStatusText(status) {
      const texts = {
        on_sale: '在售',
        sold: '已售出',
        off_shelf: '已下架'
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