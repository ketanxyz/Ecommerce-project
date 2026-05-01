import { Link, useNavigate, useSearchParams } from "react-router";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import "./Header.css";

const Header = ({ cart = [] }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const mobileSearchRef = useRef(null);
  const { user, logout } = useAuth();

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  const searchProducts = () => {
    if (!search.trim()) return;
    setShowMobileSearch(false);
    setShowMobileMenu(false);
    navigate(`/?search=${encodeURIComponent(search.trim())}`);
  };

  const handleKeyDown = (e) => { if (e.key === 'Enter') searchProducts(); };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    setShowMobileMenu(false);
    navigate('/login');
  };

  // Auto-focus mobile search input
  useEffect(() => {
    if (showMobileSearch && mobileSearchRef.current) {
      mobileSearchRef.current.focus();
    }
  }, [showMobileSearch]);

  // Close menus on route change
  useEffect(() => {
    setShowMobileMenu(false);
    setShowUserMenu(false);
  }, [navigate]);

  const handleTrackOrder = () => {
    setShowMobileMenu(false);
    if (!user) {
      navigate('/login?redirect=/orders');
    } else {
      navigate('/orders');
    }
  };

  return (
    <>
      <header className="header">
        {/* Logo */}
        <div className="header__left">
          <Link to="/" className="header__logo-link">
            <img className="header__logo" src="/images/logo-white.png" alt="SimpleCart" />
            <img className="header__logo-mobile" src="/images/mobile-logo-white.png" alt="SimpleCart" />
          </Link>
        </div>

        {/* Desktop search bar */}
        <div className="header__search">
          <input
            className="header__search-input"
            type="text"
            placeholder="Search for products, brands and more..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="header__search-btn" onClick={searchProducts} aria-label="Search">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2.5"/>
              <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Right actions */}
        <div className="header__right">
          {/* Mobile search toggle */}
          <button
            className="header__icon-btn header__mobile-search-btn"
            onClick={() => setShowMobileSearch(true)}
            aria-label="Open search"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2.5"/>
              <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </button>

          {/* Cart — always visible */}
          <Link className="header__cart-link" to="/checkout" aria-label={`Cart (${totalQuantity} items)`}>
            <div className="header__cart-icon-wrap">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M16 10a4 4 0 01-8 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {totalQuantity > 0 && (
                <span className="header__cart-badge">{totalQuantity > 99 ? '99+' : totalQuantity}</span>
              )}
            </div>
            <span className="header__nav-label">Cart</span>
          </Link>

          {/* Desktop: Orders + user OR sign-in */}
          <div className="header__desktop-nav">
            {user ? (
              <>
                <Link className="header__nav-link" to="/orders">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <rect x="9" y="3" width="6" height="4" rx="1" stroke="currentColor" strokeWidth="2"/>
                    <path d="M9 12h6M9 16h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <span className="header__nav-label">Orders</span>
                </Link>

                {/* User avatar dropdown */}
                <div className="header__user-wrap">
                  <button className="header__user-btn" onClick={() => setShowUserMenu(!showUserMenu)}>
                    <div className="header__avatar">{user.name.charAt(0).toUpperCase()}</div>
                    <span className="header__user-name">{user.name.split(' ')[0]}</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="header__chevron">
                      <polyline points="6 9 12 15 18 9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>

                  {showUserMenu && (
                    <>
                      <div className="header__backdrop" onClick={() => setShowUserMenu(false)} />
                      <div className="header__dropdown">
                        <div className="header__dropdown-user">
                          <div className="header__dropdown-avatar">{user.name.charAt(0).toUpperCase()}</div>
                          <div>
                            <div className="header__dropdown-name">{user.name}</div>
                            <div className="header__dropdown-email">{user.email}</div>
                          </div>
                        </div>
                        <div className="header__dropdown-divider" />
                        <Link className="header__dropdown-item" to="/profile" onClick={() => setShowUserMenu(false)}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/></svg>
                          My Profile
                        </Link>
                        <Link className="header__dropdown-item" to="/orders" onClick={() => setShowUserMenu(false)}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><rect x="9" y="3" width="6" height="4" rx="1" stroke="currentColor" strokeWidth="2"/></svg>
                          My Orders
                        </Link>
                        <div className="header__dropdown-divider" />
                        <button className="header__dropdown-item header__dropdown-logout" onClick={handleLogout}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><polyline points="16 17 21 12 16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><line x1="21" y1="12" x2="9" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                          Sign Out
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </>
            ) : (
              <Link className="header__signin-btn" to="/login">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/></svg>
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="header__icon-btn header__hamburger"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            aria-label="Menu"
          >
            {showMobileMenu ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                <line x1="3" y1="18" x2="21" y2="18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Search Overlay */}
      {showMobileSearch && (
        <div className="mobile-search-overlay">
          <div className="mobile-search-bar">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="mobile-search-icon">
              <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2.5"/>
              <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
            <input
              ref={mobileSearchRef}
              className="mobile-search-input"
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button className="mobile-search-close" onClick={() => setShowMobileSearch(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Mobile Menu Drawer */}
      {showMobileMenu && (
        <>
          <div className="mobile-menu-backdrop" onClick={() => setShowMobileMenu(false)} />
          <div className="mobile-menu">
            {user ? (
              <>
                <div className="mobile-menu__user">
                  <div className="mobile-menu__avatar">{user.name.charAt(0).toUpperCase()}</div>
                  <div>
                    <div className="mobile-menu__user-name">{user.name}</div>
                    <div className="mobile-menu__user-email">{user.email}</div>
                  </div>
                </div>
                <div className="mobile-menu__divider" />
                <Link className="mobile-menu__item" to="/profile" onClick={() => setShowMobileMenu(false)}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/></svg>
                  My Profile
                </Link>
                <Link className="mobile-menu__item" to="/orders" onClick={() => setShowMobileMenu(false)}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><rect x="9" y="3" width="6" height="4" rx="1" stroke="currentColor" strokeWidth="2"/></svg>
                  My Orders
                </Link>
                <button className="mobile-menu__item" onClick={handleTrackOrder}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/></svg>
                  Track Order
                </button>
                <div className="mobile-menu__divider" />
                <button className="mobile-menu__item mobile-menu__item--logout" onClick={handleLogout}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><polyline points="16 17 21 12 16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><line x1="21" y1="12" x2="9" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <div className="mobile-menu__guest">
                  <p>Sign in to access orders, tracking, and more</p>
                  <Link className="mobile-menu__signin" to="/login" onClick={() => setShowMobileMenu(false)}>Sign In</Link>
                  <Link className="mobile-menu__signup" to="/signup" onClick={() => setShowMobileMenu(false)}>Create Account</Link>
                </div>
                <div className="mobile-menu__divider" />
                <button className="mobile-menu__item" onClick={handleTrackOrder}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/></svg>
                  Track Order
                </button>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Header;
