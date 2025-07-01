# 二手手机论坛 - 部署指南

## 📋 目录
- [部署概述](#部署概述)
- [环境准备](#环境准备)
- [本地开发部署](#本地开发部署)
- [生产环境部署](#生产环境部署)
- [移动端部署](#移动端部署)
- [Docker部署](#docker部署)
- [CI/CD部署](#cicd部署)
- [性能优化](#性能优化)
- [监控和维护](#监控和维护)

## 🎯 部署概述

### 项目架构特点
本项目采用前后台分离的架构设计：
- **前台系统**: 面向普通用户的二手手机论坛和交易平台
- **后台系统**: 面向管理员的系统管理平台
- **独立部署**: 两个系统可以独立部署和扩展
- **统一管理**: 通过根目录的package.json统一管理两个系统

### 部署架构
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   用户浏览器     │    │   CDN加速       │    │   负载均衡器     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │   Web服务器     │
                    │   (Nginx)       │
                    └─────────────────┘
                                 │
         ┌───────────────────────┼───────────────────────┐
         │                       │                       │
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   前台系统       │    │   后台系统       │    │   静态资源       │
│   (secondlife-web)    │    │   (secondlife-admin)       │    │   (dist目录)     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### 部署目标
- **高可用性**: 确保服务稳定运行
- **高性能**: 快速响应和加载
- **安全性**: 保护用户数据和隐私
- **可扩展性**: 支持业务增长

## 🛠️ 环境准备

### 系统要求
- **操作系统**: Linux (Ubuntu 20.04+ / CentOS 7+)
- **内存**: 最少 2GB，推荐 4GB+
- **存储**: 最少 10GB 可用空间
- **网络**: 稳定的网络连接

### 软件依赖
```bash
# Node.js环境
Node.js >= 18.0.0
npm >= 6.0.0

# Web服务器
Nginx >= 1.18.0

# 可选：Docker
Docker >= 20.10.0
Docker Compose >= 2.0.0
```

### 安装Node.js
```bash
# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# CentOS/RHEL
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs

# 验证安装
node --version
npm --version
```

### 安装Nginx
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install nginx

# CentOS/RHEL
sudo yum install epel-release
sudo yum install nginx

# 启动Nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

## 💻 本地开发部署

### 1. 克隆项目
```bash
git clone <项目地址>
cd second-hand-phone-forum
```

### 2. 安装依赖
```bash
npm install
```

### 3. 启动开发服务器
```bash
# 同时启动前台和后台
npm run dev

# 或者分别启动
npm run frontend    # 启动前台系统 (http://localhost:8080)
npm run admin       # 启动后台系统 (http://localhost:8081/admin)
```

### 4. 访问应用
- **前台系统**: http://localhost:8080
- **后台系统**: http://localhost:8081/admin
- **网络访问**: http://<服务器IP>:8080 (前台)

### 5. 开发环境配置
```javascript
// vue.config.js
module.exports = {
  transpileDependencies: true,
  devServer: {
    port: 8080,
    open: true,
    host: '0.0.0.0',  // 允许外部访问
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
}
```

## 🚀 生产环境部署

### 1. 构建生产版本
```bash
# 安装所有依赖
npm run install:all

# 构建前台系统
npm run frontend:build

# 构建后台系统
npm run admin:build

# 构建完成后会生成secondlife-web/dist和secondlife-admin/dist目录
ls -la secondlife-web/dist/
ls -la secondlife-admin/dist/
```

### 2. 部署到Web服务器
```bash
# 创建前台部署目录
sudo mkdir -p /var/www/second-hand-phone-forum

# 创建后台部署目录
sudo mkdir -p /var/www/second-hand-phone-forum-admin

# 复制前台构建文件
sudo cp -r secondlife-web/dist/* /var/www/second-hand-phone-forum/

# 复制后台构建文件
sudo cp -r secondlife-admin/dist/* /var/www/second-hand-phone-forum-admin/

# 设置权限
sudo chown -R www-data:www-data /var/www/second-hand-phone-forum
sudo chown -R www-data:www-data /var/www/second-hand-phone-forum-admin
sudo chmod -R 755 /var/www/second-hand-phone-forum
sudo chmod -R 755 /var/www/second-hand-phone-forum-admin
```

### 3. Nginx配置

#### 前台系统配置
```nginx
# /etc/nginx/sites-available/second-hand-phone-forum
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    root /var/www/second-hand-phone-forum;
    index index.html;
```

#### 后台系统配置
```nginx
# /etc/nginx/sites-available/second-hand-phone-forum-admin
server {
    listen 80;
    server_name admin.your-domain.com;
    root /var/www/second-hand-phone-forum-admin;
    index index.html;
    
    # 后台系统路径重写
    location /admin {
        try_files $uri $uri/ /index.html;
    }
    
    # 其他配置与前台相同
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
    
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        add_header X-Content-Type-Options nosniff;
    }
    
    location ~* \.html$ {
        expires -1;
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
    
    error_page 404 /index.html;
}
```

    # 启用gzip压缩
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;

    # 静态资源缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        add_header X-Content-Type-Options nosniff;
    }

    # HTML文件不缓存
    location ~* \.html$ {
        expires -1;
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }

    # Vue Router历史模式支持
    location / {
        try_files $uri $uri/ /index.html;
    }

    # 安全头部
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;

    # 错误页面
    error_page 404 /index.html;
}
```

### 4. 启用站点
```bash
# 创建前台系统软链接
sudo ln -s /etc/nginx/sites-available/second-hand-phone-forum /etc/nginx/sites-enabled/

# 创建后台系统软链接
sudo ln -s /etc/nginx/sites-available/second-hand-phone-forum-admin /etc/nginx/sites-enabled/

# 测试配置
sudo nginx -t

# 重启Nginx
sudo systemctl restart nginx
```

### 5. HTTPS配置
```bash
# 安装Certbot
sudo apt install certbot python3-certbot-nginx

# 获取SSL证书
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# 自动续期
sudo crontab -e
# 添加以下行
0 12 * * * /usr/bin/certbot renew --quiet
```

## 📱 移动端部署

### 移动端部署特点
- **响应式设计**: 自动适配各种移动设备
- **PWA支持**: 可安装为原生应用
- **离线缓存**: 支持离线访问核心功能
- **性能优化**: 针对移动端网络和性能优化

### 1. 移动端构建配置
```javascript
// vue.config.js - 移动端优化配置
module.exports = {
  transpileDependencies: true,
  
  // 移动端优化
  configureWebpack: {
    optimization: {
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          // 移动端组件单独打包
          mobile: {
            name: 'mobile',
            test: /[\\/]components[\\/]Mobile/,
            chunks: 'all',
            priority: 10
          },
          // Vant组件库单独打包
          vant: {
            name: 'vant',
            test: /[\\/]node_modules[\\/]vant/,
            chunks: 'all',
            priority: 5
          }
        }
      }
    }
  },
  
  // PWA配置
  pwa: {
    name: '二手手机论坛',
    themeColor: '#1989fa',
    msTileColor: '#1989fa',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black-translucent',
    workboxPluginMode: 'GenerateSW',
    workboxOptions: {
      skipWaiting: true,
      clientsClaim: true,
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/api\./,
          handler: 'NetworkFirst',
          options: {
            networkTimeoutSeconds: 3,
            cacheName: 'api-cache',
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 60 * 60 * 24 // 24小时
            }
          }
        },
        {
          urlPattern: /\.(png|jpg|jpeg|gif|svg)$/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'image-cache',
            expiration: {
              maxEntries: 100,
              maxAgeSeconds: 60 * 60 * 24 * 7 // 7天
            }
          }
        }
      ]
    }
  }
}
```

### 2. 移动端Nginx配置
```nginx
# 移动端优化配置
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/second-hand-phone-forum;
    index index.html;

    # 移动端优化
    location / {
        try_files $uri $uri/ /index.html;
        
        # 移动端缓存策略
        add_header Cache-Control "public, max-age=3600";
    }

    # 静态资源优化
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        
        # 移动端图片优化
        location ~* \.(png|jpg|jpeg|gif)$ {
            add_header Vary "Accept-Encoding";
        }
    }

    # Service Worker缓存
    location /sw.js {
        add_header Cache-Control "no-cache, no-store, must-revalidate";
        add_header Pragma "no-cache";
        add_header Expires "0";
    }

    # 移动端安全头部
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    
    # 移动端性能优化
    add_header Accept-Ranges "bytes";
    add_header Vary "Accept-Encoding";
}
```

### 3. 移动端CDN配置
```javascript
// CDN配置示例
const cdnConfig = {
  // 图片CDN
  imageCDN: 'https://cdn.your-domain.com/images/',
  
  // 静态资源CDN
  staticCDN: 'https://cdn.your-domain.com/static/',
  
  // API CDN
  apiCDN: 'https://api.your-domain.com/'
}

