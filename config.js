/**
 * Portfolio Configuration
 * ========================
 * Centralized configuration for contact details and site settings.
 * Contact information is obfuscated to prevent spam bot scraping.
 * 
 * @author Yanamalamanda Adithya
 * @version 1.0.0
 * @license MIT
 */

'use strict';

const CONFIG = {
    /**
     * Site metadata
     */
    site: {
        name: 'Adithya Portfolio',
        version: '1.0.0',
        author: 'Yanamalamanda Adithya',
        year: new Date().getFullYear()
    },

    /**
     * Contact details (obfuscated)
     * Email is split to prevent automated scraping
     */
    contact: {
        email: {
            user: 'adithyayanamalamanda',
            domain: 'gmail',
            tld: 'com'
        },
        social: {
            linkedin: {
                url: 'https://www.linkedin.com/in/yanamalamanda-adithya-9852a9366/',
                label: 'Connect with me'
            },
            github: {
                url: 'https://github.com/adithyayanamalamanda',
                label: 'View my repositories'
            }
        },
        location: 'India'
    },

    /**
     * Build complete email address
     * @returns {string} Full email address
     */
    getEmail() {
        const { user, domain, tld } = this.contact.email;
        return `${user}@${domain}.${tld}`;
    },

    /**
     * Build mailto link
     * @returns {string} Mailto URL
     */
    getMailtoLink() {
        return `mailto:${this.getEmail()}`;
    },

    /**
     * Initialize and inject contact details into DOM
     */
    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.injectContacts());
        } else {
            this.injectContacts();
        }
    },

    /**
     * Inject contact information into elements with data-contact attributes
     */
    injectContacts() {
        const email = this.getEmail();
        const { linkedin, github } = this.contact.social;

        // Email links
        document.querySelectorAll('[data-contact="email"]').forEach(el => {
            el.href = this.getMailtoLink();
            if (!el.querySelector('i')) {
                el.textContent = email;
            }
        });

        // LinkedIn links
        document.querySelectorAll('[data-contact="linkedin"]').forEach(el => {
            el.href = linkedin.url;
        });

        // GitHub links
        document.querySelectorAll('[data-contact="github"]').forEach(el => {
            el.href = github.url;
        });

        // Location
        document.querySelectorAll('[data-contact="location"]').forEach(el => {
            el.textContent = this.contact.location;
        });

        // Update copyright year
        document.querySelectorAll('[data-year]').forEach(el => {
            el.textContent = this.site.year;
        });

        console.log(`%c✅ ${this.site.name} v${this.site.version} loaded`,
            'color: #00d4ff; font-weight: bold;');
    }
};

// Auto-initialize
CONFIG.init();

// Export for ES modules (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
