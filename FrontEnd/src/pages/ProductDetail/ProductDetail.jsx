import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import { getDetailItemById, getItemByCollection } from '../../services/blogService';
import './productDetail.css';
import getPageInfo from '../../utils/pageInfo';
import { useCart } from '../../contexts/CartContext';

export default function ProductDetail() {
    const { id, path } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedSize, setSelectedSize] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('description');
    const [relatedProducts, setRelatedProducts] = useState([]);
    const { addToCart } = useCart();
    const isMounted = useRef(true);
    const pageInfor = getPageInfo(path);
    console.log(pageInfor);
    const breadcrumbItems = product ? [
        { label: pageInfor.title, path: `/collection/${pageInfor.path}` },
        { label: product.name, path: `/collection/${product.name}/${id}` }
    ] : [];


    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await getDetailItemById(id);
                if (data && data.length > 0) {
                    setProduct(data[0]);
                } else {
                    setError('Không tìm thấy sản phẩm');
                }
                setLoading(false);
            } catch (err) {
                setError('Có lỗi xảy ra khi tải thông tin sản phẩm');
                setLoading(false);
            }
        };
        fetchProduct();
        const relatedProducts = async () => {
            try {
                console.log(pageInfor.title);
                const data = await getItemByCollection(pageInfor.title, 8);
                console.log(data);
                if (isMounted) {
                    // Chuyển đổi dữ liệu từ cấu trúc nested sang mảng sản phẩm đơn giản
                    const processedProducts = data.map(item => ({
                        id: item.Products_id.id,
                        name: item.Products_id.name,
                        price: parseFloat(item.Products_id.price.replace(/,/g, '')),
                        ma_san_pham: item.Products_id.ma_san_pham,
                        description: item.Products_id.description,
                        image: item.Products_id.image
                    }));
                    setRelatedProducts(processedProducts);
                    setLoading(false);
                }
            } catch (error) {
                if (isMounted) {
                    console.error('Error fetching products:', error);
                    setLoading(false);
                }
            }
        };
        relatedProducts();
    }, [id]);

    // Giả lập giá gốc và tính tiết kiệm nếu chưa có trường giá gốc
    const originalPrice = product?.original_price || (product?.price ? Math.round(product.price * 1.43) : 0);
    const discount = product ? originalPrice - product.price : 0;


    const handleQuantityChange = (value) => {
        const newQuantity = Math.max(1, Math.min(10, value));
        setQuantity(newQuantity);
    };

    const handleAddToCart = () => {
        // if (!selectedSize) {
        //     alert('Vui lòng chọn kích thước');
        //     return;
        // }

        const cartItem = {
            id: product.ma_san_pham,
            name: product.name,
            price: product.price,
            size: selectedSize,
            quantity: quantity,
            type: "oke",
            material: "ổn đi hả",
            color: "đỏ",
            image: product.image.filename_disk,
            ma_san_pham: product.ma_san_pham
        };

        addToCart(cartItem);
        alert('Đã thêm sản phẩm vào giỏ hàng!');
    };

    const handleBuyNow = () => {
        if (!selectedSize) {
            alert('Vui lòng chọn kích thước');
            return;
        }

        // Lưu vào giỏ hàng
        handleAddToCart();

        // Chuyển hướng đến trang thanh toán
        navigate('/checkout');
    };

    if (loading) {
        return <div className="loading">Đang tải...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (!product) {
        return <div className="not-found">Không tìm thấy sản phẩm</div>;
    }

    return (
        <div className="product-detail-page">
            <Breadcrumb items={breadcrumbItems} />
            <div className="container">
                <div className="product-detail-row">
                    <div className="product-detail-col">
                        <div className="main-image">
                            <img
                                src={`http://localhost:8055/assets/${product.image.filename_disk}`}
                                alt={product.name}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </div>
                    </div>
                    <div className="product-detail-col">
                        <div className="product-info">
                            <h1 className="product-title">{product.name} {" "} {product.ma_san_pham}</h1>
                            <div className="product-meta">
                                <span>Loại: {product.type || 'Vợt Pick'} </span>
                                <span className="divider">|</span>
                                <span>Mã SP: {product.ma_san_pham || id}</span>
                            </div>
                            <div className="product-pricing">
                                <span className="product-price">{product.price.toLocaleString('vi-VN')}₫</span>
                            </div>
                            <div className="product-attributes">
                                <div className="attribute-row">
                                    <span className="attribute-label">Vật liệu</span>
                                    <span className="attribute-value bordered">{product.Material || 'Carbon Fiber'}</span>
                                </div>
                                <div className="attribute-row">
                                    <span className="attribute-label">Màu sắc</span>
                                    <span className="attribute-value bordered color-box">
                                        {product.color_id && product.color_id.length > 0 ? (
                                            product.color_id.map((color, idx) => (
                                                <span key={color.color_of_product_id.id || idx} style={{ display: 'inline-flex', alignItems: 'center', marginRight: 8 }}>
                                                    <span
                                                        className="color-dot"
                                                        style={{ background: color.color_of_product_id.hex_color || '#111' }}
                                                    ></span>
                                                    <span style={{ fontSize: 14 }}>{color.color_of_product_id.title}</span>
                                                </span>
                                            ))
                                        ) : (
                                            <>
                                                <span className="color-dot" style={{ background: '#111' }}></span>
                                                Black
                                            </>
                                        )}
                                    </span>
                                </div>
                            </div>
                            <div className="product-actions-row">
                                <div className="quantity-selector">
                                    <span className="attribute-label">Số lượng</span>
                                    <div className="quantity-controls">
                                        <button
                                            onClick={() => handleQuantityChange(quantity - 1)}
                                            disabled={quantity <= 1}
                                        >
                                            -
                                        </button>
                                        <input
                                            type="number"
                                            value={quantity}
                                            onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
                                            min="1"
                                            max="10"
                                        />
                                        <button
                                            onClick={() => handleQuantityChange(quantity + 1)}
                                            disabled={quantity >= 10}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                <button className="size-guide-btn">Hướng dẫn chọn size</button>
                            </div>
                            <div className="action-buttons">
                                <button className="add-to-cart" onClick={handleAddToCart}>
                                    Thêm vào giỏ
                                </button>
                                <button className="buy-now" onClick={handleBuyNow}>
                                    Mua ngay
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Mo ta san pham */}
                <div className="product-description">
                    {/* Tabs chuyển đổi */}
                    <div className="product-detail-tabs">
                        <div className="tabs-header">
                            <span
                                className={`tab${activeTab === 'description' ? ' active' : ''}`}
                                onClick={() => setActiveTab('description')}
                            >
                                MÔ TẢ SẢN PHẨM
                            </span>
                            <span
                                className={`tab${activeTab === 'guide' ? ' active' : ''}`}
                                onClick={() => setActiveTab('guide')}
                            >
                                HƯỚNG DẪN ĐO SIZE VÀ BẢO QUẢN
                            </span>
                        </div>
                        <div className="tab-content">
                            {activeTab === 'description' ? (
                                <div dangerouslySetInnerHTML={{ __html: product.content || 'Chưa có mô tả sản phẩm.' }} />
                            ) : (
                                <>
                                    <p><strong>1. HƯỚNG DẪN ĐO SIZE QUẦN ÁO VÀ BẢO QUẢN QUẦN ÁO</strong></p>
                                    <div>
                                        <strong>1.1. Hướng dẫn đo size quần áo</strong>
                                    </div>
                                    <div>Giữ thước dây theo chiều ngang để đo:</div>
                                    <ul>
                                        <li><strong>Ngực</strong>: Đo quanh vòng ngực ở vị trí lớn nhất.</li>
                                        <li><strong>Eo</strong>: Đo vòng quanh eo ở vị trí nhỏ nhất</li>
                                        <li><strong>Hông</strong>: Quấn thước quanh mông để xác định kích thước vòng mông ở vị trí lớn nhất</li>
                                        <li><strong>Chiều dài áo</strong>: Đo từ phía chân cổ, qua đầu ngực cho đến vị trí chiều dài áo, đầm mong muốn</li>
                                    </ul>
                                    <div>
                                        <img
                                            src="http://localhost:8055/assets/7b8017dd-39dc-49b9-8897-cf37e5240125.jpg?width=600&height=300"
                                            alt="Qao 6be8f6e213cc43d0ab39c47f78ad7f5f Grande.jpg"
                                            style={{ maxWidth: 600, width: "100%", height: "auto" }}
                                        />
                                    </div>
                                    <div>
                                        <strong>1.2. Hướng dẫn bảo quản quần áo</strong>
                                    </div>
                                    <ul>
                                        <li>Sử dụng nước dưới 35 độ để giặt sản phẩm</li>
                                        <li>Không sử dụng thuốc tẩy hoặc bột giặt có độ tẩy cao</li>
                                        <li>Sử dụng túi giặt bảo quản khi dùng với máy giặt</li>
                                        <li>Tránh phơi dưới ánh nắng trực tiếp để bảo quản màu sắc</li>
                                    </ul>
                                    <div>
                                        <strong>2. HƯỚNG DẪN ĐO SIZE GIÀY VÀ CÁCH BẢO QUẢN GIÀY</strong>
                                    </div>
                                    <div>
                                        <strong>2.1 Hướng dẫn đo size giày</strong>
                                    </div>
                                    <div>
                                        <strong>Chiều dài chân:</strong>
                                    </div>
                                    <ul>
                                        <li>Đo độ dài từ đầu ngón chân tới gót chân</li>
                                        <li>Đặt một tờ giấy lên sàn với một đầu tiếp xúc với tường</li>
                                        <li>Đứng trên tờ giấy với gót chân đối với tường</li>
                                        <li>Đánh dấu trên tờ giấy nơi ngón chân của bạn kết thúc bằng một cây bút chì.</li>
                                    </ul>
                                    <div>
                                        <strong>Size giày Châu Á</strong>
                                    </div>
                                    <div>
                                        Để tính kích cỡ giày chuẩn Châu Á, người ta thường sử dụng đơn vị đo là centimet (cm). Công thức tính kích cỡ giày chuẩn Châu Á như sau:
                                    </div>
                                    <div>
                                        <strong>Size CM = chiều dài bàn chân + 0.5 - 1 (với chiều dài tính bằng cm)</strong>
                                    </div>
                                    <div>
                                        <img
                                            src="http://localhost:8055/assets/555b6f52-1460-4db9-a563-030f0de25322.jpg?width=600&height=300"
                                            alt="Giay 7ff185b3c1d04946a2ae3a44e88ad12f Grande.jpg"
                                            style={{ maxWidth: 600, width: "100%", height: "auto" }}
                                        />
                                    </div>
                                    <div>
                                        <strong>2.2 Hướng dẫn bảo quản Giày</strong>
                                    </div>
                                    <ul>
                                        <li>Bảo quản giày thể thao trong hộp đựng giày.</li>
                                        <li>Bảo quản giày nơi khô thoáng.</li>
                                        <li>Sử dụng sản phẩm hỗ trợ Bọt làm sạch. Xịt khử mùi. Xịt nano.</li>
                                        <li>Sử dụng giấy báo để giữ form giày.</li>
                                        <li>Không giặt giày thường xuyên và phơi giày dưới ánh nắng.</li>
                                    </ul>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div className="product-related">
                    <h2 className="product-related-title">Sản phẩm liên quan</h2>
                    <div className="product-related-list">
                        {relatedProducts.map((product) => (
                            <div className="product-related-item" key={product.ma_san_pham} onClick={() => navigate(`/collection/${pageInfor.breadcrumbLabel}/${product.ma_san_pham}`)}>
                                <img
                                    src={`http://localhost:8055/assets/${product.image.filename_disk}`}
                                    alt={product.name}
                                    className="product-related-img"
                                />
                                <div className="product-related-name">{product.name}</div>
                                <div className="product-related-price">
                                    {product.price?.toLocaleString('vi-VN')}₫
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
} 