// 移动端图片优化
const getOptimizedImageUrl = (url, width = 375) => {
  if (isMobile()) {
    return `${cdnConfig.imageCDN}${url}?w=${width}&q=80&format=webp`
  }
  return url
}
```

### 4. 移动端性能监控
```javascript
// 移动端性能监控
class MobilePerformanceMonitor {
  constructor() {
    this.metrics = {}
    this.init()
  }

  init() {
    // 页面加载性能
    window.addEventListener('load', () => {
      this.metrics.pageLoadTime = performance.now()
      this.metrics.networkType = this.getNetworkType()
      this.metrics.batteryLevel = this.getBatteryLevel()
      this.reportMetrics()
    })

    // 错误监控
    window.addEventListener('error', (event) => {
      this.reportError(event.error)
    })
  }

  getNetworkType() {
    if ('connection' in navigator) {
      return navigator.connection.effectiveType || 'unknown'
    }
    return 'unknown'
  }

  async getBatteryLevel() {
    if ('getBattery' in navigator) {
      try {
        const battery = await navigator.getBattery()
        return Math.round(battery.level * 100)
      } catch (error) {
        return null
      }
    }
    return null
  }

  reportMetrics() {
    // 上报性能指标到服务器
    fetch('/api/v1/mobile/performance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.metrics)
    })
  }

  reportError(error) {
    // 上报错误信息
    fetch('/api/v1/mobile/error', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        errorType: 'js',
        errorMessage: error.message,
        errorStack: error.stack,
        pageName: window.location.pathname,
        userAgent: navigator.userAgent,
        timestamp: Date.now()
      })
    })
  }
}

