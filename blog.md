# Aoura Insights - Blog Writing & HTML Style Guidelines

This document details the standards, code structure, and design rules required to publish new articles on **Aoura Insights**. Every new publication must adhere strictly to these rules to preserve the platform’s premium monochrome editorial style, maintain direct SEO indexing, and guarantee a responsive mobile layout.

---

## 1. Blog Design Standards

Aoura Insights features a minimal, high-contrast, black-and-white editorial aesthetic modeled after world-class corporate and financial publications.
- **Layout Max Width**:
  - The main container grid spans `1400px` (`.container`).
  - The reading width for the central article content is strictly capped at `760px` (`--article-width`) to maximize line-length reading comfort.
- **Color Palette**:
  - Primary Background: `#ffffff` (Strict White)
  - Secondary Background: `#fafafa` / `#f5f5f5` (Grayscale accents)
  - Text Primary: `#000000` (Strict Black)
  - Text Secondary: `#4a4a4a` / `#737373` (Deep Gray)
  - Borders: `#e5e5e5` (Light Gray)
- **Typography**:
  - Sans-Serif headings and body copy use **Inter**.
  - Small metadata, reading times, tags, and dates use **Geist Mono**.
- **Header & Footer**:
  - Do not hardcode footers or headers. Placeholders (`<div id="global-header"></div>` and `<div id="global-footer"></div>`) must be used, which are populated dynamically on page load via `assets/js/layout.js`.

---

## 2. HTML Structure

Every new article must be created as a standalone static HTML file inside the `/articles/` folder. The page must follow this layout structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[Article Title] - Aoura Insights</title>
    <meta name="description" content="[Compelling 150-160 character meta description.]">
    <link rel="icon" type="image/png" href="../assets/logo/favicon.png">
    <link rel="stylesheet" href="../assets/css/styles.css">
</head>
<body>
    <!-- Reading Progress Bar -->
    <div class="progress-container"><div class="progress-bar" id="progress-indicator"></div></div>
    
    <!-- Navbar Placeholder -->
    <div id="global-header"></div>

    <!-- Article Header -->
    <header class="article-header">
        <div class="container">
            <div class="reading-container">
                <span class="article-category-label">[Category Name]</span>
                <h1 class="article-title">[Pre-rendered Article Title]</h1>
                <p class="article-subtitle">[Sub-heading summary detailing the announcement]</p>
                <div class="article-meta-group">
                    <div class="article-author-info">
                        <div class="article-author-avatar">[Initials]</div>
                        <span class="article-author-name">[Author Name / Division]</span>
                    </div>
                    <span class="text-meta" style="margin-left:auto;">[Date] &nbsp;•&nbsp; [X MIN READ]</span>
                </div>
            </div>
        </div>
    </header>

    <!-- Reading Interface Grid -->
    <main class="article-layout" id="read-layout">
        <!-- Sidebar Navigation: Manual Table of Contents -->
        <aside class="article-sidebar-left" aria-label="Table of Contents">
            <h3 class="article-toc-title">Table of Contents</h3>
            <ul class="article-toc-list" id="toc-list">
                <!-- TOC anchors here -->
            </ul>
        </aside>

        <!-- Center Column: Core Content Reader -->
        <article class="article-body-wrapper">
            <div class="article-featured-media">
                <img src="../assets/images/[image-filename].png" alt="Featured Cover Image">
            </div>
            <div class="article-body-content">
                <!-- Content payload goes here -->
            </div>
            <div class="article-tags" id="read-tags">
                <!-- Tag blocks -->
            </div>
        </article>

        <!-- Right Sidebar: Share Buttons -->
        <aside class="article-sidebar-right" aria-label="Share Tools">
            <h3 class="share-title">Share Insight</h3>
            <div class="share-buttons">
                <button class="share-btn" id="share-twitter"><span>X / Twitter</span></button>
                <button class="share-btn" id="share-linkedin"><span>LinkedIn</span></button>
                <button class="share-btn" id="share-copy"><span>Copy Link</span></button>
            </div>
        </aside>
    </main>

    <!-- Mobile Drawer Table of Contents -->
    <button class="toc-mobile-toggle" id="toc-mobile-btn" aria-label="Toggle Table of Contents">
        <!-- SVG menu icon -->
    </button>
    <div class="mobile-toc-drawer" id="mobile-toc-drawer" aria-hidden="true">
        <div class="mobile-toc-drawer-header">
            <h3>Jump to Section</h3>
            <button class="mobile-toc-close" id="mobile-toc-close-btn">&times;</button>
        </div>
        <div class="mobile-toc-drawer-body">
            <ul class="mobile-toc-list" id="mobile-toc-list-ul">
                <!-- Mobile TOC anchors here -->
            </ul>
        </div>
    </div>
    <div class="mobile-toc-overlay" id="mobile-toc-overlay" aria-hidden="true"></div>

    <!-- Footer Placeholder -->
    <div id="global-footer"></div>

    <!-- Scripts (Relative paths) -->
    <script src="../assets/js/layout.js"></script>
    <script src="../assets/js/main.js"></script>
    <script src="../assets/js/app.js"></script>
