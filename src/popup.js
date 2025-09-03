import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './popup.css';

const Popup = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check authentication status when popup opens
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    chrome.storage.local.get(['user', 'isAuthenticated'], (result) => {
      if (result.isAuthenticated && result.user) {
        setIsAuthenticated(true);
        setUser(result.user);
      }
    });
  };

  const handleLogin = () => {
    // Open web interface in new tab
    chrome.tabs.create({
      url: chrome.runtime.getURL('web-interface.html')
    });
  };

  const handleLogout = () => {
    chrome.storage.local.remove(['user', 'isAuthenticated'], () => {
      setIsAuthenticated(false);
      setUser(null);
    });
  };

  if (isAuthenticated) {
    return (
      <div className="popup-container">
        <div className="header">
          <div className="logo">
            <div className="logo-icon">⚡</div>
            <h2>Futuristic</h2>
          </div>
          <div className="user-info">
            <div className="avatar">{user?.name?.charAt(0) || 'U'}</div>
            <span className="username">{user?.name || 'User'}</span>
          </div>
        </div>
        
        <div className="content">
          <div className="welcome-message">
            <h3>Welcome back!</h3>
            <p>Ready to explore the future?</p>
          </div>
          
          <div className="quick-actions">
            <button className="action-btn primary">
              <span className="icon">🚀</span>
              Dashboard
            </button>
            <button className="action-btn secondary">
              <span className="icon">⚙️</span>
              Settings
            </button>
            <button className="action-btn secondary">
              <span className="icon">📊</span>
              Analytics
            </button>
          </div>
          
          <div className="navigation">
            <a href="#" className="nav-link">
              <span className="icon">🏠</span>
              Home
            </a>
            <a href="#" className="nav-link">
              <span className="icon">ℹ️</span>
              About
            </a>
            <a href="#" className="nav-link">
              <span className="icon">🔧</span>
              Tools
            </a>
            <a href="#" className="nav-link">
              <span className="icon">📞</span>
              Contact
            </a>
          </div>
        </div>
        
        <div className="footer">
          <button className="logout-btn" onClick={handleLogout}>
            <span className="icon">🚪</span>
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="popup-container">
      <div className="header">
        <div className="logo">
          <div className="logo-icon">⚡</div>
          <h2>Futuristic</h2>
        </div>
      </div>
      
      <div className="content">
        <div className="welcome-section">
          <div className="welcome-icon">🌟</div>
          <h3>Welcome to the Future</h3>
          <p>Experience the next generation of browser extensions</p>
        </div>
        
        <button className="login-btn" onClick={handleLogin}>
          <span className="icon">🔐</span>
          Login to Continue
        </button>
        
        <div className="features">
          <div className="feature">
            <span className="feature-icon">⚡</span>
            <span>Lightning Fast</span>
          </div>
          <div className="feature">
            <span className="feature-icon">🔒</span>
            <span>Secure</span>
          </div>
          <div className="feature">
            <span className="feature-icon">🎨</span>
            <span>Beautiful UI</span>
          </div>
        </div>
      </div>
      
      <div className="footer">
        <p className="version">v1.0.0</p>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('popup-root'));
root.render(<Popup />);