// 初始化移动端性能监控
if (isMobile()) {
  new MobilePerformanceMonitor()
}
```

### 5. 移动端测试部署
```bash
# 移动端构建
npm run frontend:build

# 移动端测试
npm run test:mobile

# 移动端部署脚本
cat > deploy-mobile.sh << 'EOF'
#!/bin/bash
set -e

echo "开始移动端部署..."

# 构建移动端优化版本
npm run frontend:build

# 压缩静态资源
gzip -9 -k dist/*.js
gzip -9 -k dist/*.css

# 上传到CDN
aws s3 sync dist/ s3://your-cdn-bucket/ --delete

# 清除CDN缓存
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"

echo "移动端部署完成！"
EOF

chmod +x deploy-mobile.sh
```

### 6. 移动端兼容性测试
```javascript
// 移动端兼容性测试脚本
const mobileTestConfig = {
  devices: [
    { name: 'iPhone 12', width: 390, height: 844 },
    { name: 'Samsung Galaxy S21', width: 360, height: 800 },
    { name: 'iPad Pro', width: 1024, height: 1366 }
  ],
  
  browsers: [
    'Safari',
    'Chrome',
    'Firefox',
    'Edge'
  ],
  
  features: [
    'touch',
    'geolocation',
    'camera',
    'push-notifications'
  ]
}

// 运行兼容性测试
function runMobileCompatibilityTests() {
  mobileTestConfig.devices.forEach(device => {
    console.log(`测试设备: ${device.name}`)
    // 模拟设备尺寸
    window.innerWidth = device.width
    window.innerHeight = device.height
    
    // 测试功能
    mobileTestConfig.features.forEach(feature => {
      testFeature(feature)
    })
  })
}
```

## 🐳 Docker部署

### 1. 创建Dockerfile
```dockerfile
# Dockerfile
FROM node:18-alpine as build-stage

# 设置工作目录
WORKDIR /app

# 复制package文件
COPY package*.json ./

# 安装依赖
RUN npm ci --only=production

# 复制源代码
COPY . .

# 构建应用
RUN npm run build

# 生产阶段
FROM nginx:alpine as production-stage

# 复制构建文件
COPY --from=build-stage /app/dist /usr/share/nginx/html

# 复制Nginx配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 暴露端口
EXPOSE 80

# 启动Nginx
CMD ["nginx", "-g", "daemon off;"]
```

### 2. 创建Nginx配置
```nginx
# nginx.conf
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    # 启用gzip压缩
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;

    # 静态资源缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Vue Router历史模式支持
    location / {
        try_files $uri $uri/ /index.html;
    }

    # 安全头部
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
}
```

### 3. 创建Docker Compose配置
```yaml
# docker-compose.yml
version: '3.8'

services:
  second-hand-phone-forum:
    build: .
    ports:
      - "80:80"
    restart: unless-stopped
    environment:
      - NODE_ENV=production
    volumes:
      - ./logs:/var/log/nginx
```

### 4. 构建和运行
```bash
# 构建镜像
docker-compose build

# 启动服务
docker-compose up -d

# 查看日志
docker-compose logs -f

# 停止服务
docker-compose down
```

## 🔄 CI/CD部署

### 1. GitHub Actions配置
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build application
      run: npm run build
    
    - name: Deploy to server
      uses: appleboy/ssh-action@v0.1.5
      with:
        host: ${{ secrets.HOST }}
        username: ${{ secrets.USERNAME }}
        key: ${{ secrets.KEY }}
        script: |
          cd /var/www/second-hand-phone-forum
          git pull origin main
          npm ci --only=production
          npm run build
          sudo systemctl reload nginx
```

### 2. 服务器配置
```bash
# 创建部署脚本
cat > deploy.sh << 'EOF'
#!/bin/bash
set -e

# 进入项目目录
cd /var/www/second-hand-phone-forum

# 拉取最新代码
git pull origin main

# 安装依赖
npm ci --only=production

# 构建应用
npm run build

# 重启Nginx
sudo systemctl reload nginx

echo "部署完成！"
EOF

# 设置执行权限
chmod +x deploy.sh
```

## ⚡ 性能优化

### 1. 构建优化
```javascript
// vue.config.js
module.exports = {
  transpileDependencies: true,
  
  // 生产环境配置
  configureWebpack: {
    optimization: {
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            name: 'chunk-vendors',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial'
          },
          common: {
            name: 'chunk-common',
            minChunks: 2,
            priority: 5,
            chunks: 'initial',
            reuseExistingChunk: true
          }
        }
      }
    }
  },
  
  // CSS提取
  css: {
    extract: true,
    sourceMap: false
  },
  
  // 生产环境不生成source map
  productionSourceMap: false
}
```

### 2. Nginx性能优化
```nginx
# nginx.conf
worker_processes auto;
worker_rlimit_nofile 65535;

events {
    worker_connections 65535;
    use epoll;
    multi_accept on;
}

http {
    # 基础配置
    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    types_hash_max_size 2048;
    
    # 文件缓存
    open_file_cache max=1000 inactive=20s;
    open_file_cache_valid 30s;
    open_file_cache_min_uses 2;
    open_file_cache_errors on;
    
    # Gzip压缩
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/json
        application/javascript
        application/xml+rss
        application/atom+xml
        image/svg+xml;
}
```

### 3. 缓存策略
```nginx
# 静态资源缓存
location ~* \.(js|css)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
    add_header Vary Accept-Encoding;
}

location ~* \.(png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

location ~* \.(woff|woff2|ttf|eot)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
    add_header Access-Control-Allow-Origin *;
}
```

## 📊 监控和维护

### 1. 日志监控
```bash
# 查看Nginx访问日志
sudo tail -f /var/log/nginx/access.log

# 查看Nginx错误日志
sudo tail -f /var/log/nginx/error.log

# 查看应用日志
sudo journalctl -u nginx -f
```

### 2. 性能监控
```bash
# 安装监控工具
sudo apt install htop iotop nethogs

# 监控系统资源
htop
iotop
nethogs
```

### 3. 备份策略
```bash
# 创建备份脚本
cat > backup.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="/backup/second-hand-phone-forum"
DATE=$(date +%Y%m%d_%H%M%S)

# 创建备份目录
mkdir -p $BACKUP_DIR

# 备份应用文件
tar -czf $BACKUP_DIR/app_$DATE.tar.gz /var/www/second-hand-phone-forum

# 备份Nginx配置
tar -czf $BACKUP_DIR/nginx_$DATE.tar.gz /etc/nginx

# 删除7天前的备份
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete

echo "备份完成: $DATE"
EOF

# 设置定时备份
sudo crontab -e
# 添加以下行（每天凌晨2点备份）
0 2 * * * /path/to/backup.sh
```

### 4. 健康检查
```bash
# 创建健康检查脚本
cat > health-check.sh << 'EOF'
#!/bin/bash
URL="http://localhost"
RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" $URL)

if [ $RESPONSE -eq 200 ]; then
    echo "应用运行正常"
    exit 0
else
    echo "应用异常，HTTP状态码: $RESPONSE"
    exit 1
fi
EOF

# 设置定时检查
sudo crontab -e
# 添加以下行（每5分钟检查一次）
*/5 * * * * /path/to/health-check.sh
```

## 🔧 故障排除

### 常见问题

#### 1. 端口被占用
```bash
# 查看端口占用
sudo netstat -tlnp | grep :80

