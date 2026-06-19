# Aoura Insights - Documentation

This document serves as the developer and publisher guide for the Aoura Insights platform.

---

## 1. Directory Structure

Aoura Insights is a zero-dependency static site built with HTML, CSS, and Vanilla JavaScript.

```
insight-website/
├── about.html
├── article.html (Legacy URL redirector)
├── articles/
│   └── aoura-laser-protective-lens-launch.html (Static articles)
├── assets/
│   ├── css/
│   │   └── styles.css
│   ├── images/
│   └── js/
│       ├── app.js
│       ├── layout.js
│       └── main.js
├── content/
│   └── articles.json (Central registry)
├── docs/
│   └── README.md (Developer & Deployment Guide)
├── index.html
└── documentation.md
```

---

## 2. Static HTML Article Architecture

Articles are written and served as standalone static HTML files inside the `/articles/` directory.

### Key Benefits
- **SEO & Performance**: Search engine crawlers can index the pre-rendered HTML content immediately.
- **Responsive Media**: Images can be lazy-loaded using native browser attributes without layout shifts.
- **Maintainability**: Directly edit semantic markup for headings, lists, tables, and paragraphs.

---

## 3. How to Publish a New Article

### Step 1: Update the Central Registry
Add a metadata entry for the new article inside `content/articles.json`. This registry is used by listing grids (Home, Newsroom, Categories) and the search overlay.

```json
[
  {
    "id": "new-article-slug",
    "category": "Product Launches",
    "title": "Article Title Headline",
    "subtitle": "Brief excerpt summarizing the announcement.",
    "author": "Author / Press Office",
    "date": "June 19, 2026",
    "readingTime": "3 MIN READ",
    "coverImage": "assets/images/cover.png",
    "tags": ["Tag1", "Tag2"],
    "featured": false
  }
]
```

### Step 2: Create the Static HTML File
Create a new HTML file under `/articles/` named matching the registry ID (e.g. `/articles/new-article-slug.html`).

Use the standard structure template below:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Article Title - Aoura Insights</title>
    <meta name="description" content="Brief excerpt summarizing the announcement.">
    <link rel="icon" type="image/png" href="../assets/logo/favicon.png">
    <link rel="stylesheet" href="../assets/css/styles.css">
</head>
<body>
    <div class="progress-container"><div class="progress-bar" id="progress-indicator"></div></div>
    <div id="global-header"></div>

    <header class="article-header">
        <div class="container">
            <div class="reading-container">
                <span class="article-category-label">Category Name</span>
                <h1 class="article-title">Article Title Headline</h1>
                <p class="article-subtitle">Brief excerpt summarizing the announcement.</p>
                <div class="article-meta-group">
                    <div class="article-author-info">
                        <div class="article-author-avatar">A</div>
                        <span class="article-author-name">Author Name</span>
                    </div>
                    <span class="text-meta" style="margin-left:auto;">June 19, 2026 &nbsp;•&nbsp; 3 MIN READ</span>
                </div>
            </div>
        </div>
    </header>

    <main class="article-layout" id="read-layout">
        <aside class="article-sidebar-left" aria-label="Table of Contents">
            <h3 class="article-toc-title">Table of Contents</h3>
            <ul class="article-toc-list" id="toc-list"></ul>
        </aside>

        <article class="article-body-wrapper">
            <div class="article-featured-media">
                <img src="../assets/images/cover.png" alt="Cover Image">
            </div>
            <div class="article-body-content">
                <h2>Overview Section</h2>
                <p>Paragraph content here...</p>
            </div>
        </article>

        <aside class="article-sidebar-right" aria-label="Share Tools">
            <!-- Share buttons markup -->
        </aside>
    </main>

    <div id="global-footer"></div>
    <!-- Script References -->
    <script src="../assets/js/layout.js"></script>
    <script src="../assets/js/main.js"></script>
    <script src="../assets/js/app.js"></script>
</body>
</html>
```

---

## 4. How Articles Are Loaded

1. **Static Pages**: When a visitor navigates to `/articles/some-id.html`, the browser loads the static HTML.
2. **Client-side Enhancements**: `assets/js/app.js` runs automatically to:
   - Generate the **Table of Contents (TOC)** from `<h2>` tags.
   - Synchronize the scroll progress bar.
   - Fetch the registry and render related articles based on matching tags.
3. **Legacy Redirection**: Old links pointing to `article.html?id=some-id` are automatically redirected to `articles/some-id.html` via client-side redirection.

---

## 5. Responsive Layout & Media Safety Rules

To prevent horizontal scrolling and layout breakage on mobile viewports (320px to 412px):

1. **Images**: All content images must have `max-width: 100%`, `height: auto`, and include `loading="lazy"` to optimize bandwidth.
   ```html
   <img src="../assets/images/image.png" alt="Description" loading="lazy">
   ```
2. **Tables**: Wrap all tables in a `<div class="table-wrapper">` element. The CSS applies an `overflow-x: auto` style to make table scrolling responsive.
   ```html
   <div class="table-wrapper">
       <table>...</table>
   </div>
   ```

---

## 6. Deployment Process

Deploying changes is handled directly through **GitHub Pages**:
1. Commit changes to the `main` branch.
2. Push to the GitHub repository: `git push origin main`.
3. GitHub Pages rebuilds the static files automatically.
4. Custom domain is routed to `insight.aouragrp.com` via a CNAME configuration in the repository settings.
