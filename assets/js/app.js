/*
================================================================================
FILE: assets/js/app.js
================================================================================
DEVELOPER DOCUMENTATION:
LINES 1-30: App State and Configuration initialization. Defines articles source endpoint.
LINES 31-70: DOMContentLoaded Router. Checks current file path and triggers page-specific render.
LINES 71-120: Global Search System. Opens overlay, monitors typing, searches titles/tags/excerpts.
LINES 121-180: Home Page Renderer. Separates featured and latest lists, creates cards.
LINES 181-220: Category Page Filter. Filters the central registry based on current category.
LINES 221-340: Dynamic Article Page Renderer. Parses '?article=id', fetches detail JSON, updates progress.
LINES 341-390: Reading Progress and Scroll-Synchronized Table of Contents (TOC) highlighting.
LINES 391-440: Related Articles matching utility based on shared tags.
================================================================================
*/

// Application State Store
const AppState = {
    articles: [],
    registryUrl: './content/articles.json',
    detailPath: './content/articles/'
};

// Application Init Routing
document.addEventListener('DOMContentLoaded', async () => {
    // Fetch articles database catalog immediately
    await fetchArticlesRegistry();

    // Initialize global search controls
    initSearchSystem();

    // Page-specific routing based on current document path
    const path = window.location.pathname;
    const pageName = path.split('/').pop() || 'index.html';

    if (pageName === 'index.html' || pageName === '') {
        renderHomepage();
    } else if (pageName === 'article.html') {
        renderArticleReader();
    } else if (pageName === 'newsroom.html') {
        renderNewsroomPage();
    } else if ([
        'investments.html', 
        'investor-relations.html', 
        'product-launches.html', 
        'company-updates.html', 
        'partnerships.html', 
        'branches.html'
    ].includes(pageName)) {
        renderCategoryPage(pageName);
    }
});

/**
 * Loads the central article registry file content/articles.json.
 */
async function fetchArticlesRegistry() {
    try {
        const response = await fetch(AppState.registryUrl);
        if (!response.ok) throw new Error('Failed to load article registry.');
        AppState.articles = await response.json();
    } catch (error) {
        console.error('Aoura Insights Error fetching registry:', error);
        AppState.articles = [];
    }
}

/**
 * Configures the overlay search triggers, keyboard commands, and search results render.
 */
function initSearchSystem() {
    const searchTrigger = document.querySelector('.search-trigger');
    const searchOverlay = document.querySelector('.search-overlay');
    const searchClose = document.querySelector('.search-close');
    const searchInput = document.querySelector('.search-input');
    const searchResults = document.querySelector('.search-results');

    if (!searchOverlay) return;

    // Toggle Overlay on trigger click
    if (searchTrigger) {
        searchTrigger.addEventListener('click', () => {
            searchOverlay.classList.add('active');
            setTimeout(() => searchInput.focus(), 150); // Focus input
        });
    }

    // Close on close button click
    if (searchClose) {
        searchClose.addEventListener('click', () => {
            searchOverlay.classList.remove('active');
            searchInput.value = '';
            searchResults.innerHTML = '';
        });
    }

    // Close on Esc key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
            searchOverlay.classList.remove('active');
            searchInput.value = '';
            searchResults.innerHTML = '';
        }
    });

    // Keystroke monitor search
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            if (query.length < 2) {
                searchResults.innerHTML = '';
                return;
            }

            const matches = AppState.articles.filter(article => {
                return (
                    article.title.toLowerCase().includes(query) ||
                    article.subtitle.toLowerCase().includes(query) ||
                    article.category.toLowerCase().includes(query) ||
                    article.tags.some(tag => tag.toLowerCase().includes(query))
                );
            });

            renderSearchResults(matches);
        });
    }
}

/**
 * Creates search result list items in the overlay container.
 */
