import React from 'react';
import { useNavigate } from 'react-router-dom';
import './OrderSuccess.css';

const OrderSuccess = () => {
    const navigate = useNavigate();

    return (
        <div className="order-success-page">
            <div className="success-container">
                <div className="success-icon">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="#4CAF50" />
                    </svg>
                </div>
                <h1>Đặt hàng thành công!</h1>
                <p>Cảm ơn bạn đã đặt hàng. Chúng tôi sẽ xử lý đơn hàng của bạn trong thời gian sớm nhất.</p>
                <p>Một email xác nhận đã được gửi đến địa chỉ email của bạn.</p>
                <div className="success-actions">
                    <button onClick={() => navigate('/')} className="continue-shopping">
                        Tiếp tục mua sắm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccess; 