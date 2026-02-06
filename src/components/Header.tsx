import './Header.css';

interface HeaderProps {
  onPostAdClick: () => void;
}

export function Header({ onPostAdClick }: HeaderProps) {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-brand">
          <div className="logo">
            <svg viewBox="0 0 40 40" className="logo-icon">
              <rect x="2" y="12" width="14" height="22" rx="2" fill="currentColor" opacity="0.8"/>
              <rect x="18" y="6" width="14" height="28" rx="2" fill="currentColor"/>
              <rect x="6" y="18" width="6" height="4" rx="1" fill="white"/>
              <rect x="6" y="26" width="6" height="4" rx="1" fill="white"/>
              <rect x="22" y="12" width="6" height="4" rx="1" fill="white"/>
              <rect x="22" y="20" width="6" height="4" rx="1" fill="white"/>
              <rect x="22" y="28" width="6" height="4" rx="1" fill="white"/>
            </svg>
            <div className="logo-text">
              <span className="logo-title">uOttawa Housing</span>
              <span className="logo-subtitle">Off-Campus Billboard</span>
            </div>
          </div>
        </div>

        <nav className="header-nav">
          <a href="#browse" className="nav-link active">Browse Listings</a>
          <a href="#zones" className="nav-link">Know the Zones</a>
          <a href="#help" className="nav-link">Help</a>
        </nav>

        <div className="header-actions">
          <button className="btn btn-secondary">Sign In</button>
          <button className="btn btn-primary" onClick={onPostAdClick}>Post an Ad</button>
        </div>

        <button className="mobile-menu-btn" aria-label="Menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12h18M3 6h18M3 18h18"/>
          </svg>
        </button>
      </div>
    </header>
  );
}
