import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './header.css'
import { useCart } from '../../contexts/CartContext'

const Header = ({ onSearchClick }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [dropdownTimer, setDropdownTimer] = useState(null);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartItemCount } = useCart();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const email = localStorage.getItem('user_email');
    if (token) {
      setIsLoggedIn(true);
      setUserEmail(email);
    } else {
      setIsLoggedIn(false);
      setUserEmail('');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_email');
    setIsLoggedIn(false);
    setUserEmail('');
    navigate('/login');
  };

  const handleMouseEnter = (dropdown) => {
    if (dropdownTimer) {
      clearTimeout(dropdownTimer);
    }
    setActiveDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    const timer = setTimeout(() => {
      setActiveDropdown(null);
    }, 100); // Giảm delay xuống 100ms
    setDropdownTimer(timer);
  };

  const handleDropdownClick = (index) => {
    if (window.innerWidth <= 768) {
      setActiveDropdown(activeDropdown === index ? null : index);
    }
  };

  const handleNavigation = (path) => {
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
    navigate(path);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const menuItems = [
    {
      title: 'Thể thao',
      path: '/collection',
      dropdownItems: [
        { title: 'Pickleball', path: 'collection/pickleball' },
        { title: 'Chạy bộ', path: 'collection/chay-bo' },
        { title: 'Tập luyện', path: 'collection/tap-luyen' },
        { title: 'Bóng rổ', path: 'collection/bong-ro' },
        { title: 'Cầu lông', path: 'collection/cau-long' },
        { title: 'Bóng đá', path: 'collection/bong-da' },
        { title: 'Golf', path: 'collection/golf' }
      ]
    },
    {
      title: 'Thời trang',
      path: '/collection',
      dropdownItems: [
        { title: 'WADE', path: '/collection/wade' },
        { title: 'BADFIVE', path: '/collection/badfive' },
        { title: 'LIFESTYLES', path: '/collection/lifestyles' },
        { title: 'ISAAC', path: '/collection/isaac' }
      ]
    },
    {
      title: 'Hệ thống cửa hàng',
      path: '/he-thong-cua-hang',
      dropdownItems: []
    },
    {
      title: 'Tin tức',
      path: '/blogs',
      dropdownItems: [
        { title: 'Tin sự kiện', path: '/blogs/tin-tuc-su-kien' },
        { title: 'Tin khuyến mãi', path: '/blogs/tin-khuyen-mai' }
      ]
    }
  ];

  return (
    <header id="header" className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">
            <img src="https://theme.hstatic.net/1000312752/1001368650/14/logo_compact.png?v=68" alt="logo_lining" className="logo-img" />
          </Link>
        </div>

        <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`navigation ${isMobileMenuOpen ? 'active' : ''}`}>
          <ul className="nav-list">
            {menuItems.map((item, index) => (
              <li key={index} className="nav-item">
                <div
                  className="dropdown"
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  {item.dropdownItems.length > 0 ? (
                    <div
                      className="nav-link"
                      onClick={() => handleDropdownClick(index)}
                      style={{ cursor: 'pointer' }}
                    >
                      {item.title}
                    </div>
                  ) : (
                    <Link to={item.path} className="nav-link" onClick={() => handleNavigation(item.path)}>
                      <div>{item.title}</div>
                    </Link>
                  )}
                  {item.dropdownItems.length > 0 && (
                    <div className={`dropdown-menu ${activeDropdown === index ? 'show' : ''}`}>
                      <ul className="dropdown-list">
                        {item.dropdownItems.map((dropdownItem, dropdownIndex) => (
                          <li key={dropdownIndex} className="dropdown-item">
                            <Link to={dropdownItem.path} className="nav-link" onClick={() => handleNavigation(dropdownItem.path)}>
                              {dropdownItem.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
          <div className="mobile-actions">
            <div className="action-item action-user" style={{ position: 'relative' }}
              onMouseEnter={() => handleMouseEnter('user')}
              onMouseLeave={handleMouseLeave}
            >
              <img src="https://theme.hstatic.net/1000312752/1001368650/14/icon-user.png?v=68" alt="user" className="action-img" />
              {activeDropdown === 'user' && (
                <div className="user-dropdown-menu" style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  background: '#fff',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  zIndex: 10,
                  minWidth: 220,
                  borderRadius: '8px',
                  padding: '8px 0',
                  marginTop: '8px',
                  border: '1px solid #eee'
                }}>
                  <ul className="user-dropdown-list" style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0
                  }}>
                    {isLoggedIn ? (
                      <>
                        <li className="nav-item-userinfo" style={{
                          padding: '12px 16px',
                          borderBottom: '1px solid #eee',
                          color: '#666',
                          fontSize: '14px',
                          fontWeight: 500
                        }}>
                          {userEmail}
                        </li>
                        <li className="nav-item-logout" onClick={handleLogout} style={{
                          padding: '12px 16px',
                          cursor: 'pointer',
                          color: '#e74c3c',
                          fontSize: '14px',
                          transition: 'background-color 0.2s',
                          ':hover': {
                            backgroundColor: '#f8f9fa'
                          }
                        }}>Đăng xuất</li>
                      </>
                    ) : (
                      <>
                        <li className="nav-item-login" onClick={() => { setActiveDropdown(null); navigate('/login'); }} style={{
                          padding: '12px 16px',
                          cursor: 'pointer',
                          color: '#333',
                          fontSize: '14px',
                          transition: 'background-color 0.2s',
                          ':hover': {
                            backgroundColor: '#f8f9fa'
                          }
                        }}>Đăng nhập</li>
                        <li className="nav-item-register" onClick={() => { setActiveDropdown(null); navigate('/register'); }} style={{
                          padding: '12px 16px',
                          cursor: 'pointer',
                          color: '#333',
                          fontSize: '14px',
                          transition: 'background-color 0.2s',
                          ':hover': {
                            backgroundColor: '#f8f9fa'
                          }
                        }}>Đăng ký</li>
                      </>
                    )}
                  </ul>
                </div>
              )}
            </div>
            <div className="action-item action-search">
              <img
                src="https://theme.hstatic.net/1000312752/1001368650/14/icon-search.png?v=68"
                alt="search"
                className="action-img"
                style={{ cursor: 'pointer' }}
                onClick={onSearchClick}
              />
            </div>
            <div className="action-item action-cart" onClick={() => navigate('/cart')}>
              <img src="https://theme.hstatic.net/1000312752/1001368650/14/icon-bag.png?v=68" alt="cart" className="action-img" />
              {cartItemCount > 0 && (
                <span className="cart-count">{cartItemCount}</span>
              )}
            </div>
          </div>
        </div>

        <div className="actions">
          <div className="action-item action-user" style={{ position: 'relative' }}
            onMouseEnter={() => handleMouseEnter('user')}
            onMouseLeave={handleMouseLeave}
          >
            <img src="https://theme.hstatic.net/1000312752/1001368650/14/icon-user.png?v=68" alt="user" className="action-img" />
            {activeDropdown === 'user' && (
              <div className="user-dropdown-menu" style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                background: '#fff',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                zIndex: 10,
                minWidth: 220,
                borderRadius: '8px',
                padding: '8px 0',
                marginTop: '8px',
                border: '1px solid #eee'
              }}>
                <ul className="user-dropdown-list" style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0
                }}>
                  {isLoggedIn ? (
                    <>
                      <li className="nav-item-userinfo" style={{
                        padding: '12px 16px',
                        borderBottom: '1px solid #eee',
                        color: '#666',
                        fontSize: '14px',
                        fontWeight: 500
                      }}>
                        {userEmail}
                      </li>
                      <li className="nav-item-logout" onClick={handleLogout} style={{
                        padding: '12px 16px',
                        cursor: 'pointer',
                        color: '#e74c3c',
                        fontSize: '14px',
                        transition: 'background-color 0.2s',
                        ':hover': {
                          backgroundColor: '#f8f9fa'
                        }
                      }}>Đăng xuất</li>
                    </>
                  ) : (
                    <>
                      <li className="nav-item-login" onClick={() => { setActiveDropdown(null); navigate('/login'); }} style={{
                        padding: '12px 16px',
                        cursor: 'pointer',
                        color: '#333',
                        fontSize: '14px',
                        transition: 'background-color 0.2s',
                        ':hover': {
                          backgroundColor: '#f8f9fa'
                        }
                      }}>Đăng nhập</li>
                      <li className="nav-item-register" onClick={() => { setActiveDropdown(null); navigate('/register'); }} style={{
                        padding: '12px 16px',
                        cursor: 'pointer',
                        color: '#333',
                        fontSize: '14px',
                        transition: 'background-color 0.2s',
                        ':hover': {
                          backgroundColor: '#f8f9fa'
                        }
                      }}>Đăng ký</li>
                    </>
                  )}
                </ul>
              </div>
            )}
          </div>
          <div className="action-item action-search">
            <img
              src="https://theme.hstatic.net/1000312752/1001368650/14/icon-search.png?v=68"
              alt="search"
              className="action-img"
              style={{ cursor: 'pointer' }}
              onClick={onSearchClick}
            />
          </div>
          <div className="action-item action-cart" onClick={() => navigate('/cart')}>
            <img src="https://theme.hstatic.net/1000312752/1001368650/14/icon-bag.png?v=68" alt="cart" className="action-img" />
            {cartItemCount > 0 && (
              <span className="cart-count">{cartItemCount}</span>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header;
