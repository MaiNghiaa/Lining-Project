import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getBlogPostById } from '../../services/blogService';
import './blog.css';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import getPageInfo from '../../utils/pageInfo';

const BlogDetail = () => {
    const { id, slug } = useParams();

    const pageInfo = getPageInfo(slug);
    const [blogPost, setBlogPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlogPost = async () => {
            try {
                const data = await getBlogPostById(id);
                setBlogPost(data);
                setLoading(false);
            } catch (err) {
                setError('Không thể tải bài viết. Vui lòng thử lại sau.');
                setLoading(false);
            }
        };

        fetchBlogPost();
    }, [id]);

    // Hàm chuyển đổi HTML thành JSX an toàn
    const createMarkup = (htmlContent) => {
        return { __html: htmlContent };
    };

    if (loading) {
        return <div className="blog-detail-loading">Đang tải...</div>;
    }

    if (error) {
        return <div className="blog-detail-error">{error}</div>;
    }

    if (!blogPost) {
        return <div className="blog-detail-not-found">Không tìm thấy bài viết</div>;
    }

    const breadcrumbItems = [
        { label: `${pageInfo.breadcrumbLabel}`, path: '/blogs' },
        { label: blogPost.title, path: `/blogs/${blogPost.meta_data}` }
    ];

    return (
        <div className="blog-detail-page">
            <Breadcrumb items={breadcrumbItems} />
            <div className="blog-detail-container">
                <div className="blog-detail-header">
                    <h1 className="blog-detail-title">{blogPost.title}</h1>
                    <div className="blog-detail-meta">
                        <span className="blog-detail-date">{blogPost.date_time.split('T')[0]}</span>
                    </div>
                </div>
                <div
                    className="blog-detail-content"
                    dangerouslySetInnerHTML={createMarkup(blogPost.content)}
                />
            </div>
        </div>
    );
};

export default BlogDetail; 