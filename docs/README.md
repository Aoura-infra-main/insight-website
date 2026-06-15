# Aoura Insights - Developer & Deployment Guide

This guide provides instructions for deploying, maintaining, and updating the Aoura Insights platform.

---

## 1. GitHub Pages Deployment Guide

Aoura Insights is built using zero-dependency HTML, CSS, and Vanilla JavaScript, making it directly deployable to GitHub Pages.

### Setup and Enablement
1. **Initialize Git & Commit Files**:
   ```bash
   git init
   git add .
   git commit -m "Initialize Aoura Insights Production Build"
   ```
2. **Create a GitHub Repository**:
   - Create a repository on GitHub named `insight-website`.
   - Add the remote and push:
     ```bash
     git remote add origin https://github.com/aouragrp/insight-website.git
     git branch -M main
     git push -u origin main
     ```
3. **Configure GitHub Pages settings**:
   - Navigate to the repository settings tab on GitHub.
   - Scroll down to the **Pages** section on the left sidebar.
   - Under **Build and deployment**, set the source to **Deploy from a branch**.
   - Select the `main` branch and `/ (root)` folder, then click **Save**.
4. **Configure Custom Domain**:
   - Under the Custom Domain field, input `insight.aouragrp.com`.
   - Add a CNAME record in your domain provider’s DNS dashboard:
     - Type: `CNAME`
     - Host/Name: `insight`
     - Value/Target: `aouragrp.github.io` (replace with your GitHub organization/user page)
   - Ensure HTTPS is checked.

---

## 2. Git Publishing Workflow (Adding Articles)

Because this is a static site, adding a new article requires updating the central registry file and creating a corresponding article JSON file.

### Step 1: Update the Article Registry
Open [articles.json](file:///Users/aravindsaj/Library/CloudStorage/GoogleDrive-ask5615@g.rit.edu/My%20Drive/DeskEssentials/Systems/Antigravity/Insight%20Website/content/articles.json) and append a metadata object to the array:
```json
{
    "id": "expansion-into-germany",
    "category": "Company Updates",
    "title": "Aoura Group Opens Berlin Engineering Center",
    "subtitle": "Strengthening spatial systems development in Central Europe.",
    "author": "Human Resources Team",
    "date": "June 14, 2026",
    "readingTime": "3 MIN READ",
    "coverImage": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
    "tags": ["Europe", "Expansion", "Engineering"],
    "featured": false
}
```

### Step 2: Create the Detailed Content File
Create a corresponding JSON file inside [content/articles/](file:///Users/aravindsaj/Library/CloudStorage/GoogleDrive-ask5615@g.rit.edu/My%20Drive/DeskEssentials/Systems/Antigravity/Insight%20Website/content/articles/) named after the `id` field (e.g., `expansion-into-germany.json`):
```json
{
    "content": "<h2>Berlin Launch</h2><p>Aoura Group is excited to open its new engineering center in Berlin...</p>"
}
```

### Step 3: Push Changes
```bash
git add content/articles.json content/articles/expansion-into-germany.json
git commit -m "Publish Berlin expansion bulletin"
git push origin main
```
The website will update automatically on GitHub Pages within seconds.

---

## 3. Editing Categories
To add, rename, or edit a category:
1. **Modify Navigation Links**: Edit the header template inside [layout.js](file:///Users/aravindsaj/Library/CloudStorage/GoogleDrive-ask5615@g.rit.edu/My%20Drive/DeskEssentials/Systems/Insight%20Website/assets/js/layout.js) to update labels or add links.
2. **Update the JS Router**: In `assets/js/app.js` under the `renderCategoryPage()` function, update the mapping object to pair your filename with the exact category name in your JSON registry:
   ```javascript
   const categoryMapping = {
       'investments.html': 'Investments',
       'new-category-page.html': 'New Category Name'
   };
   ```

---

## 4. Changing Branding & Colors
All visual elements are configured using CSS Variables inside [styles.css](file:///Users/aravindsaj/Library/CloudStorage/GoogleDrive-ask5615@g.rit.edu/My%20Drive/DeskEssentials/Systems/Antigravity/Insight%20Website/assets/css/styles.css#L15-L50).
To alter styling:
- **Change Palette**: Update variables like `--color-black`, `--color-white`, `--color-gray-100` to adjust tones.
- **Change Typeface**: Replace the Google Fonts `@import` rule and update `--font-sans` or `--font-mono`.

---

## 5. Logo Replacement
To replace the brand logo:
1. Overwrite `/assets/logo/aoura-insights-logo.png` with a transparent PNG at approximately 80px height.
2. If using PNG instead of the responsive inline SVG wordmark in the navbar, edit all HTML files to replace:
   ```html
   <svg class="brand-img" ...>...</svg>
   ```
   with:
   ```html
   <img class="brand-img" src="assets/logo/aoura-insights-logo.png" alt="Aoura Insights Logo">
   ```

---

## 6. Creating Future Subsidiaries
To add a new subsidiary activity highlights list:
1. Open [index.html](file:///Users/aravindsaj/Library/CloudStorage/GoogleDrive-ask5615@g.rit.edu/My%20Drive/DeskEssentials/Systems/Antigravity/Insight%20Website/index.html) and locate the `#group-highlights` container.
2. Duplicate or append a `div` element under the operations/launches columns:
   ```html
   <div class="highlight-item reveal-element">
       <span class="highlight-item-meta">FUTURE SUBSIDIARY</span>
       <h4 class="highlight-item-title">Subsidiary Project Milestone</h4>
       <p class="highlight-item-desc">Brief statement outlining operations.</p>
   </div>
   ```
