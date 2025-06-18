import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Homepage from './pages/homepage/Homepage'
import Collection from './pages/Collection/Collection'
import Blog from './pages/blog/Blog'
import Header from './layout/header/Header'
import Footer from './layout/footer/Footer'
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import BlogDetail from './pages/blog/BlogDetail';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Cart from './pages/Cart/Cart';
import StoreSystem from './pages/StoreSystem/StoreSystem';
import Checkout from './pages/Checkout/Checkout';
import Payment from './pages/Payment/Payment';
import { CartProvider } from './contexts/CartContext';
import OrderSuccess from './pages/OrderSuccess/OrderSuccess';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef(null);

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

  // Đóng search khi click ra ngoài
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    }
    if (showSearch) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSearch]);

  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Header onSearchClick={() => setShowSearch((v) => !v)} />
          <div
            className={`main-search-bar-animated${showSearch ? " show" : ""}`}
            ref={searchRef}
          >
            <input
              type="text"
              className="main-search-input"
              placeholder="Tìm kiếm sản phẩm, danh mục..."
            />
            <button className="main-search-btn">
              <img src="https://theme.hstatic.net/1000312752/1001368650/14/icon-search.png?v=68" alt="search" />
            </button>
          </div>
          <main style={{ backgroundColor: '#FAFAFA' }}>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/collection" element={<Collection />} />
              <Route path="/collection/:path" element={<Collection />} />
              <Route path="/collection/:path/:id" element={<ProductDetail />} />
              <Route path="/blogs/:slug" element={<Blog />} />
              <Route path="/blogs/:slug/:id" element={<BlogDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/he-thong-cua-hang" element={<StoreSystem />} />
              <Route path="/order-success" element={<OrderSuccess />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  )
}

export default App
