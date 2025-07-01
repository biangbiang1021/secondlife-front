# 二手手机论坛 - API接口文档

## 📋 目录
- [接口概述](#接口概述)
- [通用规范](#通用规范)
- [用户相关接口](#用户相关接口)
- [论坛相关接口](#论坛相关接口)
- [市场相关接口](#市场相关接口)
- [移动端相关接口](#移动端相关接口)
- [错误码说明](#错误码说明)

## 🌐 接口概述

### 基础信息
- **接口域名**: `https://api.phoneforum.com`
- **协议**: HTTPS
- **数据格式**: JSON
- **字符编码**: UTF-8
- **当前状态**: 使用模拟数据，实际API待开发

### 当前实现状态
- ✅ **前台系统**: 使用Vuex store中的模拟数据
- ✅ **后台系统**: 使用Vuex store中的模拟数据
- ⏳ **真实API**: 待后端开发完成后集成
- ⏳ **数据持久化**: 当前使用localStorage存储用户状态

### 接口版本
- **当前版本**: v1.0
- **版本标识**: 在URL中使用 `/api/v1/` 前缀

## 📝 通用规范

### 请求格式
```javascript
// 请求头
{
  "Content-Type": "application/json",
  "Authorization": "Bearer <token>",  // 需要认证的接口
  "Accept": "application/json"
}

// 请求体 (POST/PUT)
{
  "key": "value"
}
```

### 响应格式
```javascript
// 成功响应
{
  "code": 200,
  "message": "success",
  "data": {
    // 具体数据
  },
  "timestamp": 1640995200000
}

// 错误响应
{
  "code": 400,
  "message": "参数错误",
  "error": "具体错误信息",
  "timestamp": 1640995200000
}
```

### 分页参数
```javascript
// 请求参数
{
  "page": 1,        // 页码，从1开始
  "pageSize": 10,   // 每页数量
  "sortBy": "createTime",  // 排序字段
  "sortOrder": "desc"      // 排序方向：asc/desc
}

// 响应数据
{
  "code": 200,
  "message": "success",
  "data": {
    "list": [],           // 数据列表
    "pagination": {
      "page": 1,          // 当前页码
      "pageSize": 10,     // 每页数量
      "total": 100,       // 总数量
      "totalPages": 10    // 总页数
    }
  }
}
```

## 👤 用户相关接口

### 1. 用户注册
```javascript
// 接口地址
POST /api/v1/user/register

// 请求参数
{
  "username": "string",     // 用户名，必填，3-20字符
  "email": "string",        // 邮箱，必填，有效邮箱格式
  "password": "string",     // 密码，必填，6-20字符
  "confirmPassword": "string" // 确认密码，必填
}

// 响应数据
{
  "code": 200,
  "message": "注册成功",
  "data": {
    "userId": "string",
    "username": "string",
    "email": "string",
    "token": "string",
    "expiresIn": 7200
  }
}
```

### 2. 用户登录
```javascript
// 接口地址
POST /api/v1/user/login

// 请求参数
{
  "username": "string",  // 用户名或邮箱
  "password": "string"   // 密码
}

// 响应数据
{
  "code": 200,
  "message": "登录成功",
  "data": {
    "userId": "string",
    "username": "string",
    "email": "string",
    "avatar": "string",
    "token": "string",
    "expiresIn": 7200
  }
}
```

### 3. 用户信息获取
```javascript
// 接口地址
GET /api/v1/user/profile

// 请求头
{
  "Authorization": "Bearer <token>"
}

// 响应数据
{
  "code": 200,
  "message": "success",
  "data": {
    "userId": "string",
    "username": "string",
    "email": "string",
    "avatar": "string",
    "createTime": "2025-07-01T00:00:00Z",
"lastLoginTime": "2025-07-01T00:00:00Z"
  }
}
```

### 4. 用户信息更新
```javascript
// 接口地址
PUT /api/v1/user/profile

// 请求参数
{
  "username": "string",  // 可选
  "email": "string",     // 可选
  "avatar": "string"     // 可选，头像URL
}

// 响应数据
{
  "code": 200,
  "message": "更新成功",
  "data": {
    "userId": "string",
    "username": "string",
    "email": "string",
    "avatar": "string"
  }
}
```

### 5. 用户退出登录
```javascript
// 接口地址
POST /api/v1/user/logout

// 请求头
{
  "Authorization": "Bearer <token>"
}

// 响应数据
{
  "code": 200,
  "message": "退出成功"
}
```

## 💬 论坛相关接口

### 1. 获取帖子列表
```javascript
// 接口地址
GET /api/v1/forum/posts

// 请求参数
{
  "page": 1,              // 页码
  "pageSize": 10,         // 每页数量
  "category": "string",   // 分类筛选，可选
  "keyword": "string",    // 关键词搜索，可选
  "sortBy": "createTime", // 排序字段
  "sortOrder": "desc"     // 排序方向
}

// 响应数据
{
  "code": 200,
  "message": "success",
  "data": {
    "list": [
      {
        "id": "string",
        "title": "string",
        "content": "string",
        "author": {
          "userId": "string",
          "username": "string",
          "avatar": "string"
        },
        "category": "string",
        "tags": ["string"],
        "views": 0,
        "replies": 0,
        "createTime": "2025-07-01T00:00:00Z",
        "updateTime": "2025-07-01T00:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "pageSize": 10,
      "total": 100,
      "totalPages": 10
    }
  }
}
```

### 2. 获取帖子详情
```javascript
// 接口地址
GET /api/v1/forum/posts/{postId}

// 响应数据
{
  "code": 200,
  "message": "success",
  "data": {
    "id": "string",
    "title": "string",
    "content": "string",
    "author": {
      "userId": "string",
      "username": "string",
      "avatar": "string"
    },
    "category": "string",
    "tags": ["string"],
    "views": 0,
    "replies": 0,
    "createTime": "2025-07-01T00:00:00Z",
    "updateTime": "2025-07-01T00:00:00Z",
    "comments": [
      {
        "id": "string",
        "content": "string",
        "author": {
          "userId": "string",
          "username": "string",
          "avatar": "string"
        },
        "createTime": "2025-07-01T00:00:00Z"
      }
    ]
  }
}
```

### 3. 发布帖子
```javascript
// 接口地址
POST /api/v1/forum/posts

// 请求参数
{
  "title": "string",      // 标题，必填，1-100字符
  "content": "string",    // 内容，必填，1-10000字符
  "category": "string",   // 分类，必填
  "tags": ["string"]      // 标签，可选
}

// 响应数据
{
  "code": 200,
  "message": "发布成功",
  "data": {
    "id": "string",
    "title": "string",
    "createTime": "2025-07-01T00:00:00Z"
  }
}
```

### 4. 更新帖子
```javascript
// 接口地址
PUT /api/v1/forum/posts/{postId}

// 请求参数
{
  "title": "string",      // 标题，可选
  "content": "string",    // 内容，可选
  "category": "string",   // 分类，可选
  "tags": ["string"]      // 标签，可选
}

// 响应数据
{
  "code": 200,
  "message": "更新成功",
  "data": {
    "id": "string",
    "updateTime": "2025-07-01T00:00:00Z"
  }
}
```

### 5. 删除帖子
```javascript
// 接口地址
DELETE /api/v1/forum/posts/{postId}

// 响应数据
{
  "code": 200,
  "message": "删除成功"
}
```

### 6. 获取分类列表
```javascript
// 接口地址
GET /api/v1/forum/categories

// 响应数据
{
  "code": 200,
  "message": "success",
  "data": [
    {
      "id": "string",
      "name": "string",
      "count": 0
    }
  ]
}
```

## 💰 市场相关接口

### 1. 获取商品列表
```javascript
// 接口地址
GET /api/v1/market/products

// 请求参数
{
  "page": 1,              // 页码
  "pageSize": 12,         // 每页数量
  "category": "string",   // 品牌分类，可选
  "priceMin": 0,          // 最低价格，可选
  "priceMax": 999999,     // 最高价格，可选
  "condition": "string",  // 成色，可选
  "location": "string",   // 地区，可选
  "keyword": "string",    // 关键词搜索，可选
  "sortBy": "createTime", // 排序字段
  "sortOrder": "desc"     // 排序方向
}

// 响应数据
{
  "code": 200,
  "message": "success",
  "data": {
    "list": [
      {
        "id": "string",
        "title": "string",
        "description": "string",
        "price": 0,
        "originalPrice": 0,
        "condition": "string",
        "images": ["string"],
        "seller": {
          "userId": "string",
          "username": "string",
          "avatar": "string"
        },
        "location": "string",
        "category": "string",
        "tags": ["string"],
        "createTime": "2025-07-01T00:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "pageSize": 12,
      "total": 100,
      "totalPages": 9
    }
  }
}
```

### 2. 获取商品详情
```javascript
// 接口地址
GET /api/v1/market/products/{productId}

// 响应数据
{
  "code": 200,
  "message": "success",
  "data": {
    "id": "string",
    "title": "string",
    "description": "string",
    "price": 0,
    "originalPrice": 0,
    "condition": "string",
    "images": ["string"],
    "seller": {
      "userId": "string",
      "username": "string",
      "avatar": "string",
      "phone": "string",
      "wechat": "string"
    },
    "location": "string",
    "category": "string",
    "tags": ["string"],
    "createTime": "2025-07-01T00:00:00Z",
    "views": 0
  }
}
```

### 3. 发布商品
```javascript
// 接口地址
POST /api/v1/market/products

// 请求参数
{
  "title": "string",       // 标题，必填，1-100字符
  "description": "string", // 描述，必填，1-2000字符
  "price": 0,             // 价格，必填，大于0
  "originalPrice": 0,     // 原价，必填，大于等于价格
  "condition": "string",  // 成色，必填
  "images": ["string"],   // 图片URL列表，必填，至少1张
  "location": "string",   // 地区，必填
  "category": "string",   // 品牌分类，必填
  "tags": ["string"]      // 标签，可选
}

// 响应数据
{
  "code": 200,
  "message": "发布成功",
  "data": {
    "id": "string",
    "title": "string",
    "createTime": "2025-07-01T00:00:00Z"
  }
}
```

### 4. 更新商品
```javascript
// 接口地址
PUT /api/v1/market/products/{productId}

// 请求参数
{
  "title": "string",       // 标题，可选
  "description": "string", // 描述，可选
  "price": 0,             // 价格，可选
  "originalPrice": 0,     // 原价，可选
  "condition": "string",  // 成色，可选
  "images": ["string"],   // 图片URL列表，可选
  "location": "string",   // 地区，可选
  "category": "string",   // 品牌分类，可选
  "tags": ["string"]      // 标签，可选
}

// 响应数据
{
  "code": 200,
  "message": "更新成功",
  "data": {
    "id": "string",
    "updateTime": "2025-07-01T00:00:00Z"
  }
}
```

### 5. 删除商品
```javascript
// 接口地址
DELETE /api/v1/market/products/{productId}

// 响应数据
{
  "code": 200,
  "message": "删除成功"
}
```

### 6. 获取品牌分类
```javascript
// 接口地址
GET /api/v1/market/categories

// 响应数据
{
  "code": 200,
  "message": "success",
  "data": [
    {
      "id": "string",
      "name": "string",
      "count": 0
    }
  ]
}
```

### 7. 图片上传
```javascript
// 接口地址
POST /api/v1/upload/image

// 请求参数 (multipart/form-data)
{
  "file": "File"  // 图片文件，支持jpg/png/gif，最大5MB
}

// 响应数据
{
  "code": 200,
  "message": "上传成功",
  "data": {
    "url": "string",      // 图片URL
    "filename": "string", // 文件名
    "size": 0            // 文件大小(字节)
  }
}
```

## 📱 移动端相关接口

### 1. 设备信息上报
```javascript
// 接口地址
POST /api/v1/device/info

// 请求参数
{
  "deviceType": "string",     // 设备类型：mobile/desktop/tablet
  "platform": "string",       // 平台：ios/android/web
  "userAgent": "string",      // 用户代理字符串
  "screenSize": "string",     // 屏幕尺寸：widthxheight
  "appVersion": "string",     // 应用版本
  "timestamp": 1640995200000  // 时间戳
}

// 响应数据
{
  "code": 200,
  "message": "success",
  "data": {
    "deviceId": "string",
    "config": {
      "enablePush": true,
      "enableLocation": false,
      "theme": "auto"
    }
  }
}
```

### 2. 移动端配置获取
```javascript
// 接口地址
GET /api/v1/mobile/config

// 响应数据
{
  "code": 200,
  "message": "success",
  "data": {
    "theme": "auto",           // 主题：light/dark/auto
    "fontSize": "medium",      // 字体大小：small/medium/large
    "enablePush": true,        // 推送通知
    "enableLocation": false,   // 位置服务
    "cacheStrategy": "smart",  // 缓存策略
    "imageQuality": "high"     // 图片质量
  }
}
```

### 3. 移动端配置更新
```javascript
// 接口地址
PUT /api/v1/mobile/config

// 请求参数
{
  "theme": "string",           // 主题设置
  "fontSize": "string",        // 字体大小
  "enablePush": true,          // 推送通知
  "enableLocation": false,     // 位置服务
  "cacheStrategy": "string",   // 缓存策略
  "imageQuality": "string"     // 图片质量
}

// 响应数据
{
  "code": 200,
  "message": "配置更新成功",
  "data": {
    "updateTime": "2025-07-01T00:00:00Z"
  }
}
```

### 4. 移动端性能监控
```javascript
// 接口地址
POST /api/v1/mobile/performance

// 请求参数
{
  "pageLoadTime": 0,          // 页面加载时间(ms)
  "apiResponseTime": 0,       // API响应时间(ms)
  "memoryUsage": 0,           // 内存使用量(MB)
  "batteryLevel": 0,          // 电池电量(%)
  "networkType": "string",    // 网络类型：wifi/4g/3g/2g
  "pageName": "string",       // 页面名称
  "timestamp": 1640995200000  // 时间戳
}

// 响应数据
{
  "code": 200,
  "message": "success"
}
```

### 5. 移动端错误上报
```javascript
// 接口地址
POST /api/v1/mobile/error

// 请求参数
{
  "errorType": "string",      // 错误类型：js/network/ui
  "errorMessage": "string",   // 错误信息
  "errorStack": "string",     // 错误堆栈
  "pageName": "string",       // 页面名称
  "userAgent": "string",      // 用户代理
  "timestamp": 1640995200000  // 时间戳
}

// 响应数据
{
  "code": 200,
  "message": "success"
}
```

### 6. 移动端推送通知
```javascript
// 接口地址
POST /api/v1/mobile/push/register

// 请求参数
{
  "deviceToken": "string",    // 设备推送token
  "platform": "string",       // 平台：ios/android
  "userId": "string"          // 用户ID
}

// 响应数据
{
  "code": 200,
  "message": "注册成功",
  "data": {
    "pushId": "string"
  }
}
```

### 7. 移动端离线缓存
```javascript
// 接口地址
GET /api/v1/mobile/cache/version

// 响应数据
{
  "code": 200,
  "message": "success",
  "data": {
    "version": "string",      // 缓存版本
    "lastUpdate": "2025-07-01T00:00:00Z",
    "resources": [
      {
        "url": "string",
        "hash": "string",
        "size": 0
      }
    ]
  }
}
```

## ❌ 错误码说明

### 通用错误码
| 错误码 | 说明 | 解决方案 |
|--------|------|----------|
| 200 | 成功 | - |
| 400 | 请求参数错误 | 检查请求参数格式和必填项 |
| 401 | 未授权 | 检查token是否有效 |
| 403 | 禁止访问 | 检查用户权限 |
| 404 | 资源不存在 | 检查请求的资源是否存在 |
| 500 | 服务器内部错误 | 联系技术支持 |

### 业务错误码
| 错误码 | 说明 | 解决方案 |
|--------|------|----------|
| 1001 | 用户名已存在 | 更换用户名 |
| 1002 | 邮箱已注册 | 更换邮箱或直接登录 |
| 1003 | 用户名或密码错误 | 检查登录信息 |
| 1004 | 验证码错误 | 重新获取验证码 |
| 2001 | 帖子不存在 | 检查帖子ID |
| 2002 | 无权限操作 | 检查是否为帖子作者 |
| 3001 | 商品不存在 | 检查商品ID |
| 3002 | 图片格式不支持 | 使用支持的图片格式 |
| 3003 | 图片大小超限 | 压缩图片或选择更小的图片 |

### 错误响应示例
```javascript
{
  "code": 400,
  "message": "请求参数错误",
  "error": "用户名不能为空",
  "timestamp": 1640995200000,
  "path": "/api/v1/user/register"
}
```

## 🔐 认证机制

### Token认证
```javascript
// 请求头格式
{
  "Authorization": "Bearer <token>"
}

// Token获取
// 通过登录接口获取token，有效期2小时

// Token刷新
// 当token即将过期时，调用刷新接口
POST /api/v1/user/refresh-token
```

### 权限控制
- **公开接口**: 无需认证
- **用户接口**: 需要登录认证
- **作者接口**: 需要是内容作者
- **管理员接口**: 需要管理员权限

## 📊 数据格式

### 时间格式
- **标准格式**: ISO 8601
- **示例**: `2025-07-01T00:00:00Z`
- **时区**: UTC

### 文件上传
- **支持格式**: jpg, jpeg, png, gif
- **最大大小**: 5MB
- **存储方式**: 云存储

### 分页参数
- **默认页码**: 1
- **默认页大小**: 10
- **最大页大小**: 100

---

**API接口文档** - 为二手手机论坛项目提供完整的接口规范 