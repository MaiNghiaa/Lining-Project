import axios from 'axios';

const API_URL = 'http://localhost:8055/flows/trigger/1a082821-e92a-42cf-b53a-8132450f641b';

export const createOrder = async (orderData) => {
    try {
        const response = await axios.post(API_URL, {
            order: {
                customer_name: orderData.fullName,
                email: orderData.email,
                phone: orderData.phone,
                address: orderData.address,
                province: orderData.province,
                district: orderData.district,
                ward: orderData.ward,
                payment_method: orderData.paymentMethod,
                shipping_fee: orderData.shippingFee,
                total_amount: orderData.totalAmount,
                items: orderData.items.map(item => ({
                    color: item.color,
                    product_id: item.id,
                    name: item.name,
                    ma_san_pham: item.ma_san_pham,
                    size: item.size,
                    quantity: item.quantity,
                    price: item.price,
                    image: item.image
                }))
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }
}; 