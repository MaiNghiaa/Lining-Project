import React from 'react';
import { Link } from 'react-router-dom';
import './breadcrumb.css';

const Breadcrumb = ({ items }) => {
    return (
        <div className="bread-crumb">
            <div className="bread-crumb-list">
                <div className="bread-crumb-item">
                    <Link to="/">Trang chủ</Link>
                </div>
                {items && items.map((item, index) => (
                    <React.Fragment key={index}>
                        <span className="bread-crumb-separator">/</span>
                        <div className="bread-crumb-item">
                            <Link to={item.path}>{item.label}</Link>
                        </div>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default Breadcrumb; 