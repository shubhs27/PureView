document.addEventListener("DOMContentLoaded", () => {
  const toggleSwitch = document.getElementById("adblock-toggle");
  const currentPageCount = document.getElementById("current-page-count");
  const totalCount = document.getElementById("total-count");

  // Load saved state and statistics from Chrome storage
  chrome.storage.local.get(["enabled", "totalBlocked"], (result) => {
    // Set toggle state
    if (result.enabled !== undefined) {
      toggleSwitch.checked = result.enabled;
    }

    // Set total statistics
    if (result.totalBlocked !== undefined) {
      totalCount.textContent = formatNumber(result.totalBlocked);
    }
  });

  // Get current tab to display page-specific statistics
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { action: "getPageStats" },
        (response) => {
          if (response && response.pageBlocked !== undefined) {
            currentPageCount.textContent = response.pageBlocked;
          }
        }
      );
    }
  });

  toggleSwitch.addEventListener("change", () => {
    const enabled = toggleSwitch.checked;

    chrome.storage.local.set({ enabled });

    // Notify background script
    chrome.runtime.sendMessage({ action: "toggleState", enabled });

    // Notify all content scripts
    chrome.tabs.query({}, (tabs) => {
      tabs.forEach((tab) => {
        chrome.tabs.sendMessage(tab.id, { action: "updateState", enabled });
      });
    });
  });

  function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
});
