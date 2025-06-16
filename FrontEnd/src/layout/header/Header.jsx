import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import 'line-awesome/dist/line-awesome/css/line-awesome.min.css'
import './header.css'

const Header = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleMouseEnter = (index) => {
    setActiveDropdown(index);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  const menuItems = [
    {
      title: 'Thể thao',
      path: '/the-thao',
      dropdownItems: [
        { title: 'Pickleball', path: '/the-thao/pickleball' },
        { title: 'Chạy bộ', path: '/the-thao/chay-bo' },
        { title: 'Tập luyện', path: '/the-thao/tap-luyen' },
        { title: 'Bóng rổ', path: '/the-thao/bong-ro' },
        { title: 'Cầu lông', path: '/the-thao/cau-long' },
        { title: 'Bóng đá', path: '/the-thao/bong-da' },
        { title: 'Golf', path: '/the-thao/golf' }
      ]
    },
    {
      title: 'Thời trang',
      path: '/thoi-trang',
      dropdownItems: [
        { title: 'WADE', path: '/thoi-trang/wade' },
        { title: 'BADFIVE', path: '/thoi-trang/badfive' },
        { title: 'LIFESTYLES', path: '/thoi-trang/lifestyles' },
        { title: 'ISAAC', path: '/thoi-trang/isaac' }
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

        <button className="mobile-menu-btn">
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className="navigation">
          <ul className="nav-list">
            {menuItems.map((item, index) => (
              <li key={index} className="nav-item">
                <div
                  className="dropdown"
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    to={item.path}
                    className="nav-link"
                  >
                    {item.title}
                    {/* {item.dropdownItems.length > 0 && (
                      <i className="las la-chevron-down"></i>
                    )} */}
                  </Link>
                  {item.dropdownItems.length > 0 && (
                    <div className={`dropdown-menu ${activeDropdown === index ? 'show' : ''}`}>
                      <ul className="dropdown-list">
                        {item.dropdownItems.map((dropdownItem, dropdownIndex) => (
                          <li key={dropdownIndex} className="dropdown-item">
                            <Link to={dropdownItem.path} className="nav-link">{dropdownItem.title}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="actions">
          <div className="action-item action-user">
            <img src="https://theme.hstatic.net/1000312752/1001368650/14/icon-user.png?v=68" alt="user" className="action-img" />
          </div>
          <div className="action-item action-search">
            <img src="https://theme.hstatic.net/1000312752/1001368650/14/icon-search.png?v=68" alt="search" className="action-img" />
          </div>
          <div className="action-item action-cart">
            <img src="https://theme.hstatic.net/1000312752/1001368650/14/icon-bag.png?v=68" alt="cart" className="action-img" />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header;
