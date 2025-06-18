import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import './Payment.css';
import { createOrder } from '../../services/orderService';
import { sendOrderConfirmationEmail } from '../../services/emailService';

export default function Payment() {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [shippingFee, setShippingFee] = useState(40000);
    const [selectedPayment, setSelectedPayment] = useState('cod');
    const [showMomoImage, setShowMomoImage] = useState(false);

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
    }, []);

    const breadcrumbItems = [
        { label: 'Giỏ hàng', path: '/cart' },
        { label: 'Thông tin giao hàng', path: '/checkout' },
        { label: 'Phương thức thanh toán', path: '/payment' }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Get user data from localStorage
            const userData = JSON.parse(localStorage.getItem('userData')) || {};
            const cart = JSON.parse(localStorage.getItem('cart')) || [];

            // Prepare order data with color information
            const orderData = {
                fullName: userData.fullName,
                email: userData.email,
                phone: userData.phone,
                address: userData.address,
                province: userData.province,
                district: userData.district,
                ward: userData.ward,
                paymentMethod: selectedPayment === 'card' ? 'Thẻ ATM/Visa/Master/JCB/Amex' : 'Thanh toán khi nhận hàng',
                shippingFee: shippingFee,
                totalAmount: total,
                items: cart.map(item => ({
                    ...item,
                    color: item.color || 'Black',
                    size: item.size || 'N/A',
                    quantity: item.quantity,
                    price: item.price,
                    name: item.name,
                    ma_san_pham: item.ma_san_pham,
                    image: item.image
                }))
            };

            // Create order
            const response = await createOrder(orderData);
            console.log('Order created:', response);

            // Add order number to orderData
            orderData.orderNumber = response.data.id;

            // Send confirmation email
            try {
                await sendOrderConfirmationEmail(orderData);
                console.log('Confirmation email sent successfully');
            } catch (emailError) {
                console.error('Error sending confirmation email:', emailError);
                // Continue with order process even if email fails
            }

            // Clear cart and user data after successful order
            localStorage.removeItem('cart');
            localStorage.removeItem('userData');

            // Navigate to success page
            navigate('/order-success');
        } catch (error) {
            console.error('Error creating order:', error);
            alert('Có lỗi xảy ra khi tạo đơn hàng. Vui lòng thử lại sau.');
        }
    };

    const handlePaymentChange = (e) => {
        setSelectedPayment(e.target.value);
        if (e.target.value === 'card') {
            setShowMomoImage(true);
        }
    };

    return (
        <div className="payment-page">

            <div className="payment-content">
                <div className="wrap">
                    <div className="payment-form-container">
                        <div className="checkout-header">
                            <h1>Li-Ning Sport Vietnam - Cửa hàng trực tuyến chính thức</h1>
                            <Breadcrumb items={breadcrumbItems} />
                        </div>

                        <div className="shipping-section">
                            <h2>Phương thức vận chuyển</h2>
                            <div className="shipping-method">
                                <label className="radio-label">
                                    <div className='shipping-method-info'>
                                        <input
                                            type="radio"
                                            checked={true}
                                            readOnly
                                        />
                                        <span className="radio-content">
                                            <span>GIAO HÀNG TẬN NƠI</span>
                                        </span>
                                    </div>
                                    <span>{shippingFee.toLocaleString('vi-VN')}₫</span>
                                </label>

                            </div>
                        </div>

                        <div className="payment-section">
                            <h2>Phương thức thanh toán</h2>
                            <div className="payment-methods">
                                <label className="radio-label">
                                    <div className='payment-method-info'>
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="cod"
                                            checked={selectedPayment === 'cod'}
                                            onChange={(e) => setSelectedPayment(e.target.value)}
                                        />
                                        <span className="radio-content">
                                            <span className="payment-method-info">
                                                <img src="https://hstatic.net/0/0/global/design/seller/image/payment/cod.svg?v=6" alt="COD" className="payment-icon" />
                                                <span>Thanh toán khi giao hàng (COD)</span>
                                            </span>
                                        </span>
                                    </div>
                                </label>

                                <div className="payment-note" style={{ display: selectedPayment === 'cod' ? 'block' : 'none' }}>
                                    <p>Quý khách vui lòng thanh toán bằng tiền mặt cho nhân viên giao hàng</p>
                                    <p>- Đối với khách hàng đã xác nhận đặt hàng nhưng khi nhân viên giao hàng giao tới tay người nhận nhưng lại từ chối nhận hàng vui lòng thanh toán phí chuyển hoàn cho nhân viên giao hàng. Phí có định 40.000 vnđ</p>
                                    <p>Chúc quý khách nhiều niềm vui !</p>
                                </div>

                                {/* <label className="radio-label">
                                    <div className='payment-method-info'><input
                                        type="radio"
                                        name="payment"
                                        value="card"
                                        checked={selectedPayment === 'card'}
                                        onChange={handlePaymentChange}
                                    />
                                        <span className="radio-content">
                                            <span className="payment-method-info">
                                                <div className='payment-icon' style={{ width: "30px", height: "30px" }}>
                                                    <img style={{ width: "100%", height: "100%", objectFit: "cover" }} src="data:image/png;base64,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" alt="Card" className="payment-icon" />
                                                </div>
                                                <span>Thẻ ATM/Visa/Master/JCB/Amex qua cổng Payoo</span>
                                            </span>
                                        </span></div>
                                </label>
                                {showMomoImage && (
                                    <div className="payment-note" style={{ display: selectedPayment === 'card' ? 'block' : 'none' }}>
                                        <img src={momoImage} alt="MoMo QR Code" className="momo-image" />
                                    </div>
                                )} */}


                            </div>
                        </div>

                        <div className="form-actions">
                            <button type="button" className="back-to-cart" onClick={() => navigate('/checkout')}>
                                Quay lại thông tin giao hàng
                            </button>
                            <button type="submit" className="complete-order" onClick={handleSubmit}>
                                Hoàn tất đơn hàng
                            </button>
                        </div>
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

const styles = `
.momo-image-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    cursor: pointer;
}

.momo-image {
    max-width: 80%;
    max-height: 80%;
    object-fit: contain;
}
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);



