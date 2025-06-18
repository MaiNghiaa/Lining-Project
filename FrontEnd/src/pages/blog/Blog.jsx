import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import "./blog.css";
import { getFeaturedEvents } from "../../services/blogService";
import getPageInfo from "../../utils/pageInfo";
const Blog = () => {
    const { slug } = useParams();
    const [blogPosts, setBlogPosts] = useState([]);
    const navigate = useNavigate();


    const pageInfo = getPageInfo(slug);
    const breadcrumbItems = [
        { label: pageInfo.breadcrumbLabel, path: `/blogs/${slug}` }
    ];
    console.log(pageInfo);
    useEffect(() => {
        getFeaturedEvents(`${pageInfo.title}`).then(data => {
            setBlogPosts(data);
            console.log(data);
        });
    }, [slug]);


    return (
        <div className="blog-page-container">
            <Breadcrumb items={breadcrumbItems} />
            <div className="blog-page">
                <div className="container" style={{ backgroundColor: "transparent" }}>
                    {/* <h1 className="blog-page-title">{pageInfo.title}</h1> */}
                    <div className="blog-grid">
                        {blogPosts.map((post) => (
                            <div key={post.id} className="blog-card" onClick={() => navigate(`/blogs/${slug}/${post.id}`)}>
                                <div className="blog-image">
                                    <img src={`http://localhost:8055/assets/${post.image_cover.filename_disk}`} alt={post.title} />
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