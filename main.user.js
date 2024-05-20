// ==UserScript==
// @name         X To Twitter
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Return to your old wish Twitter
// @match        *://*.x.com/*
// @match        *://*.twitter.com/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/0lunac0/XToTwitter/main/main.user.js
// @downloadURL  https://raw.githubusercontent.com/0lunac0/XToTwitter/main/main.user.js
// @author Luna
// ==/UserScript==

(function() {
    'use strict';

    // Function to check if we are on x.com and redirect
    function redirectToMigrate() {
        if (window.location.hostname === 'x.com' || window.location.hostname.endsWith('.x.com')) {
            window.location.href = 'https://x.com/x/migrate';
        }
    }

    // Function to check if we are on twitter.com with ?mx=1
    function checkTwitterMx() {
        const urlParams = new URLSearchParams(window.location.search);
        if (window.location.hostname === 'twitter.com' && urlParams.get('mx') !== '1') {
            window.location.href = 'https://twitter.com/?mx=1';
        }
    }

    // Check if on x.com and redirect
    redirectToMigrate();

    // Check if on twitter.com with mx=1
    checkTwitterMx();

    // Observe URL changes
    const observer = new MutationObserver(() => {
        redirectToMigrate();
        checkTwitterMx();
    });
    observer.observe(document, { subtree: true, childList: true });

})();
