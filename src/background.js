// Background service worker for Futuristic Chrome Extension

// Handle extension installation
chrome.runtime.onInstalled.addListener(() => {
  console.log('Futuristic Extension installed successfully!');
  
  // Set default storage values
  chrome.storage.local.set({
    isAuthenticated: false,
    user: null,
    settings: {
      theme: 'dark',
      notifications: true
    }
  });
});

// Handle messages from popup or content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'checkAuth') {
    chrome.storage.local.get(['isAuthenticated', 'user'], (result) => {
      sendResponse({
        isAuthenticated: result.isAuthenticated || false,
        user: result.user || null
      });
    });
    return true; // Keep message channel open for async response
  }
  
  if (request.action === 'login') {
    // Handle login logic here when you add backend
    chrome.storage.local.set({
      isAuthenticated: true,
      user: request.user
    }, () => {
      sendResponse({ success: true });
    });
    return true;
  }
  
  if (request.action === 'logout') {
    chrome.storage.local.remove(['isAuthenticated', 'user'], () => {
      sendResponse({ success: true });
    });
    return true;
  }
});

// Handle tab updates to inject content scripts if needed
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    // You can add logic here to inject content scripts on specific pages
    // For now, we'll just log the tab update
    console.log('Tab updated:', tab.url);
  }
});

// Handle extension icon click (optional - for future features)
chrome.action.onClicked.addListener((tab) => {
  // This will only trigger if no popup is defined
  // Since we have a popup, this won't be called
  console.log('Extension icon clicked on tab:', tab.id);
});
