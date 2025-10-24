# 租赁管理系统使用说明

## 功能特性

- 用户登录/登出
- JWT token 认证
- 密码加密存储
- 响应式UI设计
- 登录状态管理
- 带菜单的仪表盘布局
- 自动登录失效检测
- 多页面导航系统

## 测试账号

系统预设了两个测试账号：

1. **管理员账号**
   - 用户名: `admin`
   - 密码: `password`

2. **普通用户账号**
   - 用户名: `user`
   - 密码: `password`

## 安装依赖

```bash
npm install
```

## 启动开发服务器

```bash
npm run dev
```

## 访问地址

- 首页: http://localhost:3000
- 登录页: http://localhost:3000/login

## 技术栈

- Nuxt 3
- Vue 3
- Tailwind CSS
- JWT (jsonwebtoken)
- bcryptjs (密码加密)

## 文件结构

```
app/
├── layouts/
│   └── default.vue        # 默认布局（带菜单）
├── pages/
│   ├── index.vue          # 仪表盘首页
│   ├── login.vue          # 登录页
│   ├── rentals.vue        # 租赁管理
│   ├── customers.vue      # 客户管理
│   ├── equipment.vue      # 设备管理
│   ├── reports.vue        # 报表统计
│   └── settings.vue       # 系统设置
├── middleware/
│   └── auth.ts            # 认证中间件
├── plugins/
│   └── auth.client.ts     # 认证插件
├── app.vue                # 主应用组件
server/
└── api/
    └── auth/
        ├── login.post.ts  # 登录接口
        ├── logout.post.ts # 登出接口
        └── verify.get.ts  # 验证接口
```

## API接口

### 登录接口
- **URL**: `/api/auth/login`
- **方法**: POST
- **参数**: 
  ```json
  {
    "username": "admin",
    "password": "password"
  }
  ```

### 登出接口
- **URL**: `/api/auth/logout`
- **方法**: POST

### 验证接口
- **URL**: `/api/auth/verify`
- **方法**: GET
- **头部**: `Authorization: Bearer <token>`

## 安全特性

- 密码使用bcrypt加密存储
- JWT token 24小时过期
- 登录状态本地存储
- 自动重定向未登录用户
- 定期token验证（每5分钟）
- 登录失效自动提示
- 路由级别的认证保护

## 新增功能

### 仪表盘布局
- 响应式侧边栏菜单
- 顶部导航栏
- 用户信息显示
- 快速登出功能

### 页面导航
- 仪表盘：系统概览和统计
- 租赁管理：租赁订单管理
- 客户管理：客户信息管理
- 设备管理：设备库存管理
- 报表统计：业务数据分析
- 系统设置：系统配置管理

### 登录失效检测
- 自动检测token有效性
- 定期验证登录状态
- 失效时自动提示用户
- 自动跳转到登录页
