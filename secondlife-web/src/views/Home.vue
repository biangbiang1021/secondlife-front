<template>
  <div class="home">
    <!-- 轮播图 -->
    <van-swipe class="banner" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in banners" :key="item.id">
        <div class="banner-item" :style="{ backgroundImage: `url(${item.image})` }">
          <div class="banner-content">
            <h2>{{ item.title }}</h2>
            <p>{{ item.description }}</p>
            <van-button type="primary" size="large">{{ item.buttonText }}</van-button>
          </div>
        </div>
      </van-swipe-item>
    </van-swipe>

    <!-- 功能区域 -->
    <div class="features">
      <van-grid :column-num="3" :border="false">
        <van-grid-item v-for="feature in features" :key="feature.id">
          <div class="feature-item">
            <div class="feature-icon">
              <van-icon :name="feature.icon" size="24" />
            </div>
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.description }}</p>
          </div>
        </van-grid-item>
      </van-grid>
    </div>

    <!-- 热门帖子 -->
    <div class="hot-posts">
      <div class="section-header">
        <h2>🔥 热门讨论</h2>
        <van-button type="text" @click="$router.push('/forum')">查看更多</van-button>
      </div>
      <van-cell-group>
        <van-cell 
          v-for="post in hotPosts" 
          :key="post.id"
          :title="post.title"
          :label="post.content"
          is-link
          @click="$router.push(`/post/${post.id}`)"
        >
          <template #icon>
            <van-tag type="primary" size="small">{{ post.category }}</van-tag>
          </template>
          <template #right-icon>
            <div class="post-stats">
              <van-icon name="eye-o" />
              <span>{{ post.views }}</span>
              <van-icon name="chat-o" />
              <span>{{ post.replies }}</span>
            </div>
          </template>
        </van-cell>
      </van-cell-group>
    </div>

    <!-- 热门商品 -->
    <div class="hot-products">
      <div class="section-header">
        <h2>💰 热门商品</h2>
        <van-button type="text" @click="$router.push('/market')">查看更多</van-button>
      </div>
      <van-grid :column-num="2" :border="false">
        <van-grid-item v-for="product in hotProducts" :key="product.id">
          <van-card
            :title="product.title"
            :price="product.price"
            :origin-price="product.originalPrice"
            :thumb="product.images[0]"
            @click="$router.push(`/market`)"
          >
            <template #tags>
              <van-tag type="success" size="small">{{ product.condition }}</van-tag>
            </template>
            <template #footer>
              <van-button size="mini" type="primary">查看详情</van-button>
            </template>
          </van-card>
        </van-grid-item>
      </van-grid>
    </div>

    <!-- 统计数据 -->
    <div class="statistics">
      <van-grid :column-num="2" :border="false">
        <van-grid-item v-for="stat in statistics" :key="stat.id">
          <div class="stat-item">
            <div class="stat-number">{{ stat.number }}</div>
            <div class="stat-label">{{ stat.label }}</div>
          </div>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'HomePage',
  data() {
    return {
      banners: [
        {
          id: 1,
          title: '二手手机交易平台',
          description: '安全可靠的二手手机买卖平台，让闲置手机发挥价值',
          buttonText: '立即交易',
          image: 'https://via.placeholder.com/1200x400?text=二手手机交易平台'
        },
        {
          id: 2,
          title: '专业购机指南',
          description: '资深玩家分享购机经验，帮你选到心仪的手机',
          buttonText: '查看指南',
          image: 'https://via.placeholder.com/1200x400?text=专业购机指南'
        },
        {
          id: 3,
          title: '社区交流讨论',
          description: '与志同道合的朋友分享使用心得，交流购机经验',
          buttonText: '加入讨论',
          image: 'https://via.placeholder.com/1200x400?text=社区交流讨论'
        }
      ],
      features: [
        {
          id: 1,
          icon: 'shopping-cart-o',
          title: '安全交易',
          description: '严格的卖家认证机制，确保交易安全可靠'
        },
        {
          id: 2,
          icon: 'chat-o',
          title: '社区交流',
          description: '丰富的社区讨论，分享购机心得和使用体验'
        },
        {
          id: 3,
          icon: 'description',
          title: '购机指南',
          description: '专业的购机建议和评测，帮你做出明智选择'
        }
      ],
      statistics: [
        { id: 1, number: '10,000+', label: '注册用户' },
        { id: 2, number: '50,000+', label: '成功交易' },
        { id: 3, number: '100,000+', label: '社区帖子' },
        { id: 4, number: '99.8%', label: '用户满意度' }
      ]
    }
  },
  computed: {
    ...mapGetters('forum', ['allPosts']),
    ...mapGetters('market', ['allProducts']),
    hotPosts() {
      return this.allPosts.slice(0, 3)
    },
    hotProducts() {
      return this.allProducts.slice(0, 4)
    }
  }
}
</script>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
}