# 杀死占用进程
sudo kill -9 <PID>
```

#### 2. 权限问题
```bash
# 修复文件权限
sudo chown -R www-data:www-data /var/www/second-hand-phone-forum
sudo chmod -R 755 /var/www/second-hand-phone-forum
```

#### 3. 内存不足
```bash
# 查看内存使用
free -h

# 清理缓存
sudo sync && echo 3 | sudo tee /proc/sys/vm/drop_caches
```

#### 4. 磁盘空间不足
```bash
# 查看磁盘使用
df -h

# 清理日志文件
sudo find /var/log -name "*.log" -mtime +7 -delete
```

## 📈 扩展部署

### 1. 负载均衡
```nginx
# 上游服务器配置
upstream backend {
    server 192.168.1.10:80 weight=1;
    server 192.168.1.11:80 weight=1;
    server 192.168.1.12:80 weight=1;
}

server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        proxy_pass http://backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

### 2. CDN配置
```javascript
// 在构建时配置CDN域名
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? 'https://cdn.your-domain.com/'
    : '/'
}
```

### 3. 多环境部署
```bash
# 创建环境配置文件
# .env.production
NODE_ENV=production
VUE_APP_API_URL=https://api.your-domain.com
VUE_APP_CDN_URL=https://cdn.your-domain.com

# .env.staging
NODE_ENV=staging
VUE_APP_API_URL=https://api-staging.your-domain.com
VUE_APP_CDN_URL=https://cdn-staging.your-domain.com
```

---

**部署指南** - 为二手手机论坛项目提供完整的部署解决方案 