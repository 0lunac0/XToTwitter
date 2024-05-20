// ==UserScript==
// @name         X To Twitter
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Return to your old wish Twitter
// @match        *://*.x.com/*
// @match        *://*.twitter.com/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/0lunac0/XToTwitter/main/main.user.js
// @downloadURL  https://raw.githubusercontent.com/0lunac0/XToTwitter/main/main.user.js
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
            // Retry with mobile user agent
            console.log('Redirected to Twitter but without mx=1, re-attempting redirect with mobile user agent');
            const mobileUserAgent = 'Mozilla/5.0 (Linux; Android 10; Mobile) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Mobile Safari/537.36';
            const iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            iframe.src = 'https://x.com/x/migrate';
            iframe.onload = function() {
                window.location.href = 'https://twitter.com/?mx=1';
            };
            document.body.appendChild(iframe);
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
