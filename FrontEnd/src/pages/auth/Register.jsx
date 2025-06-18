import React, { useState } from 'react';
import './auth.css';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/userService';

const Register = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        ho: '',
        ten: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Đăng ký:', form);

        const payload = {
            first_name: form.ho,
            last_name: form.ten,
            email: form.email,
            password: form.password,
            policies: {
                create: [
                    {
                        user: "+",
                        policy: {
                            id: "abf8a154-5b1c-4a46-ac9c-7300570f4f17"
                        }
                    }
                ],
                update: [],
                delete: []
            }
        };

        try {
            await registerUser(payload);
            navigate('/login');
        } catch (error) {

            alert('Tài khoản đã tồn tại');
        }
    };

    return (
        <div className="register-form-outer">
            <h2 className="register-title">Đăng ký</h2>
            <form className="auth-form" onSubmit={handleSubmit}>
                <div className="auth-row auth-row-names">
                    <input className="auth-input" name="ho" placeholder="Họ" value={form.ho} onChange={handleChange} required />
                    <input className="auth-input" name="ten" placeholder="Tên" value={form.ten} onChange={handleChange} required />
                </div>
                <input className="auth-input" name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
                <input className="auth-input" name="password" type="password" placeholder="Mật khẩu" value={form.password} onChange={handleChange} required />
                <input className="auth-input" name="confirmPassword" type="password" placeholder="Nhập lại mật khẩu" value={form.confirmPassword} onChange={handleChange} required />
                <button className="auth-btn" type="submit">Đăng ký</button>
            </form>
            <div className="auth-bottom-text">
                Đã có tài khoản? <Link to="/login" className="auth-link">Đăng nhập ngay</Link>
            </div>
        </div>
    );
};

export default Register; 