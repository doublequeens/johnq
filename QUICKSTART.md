# 🚀 Quick Start Guide - Minimalist Blog

## 📋 Prerequisites

1. **Node.js 20+** - [Download](https://nodejs.org/)
2. **Git** - [Download](https://git-scm.com/)
3. **GitHub Account** - [Sign up](https://github.com/signup)
4. **GitHub CLI** (optional) - [Install](https://cli.github.com/)

---

## 🔨 Design Features Implemented

### ✅ Alex MacCaw Style Elements

1. **极简主义**
   - 白底黑字
   - 充足留白
   - 无多余装饰

2. **字体系统**
   - 系统字体栈（SF Pro, Roboto, Helvetica）
   - 标题使用大字号（48px h1, 32px h2, 24px h3）
   - 行高 1.2-1.4

3. **间距系统**
   - 4px (2xs)
   - 8px (xs)
   - 16px (sm)
   - 24px (md)
   - 32px (lg)
   - 48px (xl)
   - 64px (2xl)
   - 96px (3xl)

4. **阅读进度条** ⭐
   - 粘性定位在顶部
   - 发光效果（RGBA 发光）
   - 渐变从黑色到透明
   - 宽度 2px

5. **卡片设计**
   - 白底 + 柔和边框
   - hover 时添加阴影和上移效果
   - 圆角 8px

6. **目录设计**
   - 左边框 2px（#e5e5e5）
   - 左内边距 24px
   - 小号大写标题
   - 悬停效果

---

## 📂 File Structure

```
minimal-blog/
├── .github/
│   └── workflows/
│       └── deploy.yml (GitHub Actions)
├── src/
│   ├── components/
│   │   ├── Header.astro (顶部导航：Home, Technical, Life, About)
│   │   ├── ProgressBar.astro (阅读进度条 - 发光效果)
│   │   ├── ArticleCard.astro (卡片组件)
│   │   ├── SearchBar.astro (底部搜索)
│   │   └── Footer.astro (底部版权）
│   ├── layouts/
│   │   └── MainLayout.astro (主布局）
│   ├── pages/
│   │   ├── index.astro (首页 - 卡片形式展示）
│   │   ├── technical/
│   │   │   └── index.astro (Technical 页）
│   │   ├── life/
│   │   │   └── index.astro (Life 页）
│   │   └── about.astro (About 页）
│   ├── styles/
│   │   └── global.css (全局样式）
│   └── content/
│       ├── technical/ (Technical 文章）
│       └── life/ (Life 文章）
├── public/
│   └── images/ (静态图片）
├── astro.config.mjs (Astro 配置）
├── tailwind.config.mjs (Tailwind 配置）
├── package.json (依赖管理）
├── .gitignore (Git 忽略文件）
└── README.md (项目说明）
```

---

## 🎨 Design Implementation Details

### 1. 阅读进度条（发光效果）

**位置**：文章页面顶部（sticky 定位）

**发光效果**：
```css
background: linear-gradient(
  90deg,
  rgba(0, 0, 128, 1) 0%,
  rgba(0, 0, 128, 0.7) 50%,
  rgba(0, 0, 128, 0.1) 100%
);

box-shadow: 0 0 8px rgba(0, 0, 128, 0.5),
            0 0 15px rgba(0, 0, 128, 0.3);
```

**JavaScript 更新**：
```javascript
const updateProgress = () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  progress = (scrollTop / docHeight) * 100;
};
```

### 2. 卡片设计

**悬停效果**：
```css
.card:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border-color: #d1d1d1;
  transform: translateY(-2px);
}
```

**过渡动画**：
```css
transition: all 0.3s ease;
```

---

## 📝 Creating New Posts

### 1. Technical Article

Create `src/content/technical/my-first-post.md`:

```markdown
---
title: Your Technical Post Title
excerpt: Brief description for the card display
date: 2024-03-02
readTime: 5 min read
---

## Main Section

Your content here...

## Subsection

More content...
```

### 2. Life Article

Create `src/content/life/my-life-post.md`:

```markdown
---
title: Your Life Post Title
excerpt: Personal story or reflection
date: 2024-03-02
readTime: 3 min read
---

Your life story content...
```

---

## 🚀 Deployment Steps

### 1. Initialize Git Repository

```bash
cd /Users/qinshujuan/.openclaw/workspace/minimal-blog
git init
git add .
git commit -m "Initial commit"
```

### 2. Create GitHub Repository

1. Go to [GitHub](https://github.com/new)
2. Create new repository named `minimal-blog`
3. Follow the instructions to push your local repository

### 3. Push to GitHub

```bash
# Add remote
git remote add origin https://github.com/yourusername/minimal-blog.git

# Push to main branch
git push -u origin main
```

### 4. Enable GitHub Pages

1. Go to repository Settings → Pages
2. Select source: `GitHub Actions`
3. Save

The `.github/workflows/deploy.yml` file will automatically build and deploy your blog!

---

## 🔧 Customization

### Change Site URL

Edit `astro.config.mjs`:

```javascript
export default defineConfig({
  site: 'https://yourusername.github.io/minimal-blog',
  base: '/minimal-blog',
});
```

### Add Your Own CSS

Edit `src/styles/global.css` and add your custom styles.

### Remove or Modify Components

Delete or modify any component in `src/components/` directory.

---

## 📊 Design Comparison

| Feature | Alex MacCaw | Your Implementation |
|---------|-------------|---------------------|
| 首页布局 | 列表形式 | 卡片形式 ✅ |
| 阅读进度条 | ✅ 发光效果 | ✅ 发光效果 |
| 导航菜单 | 不确定 | ✅ Home, Technical, Life, About |
| 搜索功能 | 不确定 | ✅ 底部（GitHub Search） |
| 字体 | 系统字体 | ✅ 系统字体 |
| 间距 | 极简留白 | ✅ 4px-96px 系统 |

---

## ✅ Ready to Deploy

All files have been created! Follow these steps to deploy:

1. **Install dependencies**: `npm install`
2. **Start dev server**: `npm run dev`
3. **Test locally**: Open `http://localhost:4321`
4. **Commit changes**: `git add . && git commit -m "Ready to deploy"`
5. **Push to GitHub**: `git push origin main`
6. **Wait for GitHub Actions**: Automatic deployment!
7. **Visit your blog**: `https://yourusername.github.io/minimal-blog`

---

## 🎨 Design Philosophy

This blog follows the principles of Alex MacCaw's design:

1. **Content First** - Typography and spacing prioritize content
2. **Minimalism** - Only essential elements, no decoration
3. **Clarity** - High contrast, readable fonts, clear hierarchy
4. **Whitespace** - Generous padding and margins create breathing room
5. **Performance** - Zero JavaScript by default, fast loading

---

**Happy Building! 🎉**
