import React, { useState, useEffect } from 'react';
import './Cart.css';

const Cart = ({ isOpen, onClose }) => {
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        // Lấy giỏ hàng từ localStorage khi component mount
        const loadCart = () => {
            const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
            setCartItems(savedCart);
            calculateTotal(savedCart);
        };

        loadCart();
        // Thêm event listener để cập nhật giỏ hàng khi có thay đổi
        window.addEventListener('storage', loadCart);
        return () => window.removeEventListener('storage', loadCart);
    }, []);

    const calculateTotal = (items) => {
        const sum = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        setTotal(sum);
    };

    const updateQuantity = (itemId, size, newQuantity) => {
        if (newQuantity < 1) return;

        const updatedCart = cartItems.map(item => {
            if (item.id === itemId && item.size === size) {
                return { ...item, quantity: newQuantity };
            }
            return item;
        });

        setCartItems(updatedCart);
        calculateTotal(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const removeItem = (itemId, size) => {
        const updatedCart = cartItems.filter(item => !(item.id === itemId && item.size === size));
        setCartItems(updatedCart);
        calculateTotal(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    if (!isOpen) return null;

    return (
        <div className="cart-overlay" onClick={onClose}>
            <div className="cart-container" onClick={e => e.stopPropagation()}>
                <div className="cart-header">
                    <h2>Giỏ hàng của bạn</h2>
                    <button className="close-button" onClick={onClose}>×</button>
                </div>

                {cartItems.length === 0 ? (
                    <div className="empty-cart">
                        <p>Giỏ hàng của bạn đang trống</p>
                    </div>
                ) : (
                    <>
                        <div className="cart-items">
                            {cartItems.map((item) => (
                                <div key={`${item.id}-${item.size}`} className="cart-item">
                                    <img
                                        src={`http://localhost:8055/assets/${item.image}`}
                                        alt={item.name}
                                        className="cart-item-image"
                                    />
                                    <div className="cart-item-details">
                                        <h3>{item.name}</h3>
                                        <p>Size: {item.size}</p>
                                        <p className="cart-item-price">
                                            {item.price.toLocaleString('vi-VN')}₫
                                        </p>
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
                                    <button
                                        className="remove-item"
                                        onClick={() => removeItem(item.id, item.size)}
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="cart-footer">
                            <div className="cart-total">
                                <span>Tổng cộng:</span>
                                <span>{total.toLocaleString('vi-VN')}₫</span>
                            </div>
                            <button className="checkout-button">
                                Thanh toán
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Cart; 