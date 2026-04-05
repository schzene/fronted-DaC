# 🚀 Vercel 部署指南

## 📋 部署前准备

✅ 项目已配置完成，包含：
- Vercel 配置文件 (`vercel.json`)
- 模拟数据支持（后端未部署时可正常演示）
- 生产环境配置 (`.env.production`)

## 🎯 部署步骤

### 方法一：GitHub + Vercel 网站（推荐）

#### 第一步：创建 GitHub 仓库

1. 访问 [GitHub](https://github.com)
2. 点击 "New repository"
3. 仓库名称：`artifact-recognition-frontend`
4. 选择 "Public" 或 "Private"
5. 点击 "Create repository"

#### 第二步：上传代码到 GitHub

在本地打开 PowerShell，执行：

```powershell
# 进入前端目录
cd c:\Users\ipou\Desktop\大创\frontend

# 初始化 Git
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: 文物识别前端"

# 添加远程仓库（替换 YOUR_USERNAME）
git remote add origin https://github.com/YOUR_USERNAME/artifact-recognition-frontend.git

# 推送到 GitHub
git branch -M main
git push -u origin main
```

#### 第三步：在 Vercel 导入项目

1. 访问 [Vercel](https://vercel.com)
2. 使用 GitHub 账号登录
3. 点击 "Add New..." → "Project"
4. 选择你的 GitHub 仓库 `artifact-recognition-frontend`
5. Vercel 会自动检测 Next.js 框架
6. 点击 "Deploy"

#### 第四步：等待部署完成

- 部署时间：约 1-3 分钟
- 部署成功后会获得一个 `.vercel.app` 域名
- 例如：`https://artifact-recognition-frontend.vercel.app`

---

### 方法二：Vercel CLI（需要 Node.js）

如果已安装 Node.js，可以使用命令行：

```bash
# 安装 Vercel CLI
npm install -g vercel

# 登录
vercel login

# 部署
cd c:\Users\ipou\Desktop\大创\frontend
vercel
```

---

## ⚙️ 环境变量配置

### 在 Vercel 中设置环境变量

1. 进入项目设置 → "Environment Variables"
2. 添加变量：
   - **Name**: `NEXT_PUBLIC_API_URL`
   - **Value**: `你的后端API地址`（例如：`https://your-backend-api.com`）
   - **Environment**: Production, Preview, Development

### 当前配置

- **开发环境**: 使用模拟数据（无需后端）
- **生产环境**: 同样使用模拟数据（可随时切换到真实后端）

---

## 🎨 功能演示

部署成功后，你可以体验：

### 首页 (`/`)
- ✅ 系统介绍
- ✅ 文物类别展示
- ✅ 使用指南

### 识别页面 (`/recognize`)
- ✅ 拖拽上传图片
- ✅ 实时预览
- ✅ 模拟识别结果
- ✅ 文物信息展示

---

## 🔄 后续配置

### 连接真实后端

当后端部署完成后：

1. 在 Vercel 项目设置中修改环境变量：
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.com
   ```

2. 重新部署项目

### 自定义域名

1. 进入项目设置 → "Domains"
2. 添加你的自定义域名
3. 按照提示配置 DNS

---

## 📱 预览效果

部署完成后，你会得到：

- **桌面端**：完整的响应式布局
- **移动端**：自适应的移动体验
- **交互效果**：流畅的动画和过渡

---

## ❓ 常见问题

### Q: 部署失败怎么办？
A: 检查 `vercel.json` 配置和 `package.json` 依赖是否正确。

### Q: 页面加载慢？
A: Vercel 会自动优化，首次访问可能较慢，后续会使用 CDN 加速。

### Q: 如何查看部署日志？
A: 在 Vercel 项目页面点击 "Deployments" → 选择具体部署 → 查看日志。

---

## 🎉 完成！

按照以上步骤，你就可以在 Vercel 上看到完整的前端效果了！

**预计时间**：
- GitHub 上传：2-5 分钟
- Vercel 部署：1-3 分钟
- **总计**：约 5-10 分钟

如有问题，随时告诉我！
