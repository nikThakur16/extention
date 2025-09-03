// Content script for Futuristic Chrome Extension

// This script runs on web pages and can interact with the page content
// For now, it's minimal but you can expand it with more features

console.log('Futuristic Extension content script loaded');

// Listen for messages from the popup or background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getPageInfo') {
    // Return information about the current page
    sendResponse({
      title: document.title,
      url: window.location.href,
      domain: window.location.hostname
    });
  }
  
  if (request.action === 'highlightText') {
    // Example: Highlight text on the page
    const selection = window.getSelection();
    if (selection.toString()) {
      // You can implement text highlighting logic here
      console.log('Text selected:', selection.toString());
    }
  }
});

// Example: Add a subtle indicator that the extension is active
function addExtensionIndicator() {
  // Create a small floating indicator
  const indicator = document.createElement('div');
  indicator.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
    background: linear-gradient(45deg, #00d4ff, #ff6b6b);
    border-radius: 50%;
    z-index: 10000;
    opacity: 0.8;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    color: white;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  `;
  indicator.innerHTML = '⚡';
  indicator.title = 'Futuristic Extension Active';
  
  // Add hover effect
  indicator.addEventListener('mouseenter', () => {
    indicator.style.opacity = '1';
    indicator.style.transform = 'scale(1.1)';
  });
  
  indicator.addEventListener('mouseleave', () => {
    indicator.style.opacity = '0.8';
    indicator.style.transform = 'scale(1)';
  });
  
  // Click to open extension popup
  indicator.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'openPopup' });
  });
  
  document.body.appendChild(indicator);
}

// Only show indicator on certain pages (optional)
if (window.location.hostname !== 'chrome-extension://') {
  // Wait for page to load completely
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addExtensionIndicator);
  } else {
    addExtensionIndicator();
  }
}

// Example: Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
  // Ctrl+Shift+F to open extension (example)
  if (e.ctrlKey && e.shiftKey && e.key === 'F') {
    e.preventDefault();
    chrome.runtime.sendMessage({ action: 'openPopup' });
  }
});

// Example: Track page interactions for analytics (optional)
let pageStartTime = Date.now();

window.addEventListener('beforeunload', () => {
  const timeSpent = Date.now() - pageStartTime;
  // You can send this data to your backend when you add one
  console.log(`Time spent on page: ${timeSpent}ms`);
});

// Example: Detect if user is logged in to show relevant features
chrome.storage.local.get(['isAuthenticated'], (result) => {
  if (result.isAuthenticated) {
    // User is logged in, you can add page-specific features here
    console.log('User is authenticated, showing enhanced features');
  }
});
