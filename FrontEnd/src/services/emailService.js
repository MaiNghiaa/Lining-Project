import axios from 'axios';

const API_URL = 'http://localhost:8055/graphql';

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