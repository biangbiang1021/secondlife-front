<template>
  <div class="market">
    <!-- 移动端头部 -->
    <div class="market-header">
      <h1>💰 二手市场</h1>
      <van-button type="primary" size="small" @click="showCreateDialog = true" v-if="isLoggedIn">
        <van-icon name="plus" /> 发布
      </van-button>
    </div>

    <!-- 筛选区域 -->
    <div class="filter-section">
      <van-dropdown-menu>
        <van-dropdown-item v-model="selectedCategory" :options="categoryOptions" @change="filterProducts" />
        <van-dropdown-item v-model="priceRange" :options="priceOptions" @change="filterProducts" />
        <van-dropdown-item v-model="condition" :options="conditionOptions" @change="filterProducts" />
      </van-dropdown-menu>
    </div>

    <!-- 商品列表 -->
    <div class="products-grid">
      <van-grid :column-num="2" :border="false">
        <van-grid-item v-for="product in filteredProducts" :key="product.id">
          <van-card
            :title="product.title"
            :price="product.price"
            :origin-price="product.originalPrice"
            :thumb="product.images[0]"
            @click="viewProduct(product.id)"
          >
            <template #tags>
              <van-tag type="warning" size="small">{{ product.condition }}</van-tag>
            </template>
            <template #footer>
              <van-button size="mini" type="primary">查看详情</van-button>
            </template>
            <template #desc>
              <div class="product-desc">{{ product.description }}</div>
              <div class="product-meta">
                <span class="seller">{{ product.seller }}</span>
                <span class="location">{{ product.location }}</span>
              </div>
            </template>
          </van-card>
        </van-grid-item>
      </van-grid>
    </div>

    <!-- 发布商品弹窗 -->
    <van-popup v-model="showCreateDialog" position="bottom" :style="{ height: '90%' }" round>
      <div class="create-product">
        <van-nav-bar
          title="发布商品"
          left-text="取消"
          right-text="发布"
          @click-left="showCreateDialog = false"
          @click-right="createProduct"
        />
        <van-form @submit="createProduct">
          <van-field
            v-model="newProduct.title"
            name="title"
            label="标题"
            placeholder="请输入商品标题"
            :rules="[{ required: true, message: '请输入标题' }]"
          />
          <van-field
            v-model="newProduct.category"
            name="category"
            label="品牌"
            placeholder="请选择品牌"
            readonly
            @click="showCategoryPicker = true"
            :rules="[{ required: true, message: '请选择品牌' }]"
          />
          <van-field
            v-model="newProduct.price"
            name="price"
            label="价格"
            type="number"
            placeholder="请输入价格"
            :rules="[{ required: true, message: '请输入价格' }]"
          />
          <van-field
            v-model="newProduct.originalPrice"
            name="originalPrice"
            label="原价"
            type="number"
            placeholder="请输入原价"
          />
          <van-field
            v-model="newProduct.condition"
            name="condition"
            label="成色"
            placeholder="请选择成色"
            readonly
            @click="showConditionPicker = true"
            :rules="[{ required: true, message: '请选择成色' }]"
          />
          <van-field
            v-model="newProduct.description"
            name="description"
            label="描述"
            type="textarea"
            placeholder="请输入商品描述"
            rows="4"
            :rules="[{ required: true, message: '请输入描述' }]"
          />
          <van-field
            v-model="newProduct.location"
            name="location"
            label="地区"
            placeholder="请输入地区"
            :rules="[{ required: true, message: '请输入地区' }]"
          />
        </van-form>
      </div>
    </van-popup>

    <!-- 品牌选择器 -->
    <van-popup v-model="showCategoryPicker" position="bottom">
      <van-picker
        :columns="categories"
        @confirm="onCategoryConfirm"
        @cancel="showCategoryPicker = false"
      />
    </van-popup>

    <!-- 成色选择器 -->
    <van-popup v-model="showConditionPicker" position="bottom">
      <van-picker
        :columns="conditionList"
        @confirm="onConditionConfirm"
        @cancel="showConditionPicker = false"
      />
    </van-popup>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'MarketPage',
  data() {
    return {
      selectedCategory: '',
      priceRange: '',
      condition: '',
      showCreateDialog: false,
      showCategoryPicker: false,
      showConditionPicker: false,
      newProduct: {
        title: '',
        category: '',
        price: '',
        originalPrice: '',
        condition: '',
        description: '',
        location: '',
        images: ['https://via.placeholder.com/300x200?text=商品图片']
      },
      conditionList: ['全新', '95成新', '9成新', '8成新']
    }
  },
  computed: {
    ...mapGetters('market', ['allProducts', 'categories']),
    ...mapGetters('user', ['isLoggedIn']),
    categoryOptions() {
      return [
        { text: '全部品牌', value: '' },
        ...this.categories.map(category => ({ text: category, value: category }))
      ]
    },
    priceOptions() {
      return [
        { text: '全部价格', value: '' },
        { text: '1000元以下', value: '0-1000' },
        { text: '1000-3000元', value: '1000-3000' },
        { text: '3000-5000元', value: '3000-5000' },
        { text: '5000元以上', value: '5000-999999' }
      ]
    },
    conditionOptions() {
      return [
        { text: '全部成色', value: '' },
        ...this.conditionList.map(condition => ({ text: condition, value: condition }))
      ]
    },
    filteredProducts() {
      let products = this.allProducts

      if (this.selectedCategory) {
        products = products.filter(product => product.category === this.selectedCategory)
      }

      if (this.priceRange) {
        const [min, max] = this.priceRange.split('-').map(Number)
        products = products.filter(product => product.price >= min && product.price <= max)
      }

      if (this.condition) {
        products = products.filter(product => product.condition === this.condition)
      }

      return products
    }
  },
  methods: {
    ...mapActions('market', ['createProduct']),
    filterProducts() {
      // 筛选逻辑已在computed中处理
    },
    resetFilter() {
      this.selectedCategory = ''
      this.priceRange = ''
      this.condition = ''
    },
    viewProduct(id) {
      this.$router.push(`/market/product/${id}`)
    },
    onCategoryConfirm(value) {
      this.newProduct.category = value
      this.showCategoryPicker = false
    },
    onConditionConfirm(value) {
      this.newProduct.condition = value
      this.showConditionPicker = false
    },
    createProduct() {
      if (!this.newProduct.title || !this.newProduct.category || !this.newProduct.price || 
          !this.newProduct.condition || !this.newProduct.description || !this.newProduct.location) {
        this.$toast('请填写完整信息')
        return
      }
      
      const productData = {
        ...this.newProduct,
        seller: this.$store.state.user.username,
        price: Number(this.newProduct.price),
        originalPrice: Number(this.newProduct.originalPrice) || 0
      }
      
      this.$store.dispatch('market/createProduct', productData)
      this.showCreateDialog = false
      this.$toast('商品发布成功！')
      this.newProduct = {
        title: '',
        category: '',
        price: '',
        originalPrice: '',
        condition: '',
        description: '',
        location: '',
        images: ['https://via.placeholder.com/300x200?text=商品图片']
      }
    }
  }
}
</script>

<style scoped>
.market {
  max-width: 1000px;
  margin: 0 auto;
}

.market-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 0 15px;
}

.market-header h1 {
  margin: 0;
  color: #333;
  font-size: 20px;
}

.filter-section {
  margin-bottom: 20px;
  background: white;
  border-radius: 8px;
}

.products-grid {
  margin-bottom: 20px;
}

.product-desc {
  font-size: 12px;
  color: #666;
  margin-bottom: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.product-meta {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #999;
}

.seller {
  color: #409EFF;
}

.create-product {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.create-product .van-form {
  flex: 1;
  padding: 20px;
}

/* 移动端优化 */
@media (max-width: 768px) {
  .market {
    margin: 0;
  }
  
  .market-header {
    padding: 0 15px;
  }
  
  .filter-section {
    border-radius: 0;
  }
}

/* 桌面端样式 */
@media (min-width: 769px) {
  .market-header {
    margin-bottom: 30px;
    padding: 0 20px;
  }
  
  .market-header h1 {
    font-size: 24px;
  }
  
  .filter-section {
    margin-bottom: 30px;
    padding: 20px;
    background-color: #f5f5f5;
  }
  
  .products-grid {
    margin-bottom: 40px;
  }
}
</style> 