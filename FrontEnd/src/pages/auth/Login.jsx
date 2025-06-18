import React, { useState } from 'react';
import './auth.css';
import { FiMail, FiLock } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/userService';

const Login = () => {
    const [form, setForm] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await loginUser(form.email, form.password);
            // Lưu token vào localStorage
            localStorage.setItem('access_token', res.data.data.access_token);
            // Chuyển hướng sang trang chủ
            navigate('/');
        } catch (error) {
            alert('Đăng nhập thất bại! Vui lòng kiểm tra lại email hoặc mật khẩu.');
        }
    };

    return (
        <div className="auth-form-container login-form-box">
            <img src="/public/images/logo_compact.webp" alt="logo" className="auth-logo" />
            <h2 className="login-title">Chào mừng bạn trở lại!</h2>
            <p className="auth-desc">Đăng nhập để tiếp tục mua sắm cùng Li-Ning Việt Nam</p>
            <form className="auth-form" onSubmit={handleSubmit}>
                <div className="auth-input-group">
                    <span className="auth-input-icon"><FiMail /></span>
                    <input className="auth-input" name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
                </div>
                <div className="auth-input-group">
                    <span className="auth-input-icon"><FiLock /></span>
                    <input className="auth-input" name="password" type="password" placeholder="Mật khẩu" value={form.password} onChange={handleChange} required />
                </div>
                <button className="auth-btn big-btn" type="submit">Đăng nhập</button>
                <div className="auth-link-row">
                    <a href="#" className="auth-link">Quên mật khẩu?</a>
                </div>
            </form>
            <div className="auth-bottom-text">
                Chưa có tài khoản? <Link to="/register" className="auth-link">Đăng ký ngay</Link>
            </div>
        </div>
    );
};

export default Login; 