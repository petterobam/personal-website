# 个人网站

AIGC 技术咨询专家的个人网站，基于 VuePress 2 构建。

## 项目简介

这是我的个人网站，用于展示我的技术能力、项目案例和方法论。网站基于 VuePress 2（Vue 3 + Vite）构建，部署在 GitHub Pages。

## 技术栈

- **框架**：VuePress 2（Vue 3 + Vite）
- **语言**：TypeScript
- **主题**：默认主题（自定义扩展）
- **部署**：GitHub Pages + GitHub Actions

## 快速开始

### 安装依赖

```bash
npm install
```

### 本地开发

```bash
npm run docs:dev
```

访问：http://localhost:8080

### 构建网站

```bash
npm run docs:build
```

构建后的文件在 `docs/.vuepress/dist/` 目录。

## 项目结构

```
personal-website/
├── docs/                  # 网站内容
│   ├── .vuepress/         # VuePress 配置
│   │   ├── config.ts     # 网站配置
│   │   └── public/       # 静态资源
│   ├── articles/         # 技术文章
│   ├── projects/          # 项目案例
│   ├── methodology/      # 方法论
│   ├── about.md          # 关于我
│   ├── services.md       # 服务介绍
│   ├── contact.md        # 联系方式
│   └── README.md         # 首页
├── package.json          # 项目配置
├── .gitignore            # Git 忽略文件
└── README.md             # 项目说明
```

## 部署到 GitHub Pages

### 1. 创建 GitHub 仓库

创建一个名为 `yourname.github.io` 的仓库（将 `yourname` 替换为你的 GitHub 用户名）。

### 2. 推送代码

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/yourname.github.io.git
git push -u origin main
```

### 3. 配置 GitHub Pages

1. 进入仓库的 Settings → Pages
2. Source 选择 "Deploy from a branch"
3. Branch 选择 "main" 和 "/docs/.vuepress/dist/"
4. 点击 Save

### 4. 配置 GitHub Actions（可选）

创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy VuePress site to Pages

on:
  push:
    branches: ["main"]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "22"

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run docs:build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./docs/.vuepress/dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

然后在 GitHub Pages 设置中，Source 选择 "GitHub Actions"。

## 自定义配置

### 修改网站基本信息

编辑 `docs/.vuepress/config.ts`：

```typescript
export default defineUserConfig({
  lang: 'zh-CN',
  title: 'AIGC 技术咨询专家',
  description: '帮助中小企业落地 AIGC，降低内容成本，提升效率',
  // ...
})
```

### 添加新页面

在 `docs/` 目录下创建新的 `.md` 文件：

```bash
touch docs/new-page.md
```

### 添加新文章

在 `docs/articles/` 目录下创建新的 `.md` 文件：

```bash
touch docs/articles/new-article.md
```

## 更多信息

- [VuePress 文档](https://vuepress.vuejs.org/zh/)
- [VuePress 2 文档](https://v2.vuepress.vuejs.org/zh/)
- [GitHub Pages 文档](https://docs.github.com/en/pages)

## 许可证

MIT
