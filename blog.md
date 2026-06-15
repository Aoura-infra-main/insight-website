# How to Write Blogs for Aoura Insights

Aoura Insights utilizes a headless, client-side dynamic content delivery architecture. To publish a new article, you do not need to edit any HTML files directly. Instead, you register the article metadata in a central registry and create a JSON payload for the article body.

This guide outlines the system's folder structure, registry schema, content guidelines, and formatting best practices.

---

## 1. Directory Structure

Articles are separated into two parts: **metadata** and **body content**.
- **Metadata Registry**: `content/articles.json` (Stores search keywords, author details, categories, tags, and routes).
- **Body Content Payload**: `content/articles/{article-id}.json` (Stores the rich HTML payload for the article body).

---

## 2. Step-by-Step Writing Workflow

### Step A: Choose a Unique Article ID
Your article ID must be all-lowercase, using dashes to separate words. It will form the URL path:
`article.html?id=your-unique-article-id`

### Step B: Register the Metadata
Open `content/articles.json` and add a new JSON block to the array:

```json
  {
    "id": "your-unique-article-id",
    "category": "Product Launches", 
    "title": "A Compelling Headline",
    "subtitle": "A brief summary detailing the key announcement to engage readers.",
    "author": "Author Name / Press Office",
    "date": "Month Day, Year",
    "readingTime": "5 MIN READ",
    "coverImage": "assets/images/your-cover-image.png",
    "tags": ["Tag1", "Tag2", "Industrial Supply", "UAE"],
    "featured": false
  }
```

#### Valid Categories:
- `Investments` (renders on `investments.html`)
- `Investor Relations` (renders on `investor-relations.html`)
- `Product Launches` (renders on `product-launches.html`)
- `Company Updates` (renders on `company-updates.html`)
- `Partnerships` (renders on `partnerships.html`)
- `Branches` (renders on `branches.html`)
- `Newsroom` (renders on `newsroom.html`)

### Step C: Create the Content Payload
Create a new file at `content/articles/{your-unique-article-id}.json`. The file has a single key `"content"` containing clean, semantic HTML tags wrapped in a JSON string.

Example payload structure:
```json
{
  "content": "<h2>Overview</h2><p>Your paragraph text goes here...</p><h2>Key Features</h2><ul><li>Feature 1</li><li>Feature 2</li></ul>"
}
```

---

## 3. Formatting Content in JSON

Since the content is rendered inside a JSON string, ensure that:
1. **Quotes are Escaped**: All double quotes (`"`) inside HTML tags must be backslash-escaped (`\"`), e.g., `<a href=\"link\">` or `<img src=\"assets/images/img.png\" alt=\"label\">`.
2. **One Continuous Line**: Do not use raw newlines in the JSON string. Keep the HTML payload on a single line or escape your newlines with `\n` if necessary.

### Standard HTML Blocks to Use:

#### Headings (H2)
Always use `<h2>` for section titles. The system automatically scans for `<h2>` tags to build the **Table of Contents (TOC)** in the left sidebar.
```html
<h2>Section Title Here</h2>
```

#### Lists
Use unordered (`<ul>`) or ordered (`<ol>`) lists with standard list items (`<li>`):
```html
<ul>
  <li><strong>Highlight:</strong> Description here.</li>
</ul>
```

#### Tables
Use tables to display technical specifications or parameters. Apply standard styling from our stylesheet:
```html
<table style="width:100%; border-collapse: collapse; margin: 1.5rem 0; font-size: 0.95rem; border: 1px solid var(--border-color); text-align: left;">
  <thead style="background-color: var(--bg-secondary);">
    <tr>
      <th style="padding: 10px; border: 1px solid var(--border-color); font-weight: 700;">Parameter</th>
      <th style="padding: 10px; border: 1px solid var(--border-color); font-weight: 700;">Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="padding: 10px; border: 1px solid var(--border-color);">Name</td>
      <td style="padding: 10px; border: 1px solid var(--border-color);">Specification</td>
    </tr>
  </tbody>
</table>
```

#### Images
Wrap images in a container class (`article-image-container`) and style them using system variables:
```html
<div class="article-image-container">
  <img src="assets/images/filename.png" alt="Description" style="width:100%; max-width:600px; margin: 1.5rem auto; display:block; border: 1px solid var(--border-color);">
</div>
```

---

## 4. Typography & Design Token Best Practices

When adding styled text blocks or buttons in articles, utilize our existing **CSS design tokens** to keep layouts harmonious:

- **Typography**: Inter (Sans-serif) and Geist Mono (Monospace) are integrated globally.
- **Grayscale Colors**:
  - `var(--text-primary)` (Black)
  - `var(--text-secondary)` (Neutral Gray)
  - `var(--text-muted)` (Light Gray)
  - `var(--border-color)` (Soft Border)
- **Spacing Tokens**:
  - `var(--space-xs)` (8px)
  - `var(--space-sm)` (16px)
  - `var(--space-md)` (24px)
  - `var(--space-lg)` (40px)
  - `var(--space-xl)` (64px)
  - `var(--space-xxl)` (104px)

---

## 5. Connecting and Linking Blogs

To link one article to another or to product pages:
- **Related Articles**: The system matching engine dynamically inspects the `"tags"` array in `articles.json`. Articles that share at least one tag will appear in the "Related Insights" grid footer automatically.
- **Page Placement**: Categorize your registry block under the appropriate section to direct visitors. To link directly to another page, use a standard anchor:
  `<a href=\"product-launches.html\">Product Launches Portal</a>`
