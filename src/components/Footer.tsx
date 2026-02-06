import './Footer.css';

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-main">
          <div className="footer-brand">
            <div className="footer-logo">
              <svg viewBox="0 0 40 40" className="footer-logo-icon">
                <rect x="2" y="12" width="14" height="22" rx="2" fill="currentColor" opacity="0.8"/>
                <rect x="18" y="6" width="14" height="28" rx="2" fill="currentColor"/>
                <rect x="6" y="18" width="6" height="4" rx="1" fill="#1a1a2e"/>
                <rect x="6" y="26" width="6" height="4" rx="1" fill="#1a1a2e"/>
                <rect x="22" y="12" width="6" height="4" rx="1" fill="#1a1a2e"/>
                <rect x="22" y="20" width="6" height="4" rx="1" fill="#1a1a2e"/>
                <rect x="22" y="28" width="6" height="4" rx="1" fill="#1a1a2e"/>
              </svg>
              <div>
                <span className="footer-title">uOttawa Housing Billboard</span>
                <span className="footer-tagline">Find your home away from home</span>
              </div>
            </div>
            <p className="footer-description">
              The official off-campus housing resource for University of Ottawa students, 
              faculty, and staff. Find sublets, lease takeovers, and shared accommodations 
              in the Ottawa area.
            </p>
          </div>

          <div className="footer-links">
            <div className="footer-column">
              <h4>For Students</h4>
              <ul>
                <li><a href="#browse">Browse Listings</a></li>
                <li><a href="#post">Post a Sublet</a></li>
                <li><a href="#zones">Know the Zones</a></li>
                <li><a href="#tips">Housing Tips</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>For Landlords</h4>
              <ul>
                <li><a href="#register">Register</a></li>
                <li><a href="#post-ad">Post an Ad</a></li>
                <li><a href="#manage">Manage Listings</a></li>
                <li><a href="#guidelines">Guidelines</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Resources</h4>
              <ul>
                <li><a href="https://www.residence.uottawa.ca" target="_blank" rel="noopener noreferrer">On-Campus Housing</a></li>
                <li><a href="#faq">FAQ</a></li>
                <li><a href="#contact">Contact Support</a></li>
                <li><a href="#disclaimer">Disclaimer</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-legal">
            <p>© {new Date().getFullYear()} University of Ottawa. All rights reserved.</p>
            <div className="footer-legal-links">
              <a href="#privacy">Privacy Policy</a>
              <a href="#terms">Terms of Use</a>
              <a href="#accessibility">Accessibility</a>
            </div>
          </div>
          <div className="footer-language">
            <button className="lang-btn active">English</button>
            <button className="lang-btn">Français</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
