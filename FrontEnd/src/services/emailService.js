import axios from 'axios';
import api from './api';
import emailjs from '@emailjs/browser';

const API_URL =  'http://localhost:5000';

export const subscribeNewsletter = async (email) => {
    try {
        const response = await axios.post(API_URL, {
            query: `
                mutation {
                    create_email_user_item(data: { title: "${email}" }) {
                        id
                    }
                }
            `
        });

        if (response.data.errors) {
            throw new Error(response.data.errors[0].message);
        }

        return {
            success: true,
            data: response.data.data.create_email_user_item
        };
    } catch (error) {
        return {
            success: false,
            error: error.message || 'Có lỗi xảy ra khi đăng ký'
        };
    }
};

export const sendOrderConfirmationEmail = async (orderData) => {
    console.log(orderData);
    try {
        const templateParams = {
            to_email: orderData.email,
            from_name: 'Li-Ning Sport Vietnam',
            status: `đã được xác nhận`,
            // reply_to: orderData.email,
        };
        const response = await emailjs.send(
            "service_okoserm",
            "template_qc34e4s",
            templateParams,
            "RJYgH5x8Gi6zb8-vN"
        );

        return response;
    } catch (error) {
        console.error('Error sending order confirmation email:', error);
        throw error;
    }
};

