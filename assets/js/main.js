/*
================================================================================
FILE: assets/js/main.js
================================================================================
DEVELOPER DOCUMENTATION:
LINES 1-15: Initialization on DOMContentLoaded.
LINES 16-35: Controls navbar scroll shrinking by monitoring window scroll offset.
LINES 36-55: Implements the responsive hamburger menu toggle for mobile viewports.
LINES 56-75: Sets up the IntersectionObserver for scroll-triggered page fade-ins (.reveal-element).
LINES 76-90: Active navigation item highlighting based on the current window location.
================================================================================
*/

document.addEventListener('DOMContentLoaded', () => {
    // Initialize UI utilities
    initNavbarScroll();
    initMobileMenu();
    initScrollAnimations();
    highlightActiveLink();
});

/**
 * Monitors scroll offset to toggle shrinking style on the sticky navbar.
 * Add/removes 'scrolled' class when window.scrollY passes 50px.
 */
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    // Trigger immediately in case of page reload on lower page segment
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
}

/**
 * Configures the mobile toggle icon click handler.
 * Toggles navigation overlay list and toggle menu classes on/off.
 */
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (!menuToggle || !navMenu) return;

    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking outside of the navigation container
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Close menu on click of nav items to ensure clean anchor routing
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

/**
 * Initializes IntersectionObserver to run premium scroll reveals.
 * Adds 'revealed' class once target element crosses viewport threshold.
 */
function initScrollAnimations() {
    const revealElements = document.querySelectorAll('.reveal-element');
    
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -50px 0px', // Trigger slightly before element is visible
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    // Stop tracking once element is revealed to optimize memory
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        revealElements.forEach(el => observer.observe(el));
    } else {
        // Fallback for older browsers
        revealElements.forEach(el => el.classList.add('revealed'));
    }
}

/**
 * Iterates through navbar hyperlinks and marks current page matching URL active.
 */
function highlightActiveLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        // Get the link destination file name (e.g. investments.html)
        const href = link.getAttribute('href');
        if (!href) return;

        // Reset active state
        link.classList.remove('active');

        // Check if path matches or falls back to home for index.html
        if (currentPath.endsWith(href) || 
           (currentPath.endsWith('/') && href === 'index.html') ||
           (currentPath === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}
