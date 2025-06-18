import React from 'react';

const OrderConfirmationEmail = ({ orderData }) => {
    const {
        orderNumber,
        customerName,
        email,
        phone,
        address,
        items,
        totalAmount,
        shippingFee,
        paymentMethod,
        orderDate
    } = orderData;

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <h1 style={{ color: '#333' }}>Cảm ơn bạn đã đặt hàng!</h1>
                <p style={{ color: '#666' }}>Chúng tôi rất vui mừng được phục vụ bạn.</p>
            </div>

            <div style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '5px', marginBottom: '20px' }}>
                <h2 style={{ color: '#333', marginBottom: '15px' }}>Thông tin đơn hàng #{orderNumber}</h2>
                <p><strong>Ngày đặt hàng:</strong> {orderDate}</p>
                <p><strong>Phương thức thanh toán:</strong> {paymentMethod}</p>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h3 style={{ color: '#333' }}>Thông tin giao hàng</h3>
                <p><strong>Họ tên:</strong> {customerName}</p>
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Số điện thoại:</strong> {phone}</p>
                <p><strong>Địa chỉ:</strong> {address}</p>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h3 style={{ color: '#333' }}>Chi tiết đơn hàng</h3>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f5f5f5' }}>
                            <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Sản phẩm</th>
                            <th style={{ padding: '10px', textAlign: 'right', borderBottom: '1px solid #ddd' }}>Số lượng</th>
                            <th style={{ padding: '10px', textAlign: 'right', borderBottom: '1px solid #ddd' }}>Giá</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr key={index}>
                                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{item.name}</td>
                                <td style={{ padding: '10px', textAlign: 'right', borderBottom: '1px solid #ddd' }}>{item.quantity}</td>
                                <td style={{ padding: '10px', textAlign: 'right', borderBottom: '1px solid #ddd' }}>{item.price.toLocaleString('vi-VN')}đ</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '5px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span>Tạm tính:</span>
                    <span>{(totalAmount - shippingFee).toLocaleString('vi-VN')}đ</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span>Phí vận chuyển:</span>
                    <span>{shippingFee.toLocaleString('vi-VN')}đ</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                    <span>Tổng cộng:</span>
                    <span>{totalAmount.toLocaleString('vi-VN')}đ</span>
                </div>
            </div>

            <div style={{ marginTop: '30px', textAlign: 'center', color: '#666' }}>
                <p>Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi qua email hoặc số điện thoại hỗ trợ.</p>
                <p>Cảm ơn bạn đã tin tưởng và ủng hộ chúng tôi!</p>
            </div>
        </div>
    );
};

export default OrderConfirmationEmail; 