/**
 * Aoura Insights Layout Component Engine
 * Inspired by the modern products.aouragrp.com floating glass design system.
 */

const LayoutComponents = {
    getHeaderHTML() {
        const isArticlePage = window.location.pathname.includes('/articles/');
        const pathPrefix = isArticlePage ? '../' : '';
        return `
        <div class="nav-wrap">
            <nav class="nav" id="main-nav" aria-label="Main Navigation">
                <div class="nav-inner">
                    <a href="${pathPrefix}index.html" class="nav-brand" aria-label="Aoura Insights Home">
                        <img class="brand-img" src="${pathPrefix}assets/logo/logo.jpg" alt="Aoura Insights Logo">
                    </a>
                    <div class="nav-links" id="navbar-menu">
                        <a href="${pathPrefix}index.html" class="nav-link">Home</a>
                        <a href="${pathPrefix}product-launches.html" class="nav-link">Product Launches</a>
                        <a href="${pathPrefix}newsroom.html" class="nav-link">Newsroom</a>
                        <a href="${pathPrefix}company-updates.html" class="nav-link">Company Updates</a>
                        <a href="${pathPrefix}about.html" class="nav-link">About</a>
                        <button class="search-trigger" id="open-search-btn" aria-label="Open Search">
                            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                        </button>
                    </div>
                    <button class="nav-hamburger" id="mobile-hamburger" aria-label="Toggle Mobile Menu" aria-expanded="false">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </nav>
        </div>
        <div class="mobile-drawer" id="mobileDrawer" role="navigation" aria-label="Mobile navigation">
            <a href="${pathPrefix}index.html" class="mobile-nav-link">Home</a>
            <a href="${pathPrefix}product-launches.html" class="mobile-nav-link">Product Launches</a>
            <a href="${pathPrefix}newsroom.html" class="mobile-nav-link">Newsroom &amp; Guides</a>
            <a href="${pathPrefix}company-updates.html" class="mobile-nav-link">Company Updates</a>
            <a href="${pathPrefix}about.html" class="mobile-nav-link">About Insights</a>
            <a href="https://store.aouragrp.com" target="_blank" rel="noopener" class="mob-shop">Order on Aoura Store &rarr;</a>
        </div>
        <div class="nav-spacer"></div>
        `;
    },

    getFooterHTML() {
        const isArticlePage = window.location.pathname.includes('/articles/');
        const pathPrefix = isArticlePage ? '../' : '';
        return `
        <footer class="footer" id="main-footer">
            <div class="container">
                <div class="footer-grid">
                    <div>
                        <a href="${pathPrefix}index.html" class="footer-brand" aria-label="Aoura Insights Home">
                            <img class="brand-img" src="${pathPrefix}assets/logo/logo.jpg" alt="Aoura Group Logo" style="filter: grayscale(100%); height: 38px; object-fit: contain; margin-bottom: 8px;">
                        </a>
                        <p class="footer-tagline">The official publication of Aoura Group. Business intelligence, distribution infrastructure, and marketplace research across the UAE.</p>
                    </div>
                    <div>
                        <p class="footer-col-title">Editorial Hubs</p>
                        <ul class="footer-col-links">
                            <li><a href="${pathPrefix}product-launches.html">Product Launches</a></li>
                            <li><a href="${pathPrefix}newsroom.html">Newsroom &amp; Guides</a></li>
                            <li><a href="${pathPrefix}company-updates.html">Company Updates</a></li>
                        </ul>
                    </div>
                    <div>
                        <p class="footer-col-title">Corporate Portal</p>
                        <ul class="footer-col-links">
                            <li><a href="${pathPrefix}about.html">About Insights</a></li>
                            <li><a href="https://aouragrp.com" target="_blank" rel="noopener">Aoura Group &rarr;</a></li>
                            <li><a href="https://store.aouragrp.com" target="_blank" rel="noopener">Aoura Store &rarr;</a></li>
                            <li><a href="https://products.aouragrp.com" target="_blank" rel="noopener">Aoura Products &rarr;</a></li>
                        </ul>
                    </div>
                    <div>
                        <p class="footer-col-title">Direct Inquiries</p>
                        <ul class="footer-col-links">
                            <li><a href="mailto:customer@aouragrp.com">customer@aouragrp.com</a></li>
                            <li><a href="https://aouragrp.com" target="_blank" rel="noopener">aouragrp.com</a></li>
                        </ul>
                    </div>
                </div>
                <div class="footer-bottom">
                    <span class="footer-copy">&copy; 2026 Aoura Group. All rights reserved.</span>
                    <span class="footer-copy">AOURA INSIGHTS &bull; DESIGNED TO INSPIRE</span>
                </div>
            </div>
        </footer>
        `;
    },

    inject() {
        const headerPlaceholder = document.getElementById('global-header');
        const footerPlaceholder = document.getElementById('global-footer');

        if (headerPlaceholder) {
            headerPlaceholder.outerHTML = this.getHeaderHTML();
        }
        if (footerPlaceholder) {
            footerPlaceholder.outerHTML = this.getFooterHTML();
        }
    }
};

// Execute immediately if DOM elements are present, or wait for DOMContentLoaded
if (document.getElementById('global-header') || document.getElementById('global-footer')) {
    LayoutComponents.inject();
} else {
    document.addEventListener('DOMContentLoaded', () => LayoutComponents.inject());
}
