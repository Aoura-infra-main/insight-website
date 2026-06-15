# Global Navigation & Header System

This document specifies the architecture, routing, and management rules for the primary navigation (header and mobile menus) and footer layouts across the Aoura Insights platform.

---

## 1. Top Task Bar (Global Header)

The top navigation header is dynamically injected into all pages via `assets/js/layout.js`. It consists of exactly 9 links followed by a search trigger:

1. **Home** &rarr; [index.html](file:///Users/aravindsaj/Library/CloudStorage/GoogleDrive-ask5615@g.rit.edu/My%20Drive/DeskEssentials/Systems/Insight%20Website/index.html)
2. **Investments** &rarr; [investments.html](file:///Users/aravindsaj/Library/CloudStorage/GoogleDrive-ask5615@g.rit.edu/My%20Drive/DeskEssentials/Systems/Insight%20Website/investments.html)
3. **Investor Relations** &rarr; [investor-relations.html](file:///Users/aravindsaj/Library/CloudStorage/GoogleDrive-ask5615@g.rit.edu/My%20Drive/DeskEssentials/Systems/Insight%20Website/investor-relations.html)
4. **Product Launches** &rarr; [product-launches.html](file:///Users/aravindsaj/Library/CloudStorage/GoogleDrive-ask5615@g.rit.edu/My%20Drive/DeskEssentials/Systems/Insight%20Website/product-launches.html)
5. **Company Updates** &rarr; [company-updates.html](file:///Users/aravindsaj/Library/CloudStorage/GoogleDrive-ask5615@g.rit.edu/My%20Drive/DeskEssentials/Systems/Insight%20Website/company-updates.html)
6. **Partnerships** &rarr; [partnerships.html](file:///Users/aravindsaj/Library/CloudStorage/GoogleDrive-ask5615@g.rit.edu/My%20Drive/DeskEssentials/Systems/Insight%20Website/partnerships.html)
7. **Branches** &rarr; [branches.html](file:///Users/aravindsaj/Library/CloudStorage/GoogleDrive-ask5615@g.rit.edu/My%20Drive/DeskEssentials/Systems/Insight%20Website/branches.html)
8. **Newsroom** &rarr; [newsroom.html](file:///Users/aravindsaj/Library/CloudStorage/GoogleDrive-ask5615@g.rit.edu/My%20Drive/DeskEssentials/Systems/Insight%20Website/newsroom.html)
9. **About** &rarr; [about.html](file:///Users/aravindsaj/Library/CloudStorage/GoogleDrive-ask5615@g.rit.edu/My%20Drive/DeskEssentials/Systems/Insight%20Website/about.html)

### Technical Implementation

The navbar is rendered dynamically by calling the `LayoutComponents.getHeaderHTML()` method within [layout.js](file:///Users/aravindsaj/Library/CloudStorage/GoogleDrive-ask5615@g.rit.edu/My%20Drive/DeskEssentials/Systems/Insight%20Website/assets/js/layout.js):

```javascript
getHeaderHTML() {
    return `
    <nav class="navbar" id="main-nav">
        <div class="container">
            <a href="index.html" class="brand" aria-label="Aoura Insights Home">
                <img class="brand-img" src="assets/logo/logo.jpg" alt="Aoura Insights Logo">
            </a>
            <ul class="nav-menu" id="navbar-menu">
                <li><a href="index.html" class="nav-link">Home</a></li>
                <li><a href="investments.html" class="nav-link">Investments</a></li>
                <li><a href="investor-relations.html" class="nav-link">Investor Relations</a></li>
                <li><a href="product-launches.html" class="nav-link">Product Launches</a></li>
                <li><a href="company-updates.html" class="nav-link">Company Updates</a></li>
                <li><a href="partnerships.html" class="nav-link">Partnerships</a></li>
                <li><a href="branches.html" class="nav-link">Branches</a></li>
                <li><a href="newsroom.html" class="nav-link">Newsroom</a></li>
                <li><a href="about.html" class="nav-link">About</a></li>
                <li>
                    <button class="search-trigger" id="open-search-btn" aria-label="Open Search">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                    </button>
                </li>
            </ul>
            <button class="menu-toggle" id="mobile-hamburger" aria-label="Toggle Mobile Menu">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
    </nav>
    `;
}
```

---

## 2. Global Footer Layout

The footer is broken down into four key pillars to align with brand hierarchy:

- **Pillar 1**: Brand Logo (inverted) & general group description.
- **Pillar 2 (Main Sections)**: Newsroom, Investments, Companies.
- **Pillar 3 (Publications)**: Research Intel, Markets Insights, Corporate Reports.
- **Pillar 4 (Corporate Portal)**: Leadership Letters, About Publication, external Group site link.

---

## 3. Maintenance Rules

- Do **NOT** modify navigation layouts directly inside individual HTML files. Always edit the `LayoutComponents` object in `assets/js/layout.js`.
- If new links must be added, ensure the container styles and hamburger layout support the updated width. The primary header menu is designed to handle up to 9 primary categories.
