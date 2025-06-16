import React from "react";
import { useParams } from "react-router-dom";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import "./blog.css";

const Blog = () => {
    const { slug } = useParams();
    const getPageInfo = (slug) => {
        switch (slug) {
            case 'tin-tuc-su-kien':
                return {
                    title: 'Tin tức - Sự kiện',
                    breadcrumbLabel: 'Tin tức - Sự kiện'
                };
            case 'tin-khuyen-mai':
                return {
                    title: 'Tin khuyến mại',
                    breadcrumbLabel: 'Tin khuyến mại'
                };
            case 'cong-nghe-san-pham':
                return {
                    title: 'CÔNG NGHỆ SẢN PHẨM',
                    breadcrumbLabel: 'CÔNG NGHỆ SẢN PHẨM'
                };
            default:
                return {
                    title: 'Blog',
                    breadcrumbLabel: 'Blog'
                };
        }
    };

    const pageInfo = getPageInfo(slug);
    const breadcrumbItems = [
        { label: pageInfo.breadcrumbLabel, path: `/blogs/${slug}` }
    ];

    const blogPosts = [
        {
            id: 1,
            title: "CHITU 8/CHITU 8 PRO – MỘT ĐÔI GIÀY, MỌI HÀNH TRÌNH",
            description: "Ra mắt phiên bản 2025 – ",
            image: "https://file.hstatic.net/1000312752/article/pop-up_bbf3597f6fbc46e1b00c96918e2c3cb8_large.png",
            date: "15/03/2024"
        },
        {
            id: 2,
            title: "CHITU 8/CHITU 8 PRO – MỘT ĐÔI GIÀY, MỌI HÀNH TRÌNH",
            description: "Ra mắt phiên bản 2025 – ",
            image: "https://file.hstatic.net/1000312752/article/pop-up_bbf3597f6fbc46e1b00c96918e2c3cb8_large.png",
            date: "15/03/2024"
        }, {
            id: 3,
            title: "CHITU 8/CHITU 8 PRO – MỘT ĐÔI GIÀY, MỌI HÀNH TRÌNH",
            description: "Ra mắt phiên bản 2025 – ",
            image: "https://file.hstatic.net/1000312752/article/pop-up_bbf3597f6fbc46e1b00c96918e2c3cb8_large.png",
            date: "15/03/2024"
        }, {
            id: 4,
            title: "CHITU 8/CHITU 8 PRO – MỘT ĐÔI GIÀY, MỌI HÀNH TRÌNH",
            description: "Ra mắt phiên bản 2025 – ",
            image: "https://file.hstatic.net/1000312752/article/pop-up_bbf3597f6fbc46e1b00c96918e2c3cb8_large.png",
            date: "15/03/2024"
        }, {
            id: 5,
            title: "CHITU 8/CHITU 8 PRO – MỘT ĐÔI GIÀY, MỌI HÀNH TRÌNH",
            description: "Ra mắt phiên bản 2025 – ",
            image: "https://file.hstatic.net/1000312752/article/pop-up_bbf3597f6fbc46e1b00c96918e2c3cb8_large.png",
            date: "15/03/2024"
        }, {
            id: 6,
            title: "CHITU 8/CHITU 8 PRO – MỘT ĐÔI GIÀY, MỌI HÀNH TRÌNH",
            description: "Ra mắt phiên bản 2025 – ",
            image: "https://file.hstatic.net/1000312752/article/pop-up_bbf3597f6fbc46e1b00c96918e2c3cb8_large.png",
            date: "15/03/2024"
        },
    ];

    return (
        <div className="blog-page-container">
            <Breadcrumb items={breadcrumbItems} />
            <div className="blog-page">
                <div className="container" style={{ backgroundColor: "transparent" }}>
                    {/* <h1 className="blog-page-title">{pageInfo.title}</h1> */}
                    <div className="blog-grid">
                        {blogPosts.map((post) => (
                            <div key={post.id} className="blog-card">
                                <div className="blog-image">
                                    <img src={post.image} alt={post.title} />
                                </div>
                                <div className="blog-content">
                                    <span className="blog-date">{post.date}</span>
                                    <h2 className="blog-title">{post.title}</h2>
                                    <p className="blog-description">{post.description}</p>
                                    <button className="read-more-btn">Đọc thêm</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Blog; 