.banner {
  margin-bottom: 20px;
  border-radius: 8px;
  overflow: hidden;
  height: 200px;
}

.banner-item {
  height: 200px;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.banner-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
}

.banner-content {
  text-align: center;
  color: white;
  z-index: 1;
  position: relative;
  padding: 0 20px;
}

.banner-content h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

.banner-content p {
  font-size: 14px;
  margin-bottom: 15px;
}

.features {
  margin-bottom: 30px;
  background: white;
  border-radius: 8px;
  padding: 20px 0;
}

.feature-item {
  text-align: center;
  padding: 15px 10px;
}

.feature-icon {
  margin-bottom: 10px;
  color: #409EFF;
}

.feature-item h3 {
  margin-bottom: 8px;
  color: #333;
  font-size: 16px;
}

.feature-item p {
  color: #666;
  line-height: 1.4;
  font-size: 12px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding: 0 15px;
}

.section-header h2 {
  margin: 0;
  color: #333;
  font-size: 18px;
}

.hot-posts {
  margin-bottom: 30px;
  background: white;
  border-radius: 8px;
  padding: 15px 0;
}

.post-stats {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  color: #999;
}

.hot-products {
  margin-bottom: 30px;
  background: white;
  border-radius: 8px;
  padding: 15px 0;
}

.statistics {
  background: white;
  border-radius: 8px;
  padding: 20px 0;
  margin-bottom: 20px;
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
  font-size: 14px;
}

/* 移动端优化 */
@media (max-width: 768px) {
  .home {
    margin: 0;
  }
  
  .banner {
    border-radius: 0;
    margin-bottom: 15px;
  }
  
  .banner-item {
    border-radius: 0;
  }
  
  .features,
  .hot-posts,
  .hot-products,
  .statistics {
    border-radius: 0;
    margin-left: 0;
    margin-right: 0;
  }
  
  .section-header {
    padding: 0 15px;
  }
}

/* 桌面端样式 */
@media (min-width: 769px) {
  .banner {
    height: 400px;
  }
  
  .banner-item {
    height: 400px;
  }
  
  .banner-content h2 {
    font-size: 36px;
    margin-bottom: 15px;
  }
  
  .banner-content p {
    font-size: 18px;
    margin-bottom: 20px;
  }
  
  .features {
    margin-bottom: 50px;
    padding: 30px 0;
  }
  
  .feature-item {
    padding: 30px 20px;
  }
  
  .feature-item h3 {
    font-size: 18px;
    margin-bottom: 15px;
  }
  
  .feature-item p {
    font-size: 14px;
  }
  
  .section-header {
    margin-bottom: 30px;
    padding: 0 20px;
  }
  
  .section-header h2 {
    font-size: 24px;
  }
  
  .hot-posts,
  .hot-products {
    margin-bottom: 50px;
    padding: 20px 0;
  }
  
  .statistics {
    padding: 40px 0;
    margin-bottom: 40px;
  }
  
  .stat-number {
    font-size: 36px;
    margin-bottom: 10px;
  }
  
  .stat-label {
    font-size: 16px;
  }
}
</style> 