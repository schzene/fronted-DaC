# 文物识别系统 - 前端

基于 Next.js + React + TypeScript + Tailwind CSS 构建的唐代文物智能识别前端应用。

## 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **UI库**: React 18
- **样式**: Tailwind CSS
- **HTTP客户端**: Axios
- **文件上传**: React Dropzone
- **图标**: Lucide React

## 项目结构

```
frontend/
├── src/
│   ├── app/              # Next.js App Router 页面
│   │   ├── layout.tsx    # 根布局
│   │   ├── page.tsx      # 首页
│   │   ├── recognize/    # 识别页面
│   │   │   └── page.tsx
│   │   └── globals.css   # 全局样式
│   ├── lib/              # 工具库
│   │   └── api.ts        # API 服务层
│   └── types/            # TypeScript 类型定义
│       └── index.ts
├── public/               # 静态资源
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
└── next.config.js
```

## 功能特性

### 1. 首页 (/)
- 系统介绍和功能展示
- 文物类别浏览
- 使用指南

### 2. 识别页面 (/recognize)
- 拖拽上传图片
- 实时预览
- AI 智能识别
- 结果展示（精准匹配/相似推荐）

## 快速开始

### 1. 安装依赖

```bash
cd frontend
npm install
```

### 2. 配置环境变量

创建 `.env.local` 文件（已创建）：

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### 3. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000

### 4. 构建生产版本

```bash
npm run build
npm start
```

## API 接口

前端调用后端 API：

### 识别文物
- **接口**: `POST /api/v1/recognize`
- **参数**: 
  - `image`: 图片文件 (FormData)
  - `k`: 返回候选数量 (默认 3)
  - `threshold`: 精准匹配阈值 (默认 85)

### 获取文物类别
- **接口**: `GET /api/v1/categories`
- **返回**: 支持的文物大类列表

## 设计特点

### 1. 中国传统配色
- 金色 (Heritage Gold): #d4af37
- 青铜色 (Heritage Bronze): #cd7f32
- 玉色 (Heritage Jade): #00a86b
- 丝绸色 (Heritage Silk): #f0e68c

### 2. 响应式设计
- 支持桌面端和移动端
- 自适应布局

### 3. 用户体验
- 拖拽上传
- 实时预览
- 加载状态
- 错误提示

## 注意事项

1. **后端服务**: 确保后端 API 服务运行在 `http://localhost:5000`
2. **跨域配置**: 后端需要配置 CORS 允许前端域名访问
3. **图片格式**: 支持 JPG、PNG、GIF、BMP 格式
4. **文件大小**: 最大支持 10MB

## 开发建议

### 添加新页面
在 `src/app/` 目录下创建新文件夹和 `page.tsx` 文件

### 添加新组件
在 `src/components/` 目录下创建组件文件

### 修改样式
- 全局样式: `src/app/globals.css`
- Tailwind 配置: `tailwind.config.js`

### API 调用
在 `src/lib/api.ts` 中添加新的 API 方法

## 部署

### Vercel (推荐)
```bash
npm install -g vercel
vercel
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 许可证

MIT
