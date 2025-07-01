<template>
  <div class="guide">
    <!-- 移动端头部 -->
    <div class="guide-header">
      <h1>📖 购机指南</h1>
      <p>专业的二手手机购买建议和评测</p>
    </div>

    <!-- 指南内容 -->
    <div class="guide-content">
      <van-cell-group class="guide-section">
        <van-cell title="💡 购机建议" />
      </van-cell-group>

      <van-collapse v-model="activeNames" accordion>
        <van-collapse-item title="检查手机外观" name="1">
          <div class="guide-item">
            <p>购买二手手机时，首先要仔细检查手机的外观状况。</p>
            <ul>
              <li>检查屏幕是否有划痕或裂痕</li>
              <li>查看机身是否有明显的磕碰痕迹</li>
              <li>检查按键是否正常</li>
            </ul>
          </div>
        </van-collapse-item>
        
        <van-collapse-item title="测试手机功能" name="2">
          <div class="guide-item">
            <p>外观检查完毕后，要全面测试手机的各项功能。</p>
            <ul>
              <li>测试屏幕触控是否灵敏</li>
              <li>检查摄像头拍照功能</li>
              <li>测试扬声器和麦克风</li>
            </ul>
          </div>
        </van-collapse-item>
        
        <van-collapse-item title="验证手机真伪" name="3">
          <div class="guide-item">
            <p>确保购买的是正品手机，避免买到山寨机。</p>
            <ul>
              <li>查看IMEI码是否与系统显示一致</li>
              <li>检查手机序列号</li>
              <li>验证系统版本和更新</li>
            </ul>
          </div>
        </van-collapse-item>
      </van-collapse>

      <!-- 品牌推荐 -->
      <van-cell-group class="brand-section">
        <van-cell title="📱 热门品牌" />
        <van-grid :column-num="3" :border="false">
          <van-grid-item v-for="brand in brands" :key="brand.name">
            <div class="brand-item">
              <van-image :src="brand.icon" width="40" height="40" />
              <p>{{ brand.name }}</p>
            </div>
          </van-grid-item>
        </van-grid>
      </van-cell-group>

      <!-- 价格参考 -->
      <van-cell-group class="price-section">
        <van-cell title="💰 价格参考" />
        <van-cell 
          v-for="price in priceRanges" 
          :key="price.range"
          :title="price.range"
          :label="price.description"
        />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GuidePage',
  data() {
    return {
      activeNames: ['1'],
      brands: [
        { name: 'iPhone', icon: 'https://via.placeholder.com/40x40?text=🍎' },
        { name: '华为', icon: 'https://via.placeholder.com/40x40?text=🌸' },
        { name: '小米', icon: 'https://via.placeholder.com/40x40?text=🌾' },
        { name: 'OPPO', icon: 'https://via.placeholder.com/40x40?text=🔵' },
        { name: 'vivo', icon: 'https://via.placeholder.com/40x40?text=🔴' },
        { name: '三星', icon: 'https://via.placeholder.com/40x40?text=⭐' }
      ],
      priceRanges: [
        { range: '1000元以下', description: '入门级手机，适合日常使用' },
        { range: '1000-3000元', description: '中端手机，性价比高' },
        { range: '3000-5000元', description: '高端手机，性能强劲' },
        { range: '5000元以上', description: '旗舰手机，顶级配置' }
      ]
    }
  }
}
</script>

<style scoped>
.guide {
  max-width: 800px;
  margin: 0 auto;
}

.guide-header {
  text-align: center;
  margin-bottom: 20px;
  padding: 20px 15px;
}

.guide-header h1 {
  margin: 0 0 10px 0;
  color: #333;
  font-size: 24px;
}

.guide-header p {
  margin: 0;
  color: #666;
  font-size: 16px;
}

.guide-content {
  margin-bottom: 20px;
}

.guide-section,
.brand-section,
.price-section {
  margin-bottom: 20px;
  background: white;
  border-radius: 8px;
}

.guide-item {
  padding: 10px 0;
}

.guide-item p {
  margin: 0 0 10px 0;
  color: #333;
  line-height: 1.6;
}

.guide-item ul {
  margin: 0;
  padding-left: 20px;
  color: #666;
}

.guide-item li {
  margin: 5px 0;
  line-height: 1.5;
}

.brand-item {
  text-align: center;
  padding: 10px;
}

.brand-item p {
  margin: 5px 0 0 0;
  font-size: 12px;
  color: #333;
}

/* 移动端优化 */
@media (max-width: 768px) {
  .guide {
    margin: 0;
  }
  
  .guide-header {
    padding: 15px;
  }
  
  .guide-header h1 {
    font-size: 20px;
  }
  
  .guide-header p {
    font-size: 14px;
  }
  
  .guide-section,
  .brand-section,
  .price-section {
    border-radius: 0;
  }
}

/* 桌面端样式 */
@media (min-width: 769px) {
  .guide-header {
    margin-bottom: 30px;
    padding: 30px 20px;
  }
  
  .guide-header h1 {
    font-size: 28px;
  }
  
  .guide-header p {
    font-size: 18px;
  }
  
  .guide-section,
  .brand-section,
  .price-section {
    margin-left: 20px;
    margin-right: 20px;
  }
}
</style> 