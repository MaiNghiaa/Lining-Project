import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import './Cart.css';

export default function Cart() {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);

    const calculateTotal = useCallback((items) => {
        const sum = items.reduce((acc, item) => {
            // Chuyển đổi giá từ string sang number và loại bỏ dấu phẩy
            const price = typeof item.price === 'string'
                ? parseFloat(item.price.replace(/,/g, ''))
                : item.price;
            return acc + (price * item.quantity);
        }, 0);
        setTotal(sum);
    }, []);

    const loadCart = useCallback(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        // Chuyển đổi giá của tất cả items từ string sang number
        const processedCart = savedCart.map(item => ({
            ...item,
            price: typeof item.price === 'string'
                ? parseFloat(item.price.replace(/,/g, ''))
                : item.price
        }));
        setCartItems(processedCart);
        calculateTotal(processedCart);
    }, [calculateTotal]);

    useEffect(() => {
        loadCart();
    }, [loadCart]);

    const updateQuantity = useCallback((itemId, size, newQuantity) => {
        if (newQuantity < 1) return;

        setCartItems(prevItems => {
            const updatedCart = prevItems.map(item => {
                if (item.id === itemId && item.size === size) {
                    return { ...item, quantity: newQuantity };
                }
                return item;
            });

            calculateTotal(updatedCart);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            return updatedCart;
        });
    }, [calculateTotal]);

    const removeItem = useCallback((itemId, size) => {
        setCartItems(prevItems => {
            const updatedCart = prevItems.filter(item => !(item.id === itemId && item.size === size));
            calculateTotal(updatedCart);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            return updatedCart;
        });
    }, [calculateTotal]);

    const handleCheckout = useCallback(() => {
        navigate('/checkout');
    }, [navigate]);

    const breadcrumbItems = [
        { label: 'Trang chủ', path: '/' },
        { label: 'Giỏ hàng', path: '/cart' }
    ];

    return (
        <div className="cart-page">
            <Breadcrumb items={breadcrumbItems} />
            <div className="container">
                <h1 className="cart-title">Giỏ hàng của bạn</h1>

                {cartItems.length === 0 ? (
                    <div className="empty-cart">
                        <p>Giỏ hàng của bạn đang trống</p>
                        <button
                            className="continue-shopping"
                            onClick={() => navigate('/')}
                        >
                            Tiếp tục mua sắm
                        </button>
                    </div>
                ) : (
                    <div className="cart-content">
                        <div className="cart-items">
                            {cartItems.map((item) => (
                                <div key={`${item.id}-${item.size}`} className="cart-item">
                                    <img
                                        src={`http://localhost:8055/assets/${item.image}`}
                                        alt={item.name}
                                        className="cart-item-image"
                                    />
                                    <div className="cart-item-details">
                                        <div className="cart-item-header">
                                            <h3>{item.name}  <span> - {item.ma_san_pham}</span></h3>
                                            <button
                                                className="remove-item"
                                                onClick={() => removeItem(item.id, item.size)}
                                            >
                                                ×
                                            </button>
                                        </div>
                                        <div className="cart-item-variants">

                                            {item.size && (
                                                <div className="variant-item">
                                                    <span className="variant-label">Size:</span>
                                                    <span className="variant-value">{item.size}</span>
                                                </div>
                                            )}
                                            <div className="variant-item">
                                                <span className="variant-label">Nhóm:</span>
                                                <span className="variant-value">{item.color} - {item.material}</span>
                                            </div>
                                        </div>
                                        <div className="cart-item-price-info">
                                            <div className="price-info-row">
                                                <div className="price-column">
                                                    <span className="price-label">Đơn giá:</span>
                                                    <span className="cart-item-price">
                                                        {item.price.toLocaleString('vi-VN')}₫
                                                    </span>
                                                </div>
                                                <div className="price-column">
                                                    <span className="price-label">Số lượng:</span>
                                                    <div className="quantity-controls">
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                                                        >-</button>
                                                        <span>{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                                                        >+</button>
                                                    </div>
                                                </div>
                                                <div className="price-column">
                                                    <span className="price-label">Thành tiền:</span>
                                                    <span className="cart-item-subtotal">
                                                        {(item.price * item.quantity).toLocaleString('vi-VN')}₫
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="cart-summary">
                            <h2>Tổng quan đơn hàng</h2>
                            <div className="summary-row">
                                <span>thành tiền:</span>
                                <span>{total.toLocaleString('vi-VN')}₫</span>
                            </div>
                            {/* <div className="summary-row">
                                <span>Phí vận chuyển:</span>
                                <span>Miễn phí</span>
                            </div> */}
                            <div className="summary-row total">
                                <span>Tổng cộng:</span>
                                <span>{total.toLocaleString('vi-VN')}₫</span>
                            </div>
                            <button
                                className="checkout-button"
                                onClick={handleCheckout}
                            >
                                Tiến hành thanh toán
                            </button>
                            <button
                                className="continue-shopping"
                                onClick={() => navigate('/')}
                            >
                                Tiếp tục mua sắm
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
} 