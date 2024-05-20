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
// @author Luna
// ==/UserScript==

(function() {
  'use strict';
  var redirectUrl = 'https://x.com/x/migrate';

  function redirectXCom(url) {
    if (url.hostname === "x.com" || url.hostname.endsWith(".x.com")) {
      window.location.href = redirectUrl;
    }
  }

  function checkTwitterRedirect(url) {
    if (url.hostname === "twitter.com" && url.searchParams.get("mx") === "1") {
      console.log("Successfully redirected back to Twitter with mx=1");

    } else if (url.hostname === "twitter.com") {
      console.log("Redirected to Twitter but without mx=1, re-attempting redirect");
      // Attempt to redirect again if necessary
      window.location.href = redirectUrl;
    }
  }

  // Listen for page loads and redirects
  window.addEventListener('load', function() {
    var currentUrl = new URL(window.location.href);
    redirectXCom(currentUrl);
  });

  // Listen for URL changes (e.g. when the user navigates to a new page)
  window.addEventListener('popstate', function() {
    var currentUrl = new URL(window.location.href);
    redirectXCom(currentUrl);
  });

  // Listen for completed page loads (to check for Twitter redirects)
  window.addEventListener('load', function() {
    var currentUrl = new URL(window.location.href);
    checkTwitterRedirect(currentUrl);
  });
})();