</body>
</html>
```

---

## 3. Mobile Responsive Rules

Aoura Insights enforces strict boundaries to avoid layout overflow, double scrolls, or broken scaling on mobile screen widths (`320px`, `375px`, `412px`):
- **Grid Layout Override**: Under `768px`, the article grid `.article-layout` collapses to a clean single-column block layout (`display: block`).
- **Containers**: Article wrappers (`.article-body-wrapper`, `.article-body-content`) are set to `max-width: 100%` and `box-sizing: border-box`.
- **Text Safety**: All headers (`h2`, `h3`), lists, paragraphs, and blockquotes must wrap cleanly within the viewport.
- **Scroll Rules**:
  ```css
  .article-content img, .article-body-content img {
      max-width: 100% !important;
      height: auto !important;
  }
  ```
  No static width parameters should cause elements to stick out horizontally.

---

## 4. Image Guidelines

Images are critical visual highlights. Follow these guidelines:
- **Lazy Loading**: Always specify the `loading="lazy"` attribute on body images to optimize loading speeds.
- **No Fixed Width Attributes**: Never specify static inline widths (like `style="width: 600px"` or `width="600"`) as this prevents standard responsive CSS scaling.
- **Alt Text**: Every image tag must have descriptive `alt="..."` content for accessibility and SEO.
- **Border and Spacing**: Content images should be wrapped inside a container with class `.article-image-container` to maintain visual margins.
  ```html
  <div class="article-image-container">
      <img src="../assets/images/spec-detail.png" alt="Detailed specifications diagram" loading="lazy">
  </div>
  ```

---

## 5. Table of Contents (TOC) Rules

The Table of Contents must be hardcoded statically in both the left sidebar and mobile drawer lists:
- **Anchor IDs**: Assign lowercase, hyphenated `id="..."` attributes to H2 sections inside the body content.
  ```html
  <h2 id="key-features">Key Features</h2>
  ```
- **TOC Links**: Ensure TOC lists target those anchors exactly.
  - Sidebar: `<a class="article-toc-link" href="#key-features">Key Features</a>`
  - Mobile Drawer: `<a href="#key-features">Key Features</a>`
- **Dynamic Highlights**: While the structure is static, `app.js` runs scroll triggers to dynamically toggle the `.active` class on the current section link as the user scrolls.

---

## 6. Content Writing Style

Aoura Insights is formatted like an executive publication.
- **Tone**: Professional, authoritative, and informative.
- **Structure**:
  - Keep paragraphs short (3-4 sentences max).
  - Use `<h2>` for primary divisions and `<h3>` for nested subheadings.
  - Summarize key configurations using tables or bulleted lists.
- **Technical Specs**: Always wrap tables in a `<div class="table-wrapper">` block to guarantee responsive scrolling behavior on mobile phones.
  ```html
  <div class="table-wrapper">
      <table>...</table>
  </div>
  ```

---

## 7. Cross Referencing & Internal Linking

Ensure seamless navigation within the ecosystem:
- **Category Lists**: When pointing back to listings, use correct relative paths:
  - From Root: `newsroom.html` or `investments.html`
  - From nested articles: `../newsroom.html` or `../investments.html`
- **Related Articles**: Ensure related links point to existing static HTML article paths (e.g. `../articles/[slug].html` or `[slug].html` depending on source directory).
- **Link Audits**: Never use placeholder hashes (`#`) or reference deleted JSON layouts. All links must represent valid, live resources.

---

## 8. SEO Requirements

Every article must contain search engine metadata:
- **Title Tag**: Clear headline appended with `- Aoura Insights`. Must be under 60 characters.
- **Meta Description**: A punchy 150-160 character description summarizing the article.
- **Open Graph (OG) Tags**: Complete social metadata headers for platforms like LinkedIn:
  ```html
  <meta property="og:title" content="Article Title Headline - Aoura Insights">
  <meta property="og:description" content="Brief excerpt description here.">
  <meta property="og:image" content="../assets/images/cover.png">
  <meta property="og:type" content="article">
  ```

---

## 9. Reference Implementation

Refer to the primary launch article file for code conventions:
- [aoura-laser-protective-lens-launch.html](file:///Users/aravindsaj/Library/CloudStorage/GoogleDrive-ask5615@g.rit.edu/My%20Drive/DeskEssentials/Systems/Insight%20Website/articles/aoura-laser-protective-lens-launch.html)
  - Features the standard grid sidebar configuration.
  - Implements the `.table-wrapper` wrapper for specs data.
  - Displays relative routing prefixes for layout scripts (`../assets/js/*.js`).

---

## 10. Before Publishing Checklist

Before committing a new article, verify the following:

- [ ] **Desktop Check**:
  - Layout matches the premium monochrome grid.
  - Sidebar and sharing widgets are sticky.
  - Logo images in header and footer load correctly.
- [ ] **Mobile Check** (Viewports 320px, 375px, 412px):
  - No horizontal page scrolling is possible.
  - Images, headings, lists, and tables wrap cleanly.
  - Table of Contents drawer opens and anchors scroll to correct offset.
- [ ] **Code Validation**:
  - Pre-rendered meta elements (Title, Description, OG tags) are populated in the head.
  - Navbar and footer utilize placeholder divs (`global-header`, `global-footer`).
  - No fixed inline widths are specified on images or text blocks.
  - Links are verified and use correct relative prefix pathing (`../`).
