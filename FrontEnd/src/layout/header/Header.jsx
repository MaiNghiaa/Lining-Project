import React, { useState } from 'react'
import { Link } from 'react-router-dom'
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
          <div className="action-item action-user" style={{ position: 'relative' }}
            onMouseEnter={() => setActiveDropdown('user')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <img src="https://theme.hstatic.net/1000312752/1001368650/14/icon-user.png?v=68" alt="user" className="action-img" />
            {activeDropdown === 'user' && (
              <div className="user-dropdown-menu" style={{ position: 'absolute', top: '100%', right: 0, background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.15)', zIndex: 10, minWidth: 180 }}>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                  <li style={{ padding: '10px 16px', cursor: 'pointer' }} onClick={() => setActiveDropdown('login')}>Đăng nhập</li>
                  <li style={{ padding: '10px 16px', cursor: 'pointer' }} onClick={() => setActiveDropdown('register')}>Đăng ký</li>
                </ul>
              </div>
            )}
            {activeDropdown === 'register' && (
              <div className="user-dropdown-menu" style={{ position: 'absolute', top: '100%', right: 0, background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.15)', zIndex: 10, minWidth: 300, padding: 20 }}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <RegisterForm />
              </div>
            )}
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

// RegisterForm component
const RegisterForm = () => {
  const [form, setForm] = useState({
    ho: '',
    ten: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Đăng ký:', form);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <input name="ho" placeholder="Họ" value={form.ho} onChange={handleChange} required style={{ padding: 8, border: '1px solid #ccc', borderRadius: 4 }} />
      <input name="ten" placeholder="Tên" value={form.ten} onChange={handleChange} required style={{ padding: 8, border: '1px solid #ccc', borderRadius: 4 }} />
      <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required style={{ padding: 8, border: '1px solid #ccc', borderRadius: 4 }} />
      <input name="password" type="password" placeholder="Mật khẩu" value={form.password} onChange={handleChange} required style={{ padding: 8, border: '1px solid #ccc', borderRadius: 4 }} />
      <input name="confirmPassword" type="password" placeholder="Nhập lại mật khẩu" value={form.confirmPassword} onChange={handleChange} required style={{ padding: 8, border: '1px solid #ccc', borderRadius: 4 }} />
      <button type="submit" style={{ padding: 10, background: '#222', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}>Đăng ký</button>
    </form>
  );
};

export default Header;
