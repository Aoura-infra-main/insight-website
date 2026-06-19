/*
================================================================================
FILE: assets/js/app.js
================================================================================
Developer Notes:
- Dynamic article fetching from individual JSON files has been removed.
- Articles are pre-rendered as static HTML pages in `/articles/`.
- This script loads the articles metadata registry to power search, homepage grids, category listings, and related stories.
================================================================================
*/

const isArticlePage = window.location.pathname.includes('/articles/');
const pathPrefix = isArticlePage ? '../' : '';

// Application State Store
const AppState = {
    articles: [],
    registryUrl: `${pathPrefix}content/articles.json`
};

// Helper to resolve correct relative path to an article
function getArticleLink(id) {
    return isArticlePage ? `${id}.html` : `articles/${id}.html`;
}

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
    } else if (isArticlePage) {
        const articleId = pageName.replace('.html', '');
        const articleMeta = AppState.articles.find(a => a.id === articleId);
        if (articleMeta) {
            initMobileTocEvents();
            initReadingProgressBar();
            renderRelatedStories(articleMeta);
            initShareButtons(articleMeta);
        }
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
                <a href="${getArticleLink(match.id)}">${match.title}</a>
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
                    <h2 class="story-title"><a href="${getArticleLink(featured[0].id)}">${featured[0].title}</a></h2>
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
                            <h3 class="story-title"><a href="${getArticleLink(item.id)}">${item.title}</a></h3>
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
                    <h3 class="story-title"><a href="${getArticleLink(item.id)}">${item.title}</a></h3>
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
                <h3 class="story-title"><a href="${getArticleLink(item.id)}">${item.title}</a></h3>
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
                <h3 class="story-title"><a href="${getArticleLink(item.id)}">${item.title}</a></h3>
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
                <img class="story-img" src="${pathPrefix}${item.coverImage}" alt="${item.title}">
            </div>
            <div class="story-content">
                <span class="story-category">${item.category}</span>
                <h3 class="story-title"><a href="${getArticleLink(item.id)}">${item.title}</a></h3>
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
