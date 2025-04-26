let enabled = true;
let pageBlockedCount = 0;

const AD_SELECTORS = [
  // Google specific
  "ins.adsbygoogle",
  'div[id^="google_ads_iframe_"]',
  'div[id^="div-gpt-ad-"]',

  // Common ad containers
  'div[class^="ad-container-"]',
  'div[class^="ad-wrapper-"]',
  'div[class^="ad-slot-"]',
  'div[id^="ad-slot-"]',

  // More specific targeting for ad divs
  'div[class="ad"][data-ad]',
  'div[class="ads"][data-adunit]',
  "div.advertisement:not(.content, .email, .message)",

  // Targeted sidebars and banners
  'div[class^="sidebar-ad-"]',
  'div[class^="banner-ad-"]',

  // Ad network iframes
  'iframe[src*="doubleclick.net"]',
  'iframe[src*="googleadservices.com"]',
  'iframe[src*="/ad."][src*=".ads."]',
  'iframe[id^="google_ads_iframe_"]',

  // Sponsored content with tighter targeting
  '[class^="sponsored-content-"]',
  '[id^="sponsor-content-"]',
  '[class^="ad-promotion-"]',
];

function checkEnabledState() {
  chrome.runtime.sendMessage({ action: "getState" }, (response) => {
    if (response) {
      enabled = response.enabled;
      if (enabled) {
        detectAndBlockAds();
      }
    }
  });
}

// Function to block ads using DOM selectors
function detectAndBlockAds() {
  if (!enabled) return;

  // Mutation observer to detect dynamically added ads
  const observer = new MutationObserver((mutations) => {
    if (!enabled) return;

    let needsCheck = false;

    mutations.forEach((mutation) => {
      if (mutation.addedNodes.length) {
        needsCheck = true;
      }
    });

    if (needsCheck) {
      checkForAds();
    }
  });

  // Start observing
  observer.observe(document.body, {
    childList: true, // Watches for direct child elements added/removed
    subtree: true, // Watches for changes throughout the entire DOM tree
  });

  checkForAds(); // Initial check
}

function checkForAds() {
  if (!enabled) return;

  AD_SELECTORS.forEach((selector) => {
    try {
      const adElements = document.querySelectorAll(selector);

      if (adElements.length > 0) {
        adElements.forEach((element) => {
          // Check if this element was already processed
          if (!element.dataset.adBlocked) {
            element.style.display = "none";
            element.dataset.adBlocked = "true";

            pageBlockedCount++;

            // Notify background script
            chrome.runtime.sendMessage({ action: "incrementCounter" });
          }
        });
      }
    } catch (e) {
      // Silently fail for invalid selectors
    }
  });
}

// Listen for messages from the popup or background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "updateState") {
    enabled = message.enabled;
    if (enabled) {
      detectAndBlockAds();
    }
  } else if (message.action === "getPageStats") {
    sendResponse({
      pageBlocked: pageBlockedCount,
    });
  } else if (message.action === "adBlocked") {
    // Network request was blocked, update page count
    pageBlockedCount++;
  }
});

checkEnabledState(); // Starts the ad blocking process when content script loads
