<template>
  <div class="nav-footer">
    <div class="footer-content">
      <div class="footer-section">
        <h4>关于我们</h4>
        <p>二手手机论坛致力于为用户提供优质的二手手机交易和讨论平台</p>
      </div>
      <div class="footer-section">
        <h4>快速链接</h4>
        <ul>
          <li><router-link to="/forum">论坛讨论</router-link></li>
          <li><router-link to="/market">二手市场</router-link></li>
          <li><router-link to="/guide">购机指南</router-link></li>
          <li><router-link to="/about">关于我们</router-link></li>
        </ul>
      </div>
      <div class="footer-section">
        <h4>联系方式</h4>
        <p>邮箱: contact@phoneforum.com</p>
        <p>电话: 400-123-4567</p>
        <p>地址: 北京市朝阳区科技园区</p>
      </div>
      <div class="footer-section">
        <h4>关注我们</h4>
        <div class="social-links">
          <i class="el-icon-chat-dot-round"></i>
          <i class="el-icon-message"></i>
          <i class="el-icon-phone"></i>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2024 二手手机论坛. 保留所有权利.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavFooter'
}
</script>

<style scoped>
.nav-footer {
  background-color: #f5f5f5;
  color: #666;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  padding: 40px 20px 20px;
}

.footer-section h4 {
  color: #333;
  margin-bottom: 15px;
  font-size: 16px;
}

.footer-section p {
  margin: 8px 0;
  font-size: 14px;
  line-height: 1.6;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section ul li {
  margin: 8px 0;
}

.footer-section ul li a {
  color: #666;
  text-decoration: none;
  font-size: 14px;
}

.footer-section ul li a:hover {
  color: #409EFF;
}

.social-links {
  display: flex;
  gap: 15px;
}

.social-links i {
  font-size: 24px;
  color: #409EFF;
  cursor: pointer;
}

.social-links i:hover {
  color: #337ecc;
}

.footer-bottom {
  border-top: 1px solid #ddd;
  text-align: center;
  padding: 20px;
  background-color: #e8e8e8;
}

.footer-bottom p {
  margin: 0;
  font-size: 14px;
  color: #999;
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    padding: 20px;
  }
}

@media (max-width: 480px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 15px;
    padding: 15px;
  }
}
</style> 