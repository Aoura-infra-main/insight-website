/**
 * Aoura Insights Layout Component Engine
 * This script serves as the single source of truth for the global Header and Footer templates.
 */

const LayoutComponents = {
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
    },

    getFooterHTML() {
        return `
        <footer class="footer" id="main-footer">
            <div class="container">
                <div class="footer-top">
                    <div>
                        <img class="brand-img" src="assets/logo/logo.jpg" alt="Aoura Group Logo" style="filter: invert(1); height: 57px; max-height: 57px; object-fit: contain;">
                        <p class="footer-brand-desc">Aoura Group builds distribution infrastructure, supply networks, and e-commerce solutions for businesses across the UAE.</p>
                    </div>
                    <div>
                        <h3 class="footer-col-title">Main Sections</h3>
                        <ul class="footer-links">
                            <li><a href="newsroom.html" class="footer-link">Newsroom</a></li>
                            <li><a href="investments.html" class="footer-link">Investments</a></li>
                            <li><a href="companies.html" class="footer-link">Companies</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 class="footer-col-title">Publications</h3>
                        <ul class="footer-links">
                            <li><a href="research.html" class="footer-link">Research Intel</a></li>
                            <li><a href="markets.html" class="footer-link">Markets Insights</a></li>
                            <li><a href="reports.html" class="footer-link">Corporate Reports</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 class="footer-col-title">Corporate Portal</h3>
                        <ul class="footer-links">
                            <li><a href="leadership.html" class="footer-link">Leadership Letter</a></li>
                            <li><a href="about.html" class="footer-link">About Publication</a></li>
                            <li><a href="https://aouragrp.com" target="_blank" rel="noopener" class="footer-link">Aoura Group &rarr;</a></li>
                        </ul>
                    </div>
                </div>
                <div class="footer-bottom">
                    <span class="footer-copy">&copy; 2026 Aoura Group. All rights reserved.</span>
                    <span class="footer-extra">DESIGNED &bull; TO &bull; INSPIRE</span>
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

// Execute immediately when the script runs to prevent layout shift before full DOM load
LayoutComponents.inject();
