// Initialize default state when extension is installed
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({
    enabled: true,
    totalBlocked: 0,
  });
});

function updateRulesetState(enabled) {
  if (enabled) {
    chrome.declarativeNetRequest.updateEnabledRulesets({
      enableRulesetIds: ["ruleset_1"],
    });
  } else {
    chrome.declarativeNetRequest.updateEnabledRulesets({
      disableRulesetIds: ["ruleset_1"],
    });
  }
}

// Listen for messages from the popup or content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "toggleState") {
    updateRulesetState(message.enabled);
  } else if (message.action === "incrementCounter") {
    // Increment the total blocked count
    chrome.storage.local.get(["totalBlocked"], (result) => {
      const newTotal = (result.totalBlocked || 0) + 1;
      chrome.storage.local.set({
        totalBlocked: newTotal,
      });
    });
  } else if (message.action === "getState") {
    chrome.storage.local.get(["enabled"], (result) => {
      sendResponse({ enabled: result.enabled !== false });
    });
    return true; // Required for async response
  }
});

// Handle ad blocking with declarativeNetRequest API
chrome.declarativeNetRequest.onRuleMatchedDebug?.addListener((info) => {
  // A rule was matched, increment counters
  chrome.storage.local.get(["totalBlocked"], (result) => {
    const newTotal = (result.totalBlocked || 0) + 1;
    chrome.storage.local.set({
      totalBlocked: newTotal,
    });
  });

  // Notify the content script on the affected tab
  if (info.tabId > 0) {
    chrome.tabs.sendMessage(info.tabId, {
      action: "adBlocked",
      request: info.request,
    });
  }
});