function renderSearchResults(matches) {
    const searchResults = document.querySelector('.search-results');
    if (!searchResults) return;

    if (matches.length === 0) {
        searchResults.innerHTML = `<p class="text-lead" style="text-align: center; margin-top: 2rem;">No insights matching query.</p>`;
        return;
    }

    searchResults.innerHTML = matches.map(match => `
        <div class="search-result-item">
            <span class="search-result-category">${match.category}</span>
            <h3 class="search-result-title">
                <a href="article.html?id=${match.id}">${match.title}</a>
            </h3>
            <p class="search-result-excerpt">${match.subtitle}</p>
        </div>
    `).join('');
}

/**
 * Renders home page components (Featured Story, Grid, Highlights).
 */
function renderHomepage() {
    const featuredGrid = document.querySelector('.featured-grid');
    const latestGrid = document.querySelector('.latest-grid');

    if (!AppState.articles.length) return;

    // Filter featured stories (where featured: true)
    const featured = AppState.articles.filter(a => a.featured);
    const regular = AppState.articles.filter(a => !a.featured);

    // Render Large Featured Card
    if (featuredGrid && featured.length > 0) {
        featuredGrid.innerHTML = `
            <div class="story-card large reveal-element">
                <div class="story-img-container">
                    <img class="story-img" src="${featured[0].coverImage}" alt="${featured[0].title}">
                </div>
                <div class="story-content">
                    <span class="story-category">${featured[0].category}</span>
                    <h2 class="story-title"><a href="article.html?id=${featured[0].id}">${featured[0].title}</a></h2>
                    <p class="story-desc">${featured[0].subtitle}</p>
                    <div class="story-footer">
                        <span class="story-date">${featured[0].date}</span>
                        <span class="story-readtime">${featured[0].readingTime}</span>
                    </div>
                </div>
            </div>
            <div class="featured-sub-column" style="display:flex; flex-direction:column; gap: var(--space-md);">
                ${featured.slice(1, 3).map(item => `
                    <div class="story-card reveal-element" style="flex: 1;">
                        <div class="story-content">
                            <span class="story-category">${item.category}</span>
                            <h3 class="story-title"><a href="article.html?id=${item.id}">${item.title}</a></h3>
                            <p class="story-desc">${item.subtitle}</p>
                            <div class="story-footer">
                                <span class="story-date">${item.date}</span>
                                <span class="story-readtime">${item.readingTime}</span>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    // Render Latest Updates Masonry Grid
    if (latestGrid) {
        latestGrid.innerHTML = regular.slice(0, 6).map(item => `
            <div class="story-card reveal-element">
                <div class="story-img-container">
                    <img class="story-img" src="${item.coverImage}" alt="${item.title}">
                </div>
                <div class="story-content">
                    <span class="story-category">${item.category}</span>
                    <h3 class="story-title"><a href="article.html?id=${item.id}">${item.title}</a></h3>
                    <p class="story-desc">${item.subtitle}</p>
                    <div class="story-footer">
                        <span class="story-date">${item.date}</span>
                        <span class="story-readtime">${item.readingTime}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Re-trigger reveal animation logic for dynamically inserted DOM elements
    if (window.initScrollAnimations) {
        window.initScrollAnimations();
    }
}

/**
 * Category-based portal layout engine.
 */
function renderCategoryPage(filename) {
    const categoryMapping = {
        'investments.html': 'Investments',
        'investor-relations.html': 'Investor Relations',
        'product-launches.html': 'Product Launches',
        'company-updates.html': 'Company Updates',
        'partnerships.html': 'Partnerships',
        'branches.html': 'Branches'
    };

    const targetCategory = categoryMapping[filename];
    const categoryGrid = document.querySelector('.category-grid');
    if (!categoryGrid || !targetCategory) return;

    const filtered = AppState.articles.filter(a => a.category === targetCategory);

    if (filtered.length === 0) {
        categoryGrid.innerHTML = `<div style="grid-column: span 3; text-align: center; padding: 4rem 0;"><p class="text-lead">No publications under ${targetCategory} yet.</p></div>`;
        return;
    }

    categoryGrid.innerHTML = filtered.map(item => `
        <div class="story-card reveal-element">
            <div class="story-img-container">
                <img class="story-img" src="${item.coverImage}" alt="${item.title}">
            </div>
            <div class="story-content">
                <span class="story-category">${item.category}</span>
                <h3 class="story-title"><a href="article.html?id=${item.id}">${item.title}</a></h3>
                <p class="story-desc">${item.subtitle}</p>
                <div class="story-footer">
                    <span class="story-date">${item.date}</span>
                    <span class="story-readtime">${item.readingTime}</span>
                </div>
            </div>
        </div>
    `).join('');

    if (window.initScrollAnimations) window.initScrollAnimations();
}

/**
 * Chronological feed layout for all platform posts.
 */
function renderNewsroomPage() {
    const newsroomGrid = document.querySelector('.newsroom-grid');
    if (!newsroomGrid) return;

    const filtered = AppState.articles.filter(a => a.category === 'Newsroom');

    if (filtered.length === 0) {
        newsroomGrid.innerHTML = `<div style="grid-column: span 3; text-align: center; padding: 4rem 0;"><p class="text-lead">No newsroom releases published yet.</p></div>`;
        return;
    }

    newsroomGrid.innerHTML = filtered.map(item => `
        <div class="story-card reveal-element">
            <div class="story-img-container">
                <img class="story-img" src="${item.coverImage}" alt="${item.title}">
            </div>
            <div class="story-content">
                <span class="story-category">${item.category}</span>
                <h3 class="story-title"><a href="article.html?id=${item.id}">${item.title}</a></h3>
                <p class="story-desc">${item.subtitle}</p>
                <div class="story-footer">
                    <span class="story-date">${item.date}</span>
                    <span class="story-readtime">${item.readingTime}</span>
                </div>
            </div>
        </div>
    `).join('');

    if (window.initScrollAnimations) window.initScrollAnimations();
}

/**
 * Article Reader layout controller. Fetches the detailed article content JSON.
 */
async function renderArticleReader() {
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');

    if (!articleId) {
        window.location.href = 'index.html';
        return;
    }

    // Match metadata index to build details layout header
    const articleMeta = AppState.articles.find(a => a.id === articleId);
    if (!articleMeta) {
        window.location.href = 'index.html';
        return;
    }

    // Update Meta Title in browser
    document.title = `${articleMeta.title} - Aoura Insights`;
    
    // Dynamic SEO optimizations
    updateSEOHeaders(articleMeta);

    // Fetch Article Body payload
    try {
        const response = await fetch(`${AppState.detailPath}${articleId}.json`);
        if (!response.ok) throw new Error('Article payload not found.');
        const details = await response.json();

        // Render Page Layout
        const header = document.querySelector('.article-header');
        const centralBody = document.querySelector('.article-body-content');
        const media = document.querySelector('.article-featured-media');
        const tagsContainer = document.querySelector('.article-tags');

        // Render metadata headers
        if (header) {
            const isLaser = articleId === 'aoura-laser-protective-lens-launch';
            if (isLaser) {
                header.classList.add('laser-article-header');
            } else {
                header.classList.remove('laser-article-header');
            }
            header.innerHTML = `
                <div class="container">
                    <div class="reading-container">
                        <span class="article-category-label">${articleMeta.category}</span>
                        <h1 class="article-title ${isLaser ? 'laser-article-title' : ''}">${articleMeta.title}</h1>
                        <p class="article-subtitle">${articleMeta.subtitle}</p>
                        <div class="article-meta-group">
                            <div class="article-author-info">
                                <div class="article-author-avatar">${articleMeta.author.charAt(0)}</div>
                                <span class="article-author-name">${articleMeta.author}</span>
                            </div>
                            <span class="text-meta" style="margin-left:auto;">${articleMeta.date} &nbsp;•&nbsp; ${articleMeta.readingTime}</span>
                        </div>
                    </div>
                </div>
            `;
        }

        // Render cover image
        if (media && articleMeta.coverImage) {
            media.innerHTML = `<img src="${articleMeta.coverImage}" alt="${articleMeta.title}">`;
        }

        // Render rich content body from paragraphs array
        if (centralBody) {
            centralBody.innerHTML = details.content;
            buildTableOfContents();
        }

        // Render tags
        if (tagsContainer) {
            tagsContainer.innerHTML = articleMeta.tags.map(t => `<span class="article-tag">#${t}</span>`).join('');
        }

        // Initialize progress events
        initReadingProgressBar();

        // Render related articles
        renderRelatedStories(articleMeta);

        // Update social sharing link destinations
        initShareButtons(articleMeta);

    } catch (error) {
        console.error('Failed to load article detail views:', error);
        const centralBody = document.querySelector('.article-body-content');
        if (centralBody) {
            centralBody.innerHTML = `<p class="text-lead" style="color:red;">Error fetching insight body payload. Check file mapping.</p>`;
        }
    }
}

/**
 * Builds Table of Contents list items on the fly based on H2 headlines inside content.
 */
function buildTableOfContents() {
    const tocList = document.querySelector('.article-toc-list');
    const mobileTocList = document.getElementById('mobile-toc-list-ul');
    const bodyHeadings = document.querySelectorAll('.article-body-content h2');

    if (bodyHeadings.length === 0) {
        const leftSidebar = document.querySelector('.article-sidebar-left');
        if (leftSidebar) leftSidebar.style.display = 'none';
        const mobileToggle = document.getElementById('toc-mobile-btn');
        if (mobileToggle) mobileToggle.style.display = 'none';
        return;
    }

    // Assign anchor IDs to all headings
    bodyHeadings.forEach((heading, index) => {
        if (!heading.getAttribute('id')) {
            heading.setAttribute('id', `section-${index}`);
        }
    });

    if (tocList) {
        tocList.innerHTML = Array.from(bodyHeadings).map(heading => {
            const anchorId = heading.getAttribute('id');
            return `<li><a class="article-toc-link" href="#${anchorId}">${heading.textContent}</a></li>`;
        }).join('');
    }

    if (mobileTocList) {
        mobileTocList.innerHTML = Array.from(bodyHeadings).map(heading => {
            const anchorId = heading.getAttribute('id');
            return `<li><a href="#${anchorId}">${heading.textContent}</a></li>`;
        }).join('');
    }

    // Initialize Mobile TOC Interactions
    initMobileTocEvents();
}

/**
 * Scroll reading tracking and table of contents active-class tracking observer.
 */
function initReadingProgressBar() {
    const progressBar = document.querySelector('.progress-bar');
    const headings = document.querySelectorAll('.article-body-content h2');
    const tocLinks = document.querySelectorAll('.article-toc-link');

    if (!progressBar) return;

    window.addEventListener('scroll', () => {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (window.scrollY / docHeight) * 100;
        progressBar.style.width = `${scrollPercent}%`;

        // Synchronize table of contents link highlight class
        let activeId = '';
        headings.forEach(heading => {
            const top = heading.getBoundingClientRect().top;
            if (top < 150) { // Check offset from view header
                activeId = heading.getAttribute('id');
            }
        });

        tocLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${activeId}`) {
                link.classList.add('active');
            }
        });
    }, { passive: true });
}

/**
 * Pulls related articles sharing matching tags.
 */
function renderRelatedStories(currentMeta) {
    const relatedGrid = document.querySelector('.related-grid');
    if (!relatedGrid) return;

    // Filter registry matching same tags, excluding current article
    const matches = AppState.articles.filter(article => {
        return article.id !== currentMeta.id && 
               article.tags.some(tag => currentMeta.tags.includes(tag));
    });

    // Fallback if no matching tag tags are found
    const list = matches.length > 0 ? matches : AppState.articles.filter(a => a.id !== currentMeta.id);

    relatedGrid.innerHTML = list.slice(0, 3).map(item => `
        <div class="story-card">
            <div class="story-img-container">
                <img class="story-img" src="${item.coverImage}" alt="${item.title}">
            </div>
            <div class="story-content">
                <span class="story-category">${item.category}</span>
                <h3 class="story-title"><a href="article.html?id=${item.id}">${item.title}</a></h3>
                <div class="story-footer">
                    <span class="story-date">${item.date}</span>
                </div>
            </div>
        </div>
    `).join('');
}

/**
 * Configures share buttons link anchors.
 */
function initShareButtons(meta) {
    const shareTwitter = document.getElementById('share-twitter');
    const shareLinkedin = document.getElementById('share-linkedin');
    const shareCopy = document.getElementById('share-copy');

    const articleUrl = encodeURIComponent(window.location.href);
    const titleText = encodeURIComponent(meta.title);

    if (shareTwitter) {
        shareTwitter.addEventListener('click', () => {
            window.open(`https://twitter.com/intent/tweet?url=${articleUrl}&text=${titleText}`, '_blank');
        });
    }

    if (shareLinkedin) {
        shareLinkedin.addEventListener('click', () => {
            window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${articleUrl}`, '_blank');
        });
    }

    if (shareCopy) {
        shareCopy.addEventListener('click', () => {
            navigator.clipboard.writeText(window.location.href)
                .then(() => {
                    const originalText = shareCopy.innerHTML;
                    shareCopy.innerHTML = 'COPIED';
                    setTimeout(() => {
                        shareCopy.innerHTML = originalText;
                    }, 2000);
                });
        });
    }
}

/**
 * Initializes interactions and slide events for the mobile Table of Contents drawer.
 */
function initMobileTocEvents() {
    const mobileBtn = document.getElementById('toc-mobile-btn');
    const drawer = document.getElementById('mobile-toc-drawer');
    const closeBtn = document.getElementById('mobile-toc-close-btn');
    const overlay = document.getElementById('mobile-toc-overlay');
    const links = document.querySelectorAll('#mobile-toc-list-ul a');

    if (!mobileBtn || !drawer || !overlay) return;

    function openDrawer() {
        drawer.classList.add('active');
        overlay.classList.add('active');
        drawer.setAttribute('aria-hidden', 'false');
        overlay.setAttribute('aria-hidden', 'false');
    }

    function closeDrawer() {
        drawer.classList.remove('active');
        overlay.classList.remove('active');
        drawer.setAttribute('aria-hidden', 'true');
        overlay.setAttribute('aria-hidden', 'true');
    }

    mobileBtn.addEventListener('click', openDrawer);
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    overlay.addEventListener('click', closeDrawer);

    links.forEach(link => {
        link.addEventListener('click', () => {
            closeDrawer();
        });
    });
}

/**
 * Updates SEO meta tags dynamically for search engines and social platforms.
 */
function updateSEOHeaders(meta) {
    // Description meta
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.setAttribute('content', meta.subtitle);
    }

    // Open Graph tags
    updateMetaTag('property', 'og:title', meta.title);
    updateMetaTag('property', 'og:description', meta.subtitle);
    updateMetaTag('property', 'og:image', window.location.origin + '/' + meta.coverImage);
    updateMetaTag('property', 'og:url', window.location.href);

    // Twitter card tags
    updateMetaTag('name', 'twitter:title', meta.title);
    updateMetaTag('name', 'twitter:description', meta.subtitle);
    updateMetaTag('name', 'twitter:image', window.location.origin + '/' + meta.coverImage);
}

/**
 * Helper utility to create or update a specific meta tag.
 */
function updateMetaTag(attribute, value, content) {
    let tag = document.querySelector(`meta[${attribute}="${value}"]`);
    if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attribute, value);
        document.head.appendChild(tag);
    }
    tag.setAttribute('content', content);
}
