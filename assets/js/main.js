/*
================================================================================
FILE: assets/js/main.js
================================================================================
DEVELOPER DOCUMENTATION:
LINES 1-15: Initialization on DOMContentLoaded.
LINES 16-35: Controls navbar scroll elevation by monitoring window scroll offset.
LINES 36-65: Implements the responsive hamburger menu toggle and mobile drawer.
LINES 66-95: Sets up the IntersectionObserver for scroll-triggered page fade-ins (.reveal-element).
LINES 96-120: Active navigation item highlighting based on the current window location.
================================================================================
*/

function initApp() {
    initNavbarScroll();
    initMobileMenu();
    initScrollAnimations();
    highlightActiveLink();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

/**
 * Monitors scroll offset to toggle elevation style on the floating navbar.
 */
function initNavbarScroll() {
    const nav = document.querySelector('.nav') || document.querySelector('.navbar');
    if (!nav) return;

    const handleScroll = () => {
        if (window.scrollY > 20) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
}

/**
 * Configures the mobile toggle icon click handler and floating drawer.
 */
function initMobileMenu() {
    const hamburger = document.getElementById('mobile-hamburger') || document.querySelector('.nav-hamburger') || document.querySelector('.menu-toggle');
    const drawer = document.getElementById('mobileDrawer') || document.querySelector('.mobile-drawer') || document.querySelector('.nav-menu');

    if (!hamburger || !drawer) return;

    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        hamburger.classList.toggle('open');
        hamburger.classList.toggle('active');
        drawer.classList.toggle('open');
        drawer.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', hamburger.classList.contains('open') ? 'true' : 'false');
    });

    // Close menu when clicking outside of the drawer & toggle
    document.addEventListener('click', (e) => {
        if (!drawer.contains(e.target) && !hamburger.contains(e.target)) {
            hamburger.classList.remove('open', 'active');
            drawer.classList.remove('open', 'active');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });

    // Close menu on click of nav items
    drawer.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open', 'active');
            drawer.classList.remove('open', 'active');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });
}

/**
 * Initializes IntersectionObserver to run smooth scroll reveals.
 */
function initScrollAnimations() {
    const revealElements = document.querySelectorAll('.reveal-element, .reveal');
    
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -40px 0px',
            threshold: 0.08
        };

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    obs.unobserve(entry.target);
                }
            });
        }, observerOptions);

        revealElements.forEach(el => observer.observe(el));
    } else {
        revealElements.forEach(el => el.classList.add('revealed'));
    }
}

/**
 * Iterates through navbar hyperlinks and marks current page matching URL active.
 */
function highlightActiveLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return;

        link.classList.remove('active');

        if (currentPath.endsWith(href) || 
           (currentPath.endsWith('/') && (href === 'index.html' || href.endsWith('index.html'))) ||
           (currentPath === '' && (href === 'index.html' || href.endsWith('index.html')))) {
            link.classList.add('active');
        }
    });
}
