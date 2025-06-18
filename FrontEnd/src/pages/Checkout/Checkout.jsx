import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import './Checkout.css';

export default function Checkout() {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [shippingFee, setShippingFee] = useState(30000); // Mặc định 30,000đ
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        province: '',
        district: '',
        ward: ''
    });

    useEffect(() => {
        // Load cart data from localStorage
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(savedCart);

        // Calculate total
        const sum = savedCart.reduce((acc, item) => {
            const price = typeof item.price === 'string'
                ? parseFloat(item.price.replace(/,/g, ''))
                : item.price;
            return acc + (price * item.quantity);
        }, 0);
        setTotal(sum);

        // Load user data if available
        const userInfo = JSON.parse(localStorage.getItem('user_info'));
        if (userInfo) {
            setFormData({
                fullName: userInfo.full_name || '',
                email: userInfo.email || '',
                phone: userInfo.phone || '',
                address: userInfo.address || '',
                province: userInfo.province || '',
                district: userInfo.district || '',
                ward: userInfo.ward || ''
            });
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Save form data to localStorage
        localStorage.setItem('userData', JSON.stringify(formData));
        // Save cart data to localStorage for order creation
        localStorage.setItem('orderData', JSON.stringify({
            items: cartItems,
            total: total,
            shippingFee: shippingFee
        }));
        // Navigate to payment method page
        navigate('/payment');
    };

    const breadcrumbItems = [
        { label: 'Giỏ hàng', path: '/cart' },
        { label: 'Thông tin giao hàng', path: '/checkout' }
    ];

    return (
        <div className="checkout-page">

            <div className="checkout-content">
                <div className="wrap">
                    <div className="checkout-form-container">
                        <div className="checkout-header">
                            <h1>Li-Ning Sport Vietnam - Cửa hàng trực tuyến chính thức</h1>
                            <Breadcrumb items={breadcrumbItems} />
                        </div>
                        <form onSubmit={handleSubmit} className="shipping-form">
                            <h2>Thông tin giao hàng</h2>

                            <div className="form-group">
                                <label className='labelForm' htmlFor="fullName">Họ và tên</label>
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Nhập họ và tên"
                                />
                            </div>

                            <div className="form-group">
                                <label className='labelForm' htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Nhập email"
                                />
                            </div>

                            <div className="form-group">
                                <label className='labelForm' htmlFor="phone">Số điện thoại</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Nhập số điện thoại"
                                />
                            </div>

                            <div className="form-group">
                                <label className='labelForm' htmlFor="address">Địa chỉ</label>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Nhập địa chỉ"
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label className='labelForm' htmlFor="province">Tỉnh/Thành phố</label>
                                    <select
                                        id="province"
                                        name="province"
                                        value={formData.province}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Chọn tỉnh/thành phố</option>
                                        <option value="hcm">TP. Hồ Chí Minh</option>
                                        <option value="hn">Hà Nội</option>
                                        <option value="dn">Đà Nẵng</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label className='labelForm' htmlFor="district">Quận/Huyện</label>
                                    <select
                                        id="district"
                                        name="district"
                                        value={formData.district}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Chọn quận/huyện</option>
                                        <option value="q1">Quận 1</option>
                                        <option value="q2">Quận 2</option>
                                        <option value="q3">Quận 3</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label className='labelForm' htmlFor="ward">Phường/Xã</label>
                                    <select
                                        id="ward"
                                        name="ward"
                                        value={formData.ward}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Chọn phường/xã</option>
                                        <option value="p1">Phường 1</option>
                                        <option value="p2">Phường 2</option>
                                        <option value="p3">Phường 3</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-actions">
                                <button type="button" className="back-to-cart" onClick={() => navigate('/cart')}>
                                    Giỏ hàng
                                </button>
                                <button type="submit" className="continue-to-payment">
                                    Tiếp tục đến phương thức thanh toán
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="order-summary">
                        <h2>Tổng quan đơn hàng</h2>
                        <div className="cart-items">
                            {cartItems.map((item, index) => (
                                <div key={index} className="cart-item">
                                    <img
                                        src={`http://localhost:8055/assets/${item.image}`}
                                        alt={item.name}
                                        className="cart-item-image"
                                    />
                                    <div className="cart-item-details">
                                        <div className="cart-item-name">{item.name} - {item.ma_san_pham}</div>
                                        <div className="cart-item-variant">
                                            {item.size && `Size: ${item.size}`}
                                            {/* {item.color && ` - Màu: ${item.color}`} */}
                                        </div>
                                        <div className="cart-item-price">
                                            {typeof item.price === 'number'
                                                ? item.price.toLocaleString('vi-VN')
                                                : item.price}₫
                                        </div>
                                        <div className="cart-item-quantity">
                                            Số lượng: {item.quantity}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="summary-item">
                            <span>Số sản phẩm:</span>
                            <span>{cartItems.length}</span>
                        </div>
                        <div className="summary-item">
                            <span>Tạm tính:</span>
                            <span>{total.toLocaleString('vi-VN')}₫</span>
                        </div>
                        <div className="summary-item">
                            <span>Phí vận chuyển:</span>
                            <span>{shippingFee.toLocaleString('vi-VN')}₫</span>
                        </div>
                        <div className="summary-item total">
                            <span>Tổng cộng:</span>
                            <span>{(total + shippingFee).toLocaleString('vi-VN')}₫</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 