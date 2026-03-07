# John Q's Blog - Astro + Tailwind CSS

A minimalist personal blog inspired by Alex MacCaw's design, built with Astro and Tailwind CSS.

## Features

✨ **Minimalist Design** - Clean, simple, focused on content  
🎨 **Alex MacCaw Style** - Large typography, generous whitespace  
📱 **Responsive** - Works on all devices  
🚀 **Fast** - Astro's zero JS by default  
🔍 **Search** - GitHub Pages search integration  
💫 **Dark/Light** - Clean contrast, easy on the eyes

## Pages

- **Home** - Card-style article listings by category (Technical/Life)
- **Technical** - Technical articles with reading progress bar
- **Life** - Personal reflections and life stories
- **About** - About page with simple bio

## Tech Stack

- **Astro** - Modern web framework
- **Tailwind CSS** - Utility-first CSS framework
- **GitHub Pages** - Free hosting
- **Preact** - Lightweight React alternative

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/minimal-blog.git
cd minimal-blog
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:4321` to see your blog.

### 4. Add Your Content

Create Markdown files in `src/content/technical/` or `src/content/life/`:

```markdown
---
title: Your Post Title
excerpt: Brief description of the post
date: 2024-03-02
readTime: 5 min read
---

Your content here...
```

### 5. Build for Production

```bash
npm run build
```

### 6. Deploy to GitHub Pages

The `.github/workflows/deploy.yml` file automatically deploys your blog when you push to the `main` branch.

## Customization

### Change the Site Name

Edit `astro.config.mjs`:

```javascript
site: 'https://yourusername.github.io/minimal-blog',
```

### Change the Color Scheme

Edit `src/styles/global.css`:

```css
:root {
  --color-primary: #000000;
  --color-bg: #ffffff;
}
```

### Add Google Analytics

Edit `src/layouts/MainLayout.astro` and add your tracking code.

## Project Structure

```
minimal-blog/
├── src/
│   ├── components/
│   │   ├── Header.astro
│   │   ├── ProgressBar.astro
│   │   ├── ArticleCard.astro
│   │   ├── SearchBar.astro
│   │   └── Footer.astro
│   ├── layouts/
│   │   └── MainLayout.astro
│   ├── pages/
│   │   ├── index.astro (Home)
│   │   ├── technical/
│   │   │   └── index.astro
│   │   ├── life/
│   │   │   └── index.astro
│   │   └── about.astro
│   ├── styles/
│   │   └── global.css
│   └── content/
│       ├── technical/
│       └── life/
├── public/
│   └── images/
├── astro.config.mjs
├── tailwind.config.mjs
├── package.json
└── README.md
```

## License

MIT
