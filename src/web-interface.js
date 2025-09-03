import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './web-interface.css';

const WebInterface = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  useEffect(() => {
    // Check if user is already authenticated
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    chrome.storage.local.get(['user', 'isAuthenticated'], (result) => {
      if (result.isAuthenticated && result.user) {
        setIsAuthenticated(true);
      }
    });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Static authentication (you can replace this with backend later)
    if (formData.username === 'admin' && formData.password === 'password123') {
      const user = {
        name: formData.username,
        email: `${formData.username}@example.com`,
        id: Date.now()
      };
      
      chrome.storage.local.set({
        user: user,
        isAuthenticated: true
      }, () => {
        setIsAuthenticated(true);
        setCurrentPage('home');
      });
    } else {
      alert('Invalid credentials! Use admin/password123');
    }
  };

  const handleLogout = () => {
    chrome.storage.local.remove(['user', 'isAuthenticated'], () => {
      setIsAuthenticated(false);
      setCurrentPage('home');
      setFormData({ username: '', password: '' });
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="web-interface">
        <div className="login-container">
          <div className="login-card">
            <div className="login-header">
              <div className="logo-large">
                <div className="logo-icon-large">⚡</div>
                <h1>Futuristic</h1>
              </div>
              <p className="login-subtitle">Welcome to the future of browser extensions</p>
            </div>
            
            <form onSubmit={handleLogin} className="login-form">
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Enter your username"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  required
                />
              </div>
              
              <button type="submit" className="login-submit-btn">
                <span className="icon">🚀</span>
                Launch into the Future
              </button>
            </form>
            
            <div className="login-footer">
              <p className="demo-credentials">
                <strong>Demo Credentials:</strong><br/>
                Username: <code>admin</code><br/>
                Password: <code>password123</code>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="web-interface">
      <nav className="navbar">
        <div className="nav-brand">
          <div className="logo-icon">⚡</div>
          <span>Futuristic</span>
        </div>
        
        <div className="nav-menu">
          <button 
            className={`nav-item ${currentPage === 'home' ? 'active' : ''}`}
            onClick={() => setCurrentPage('home')}
          >
            🏠 Home
          </button>
          <button 
            className={`nav-item ${currentPage === 'about' ? 'active' : ''}`}
            onClick={() => setCurrentPage('about')}
          >
            ℹ️ About
          </button>
          <button 
            className={`nav-item ${currentPage === 'tools' ? 'active' : ''}`}
            onClick={() => setCurrentPage('tools')}
          >
            🔧 Tools
          </button>
          <button 
            className={`nav-item ${currentPage === 'contact' ? 'active' : ''}`}
            onClick={() => setCurrentPage('contact')}
          >
            📞 Contact
          </button>
        </div>
        
        <button className="logout-btn-nav" onClick={handleLogout}>
          🚪 Logout
        </button>
      </nav>

      <main className="main-content">
        {currentPage === 'home' && (
          <div className="page-content">
            <div className="hero-section">
              <h1>Welcome to the Future</h1>
              <p>Experience the next generation of browser extensions with cutting-edge technology</p>
              <div className="hero-stats">
                <div className="stat">
                  <span className="stat-number">99.9%</span>
                  <span className="stat-label">Uptime</span>
                </div>
                <div className="stat">
                  <span className="stat-number">⚡</span>
                  <span className="stat-label">Lightning Fast</span>
                </div>
                <div className="stat">
                  <span className="stat-number">🔒</span>
                  <span className="stat-label">Secure</span>
                </div>
              </div>
            </div>
            
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">🚀</div>
                <h3>Performance</h3>
                <p>Optimized for speed and efficiency</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🎨</div>
                <h3>Design</h3>
                <p>Modern, futuristic interface</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🔧</div>
                <h3>Customizable</h3>
                <p>Tailor to your needs</p>
              </div>
            </div>
          </div>
        )}

        {currentPage === 'about' && (
          <div className="page-content">
            <h1>About Futuristic</h1>
            <p>We're building the future of browser extensions, one feature at a time.</p>
            
            <div className="about-content">
              <div className="about-section">
                <h3>Our Mission</h3>
                <p>To create browser extensions that are not just functional, but beautiful and intuitive.</p>
              </div>
              
              <div className="about-section">
                <h3>Technology</h3>
                <p>Built with React, modern CSS, and Chrome Extension APIs for the best performance.</p>
              </div>
              
              <div className="about-section">
                <h3>Future Plans</h3>
                <p>AI integration, advanced analytics, and more exciting features coming soon!</p>
              </div>
            </div>
          </div>
        )}

        {currentPage === 'tools' && (
          <div className="page-content">
            <h1>Tools & Utilities</h1>
            <p>Powerful tools to enhance your browsing experience</p>
            
            <div className="tools-grid">
              <div className="tool-card">
                <h3>🔍 Smart Search</h3>
                <p>Advanced search capabilities across your tabs</p>
                <button className="tool-btn">Enable</button>
              </div>
              
              <div className="tool-card">
                <h3>📊 Analytics</h3>
                <p>Track your browsing patterns and productivity</p>
                <button className="tool-btn">View</button>
              </div>
              
              <div className="tool-card">
                <h3>🎯 Focus Mode</h3>
                <p>Block distractions and stay focused</p>
                <button className="tool-btn">Activate</button>
              </div>
            </div>
          </div>
        )}

        {currentPage === 'contact' && (
          <div className="page-content">
            <h1>Get in Touch</h1>
            <p>We'd love to hear from you!</p>
            
            <div className="contact-form">
              <div className="form-group">
                <label htmlFor="contact-name">Name</label>
                <input type="text" id="contact-name" placeholder="Your name" />
              </div>
              
              <div className="form-group">
                <label htmlFor="contact-email">Email</label>
                <input type="email" id="contact-email" placeholder="your@email.com" />
              </div>
              
              <div className="form-group">
                <label htmlFor="contact-message">Message</label>
                <textarea id="contact-message" rows="4" placeholder="Your message"></textarea>
              </div>
              
              <button className="contact-submit-btn">
                📤 Send Message
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('web-interface-root'));
root.render(<WebInterface />);
