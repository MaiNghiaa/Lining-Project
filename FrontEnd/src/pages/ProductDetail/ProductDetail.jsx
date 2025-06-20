import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import { getDetailItemById, getItemByCollection, getMoreImage } from '../../services/blogService';
import './ProductDetail.css';
import getPageInfo from '../../utils/pageInfo';
import { useCart, CartContext } from '../../contexts/CartContext';
import SizeGuideModal from '../../components/SizeGuideModal/SizeGuideModal';
import { useContext } from 'react';
import { getStockById } from '../../services/blogService';
export default function ProductDetail() {
    const { id, path } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedSize, setSelectedSize] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('description');
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [selectedImage, setSelectedImage] = useState(0);
    const [thumbnailStartIndex, setThumbnailStartIndex] = useState(0);
    const { addToCart, clearCart, updateCartCount } = useCart();
    const isMounted = useRef(true);
    const pageInfor = getPageInfo(path);
    const breadcrumbItems = product ? [
        { label: pageInfor.title, path: `/collection/${pageInfor.path}` },
        { label: product.name, path: `/collection/${product.name}/${id}` }
    ] : [];
    const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
    const [selectedColor, setSelectedColor] = useState('');
    const { cartCount } = useContext(CartContext);
    const [productImages, setProductImages] = useState([]);
    const [stockData, setStockData] = useState([]);

    // Tính toán trạng thái stock
    const stockStatus = useMemo(() => {
        if (!stockData || stockData.length === 0) {
            return 'coming-soon'; // Sắp ra mắt
        }

        // Kiểm tra xem có stock nào > 0 không
        const hasStock = stockData.some(item => parseInt(item.stock) > 0);

        if (!hasStock) {
            return 'out-of-stock'; // Hết hàng
        }

        return 'in-stock'; // Còn hàng
    }, [stockData]);

    // Lấy stock cho màu và size đã chọn
    const getCurrentStock = useMemo(() => {
        if (!selectedColor || !selectedSize || !stockData) return null;

        return stockData.find(item =>
            item.color_id?.hex_color &&
            item.size_id?.title === selectedSize
        );
    }, [selectedColor, selectedSize, stockData]);

    // Kiểm tra stock cho màu và size hiện tại
    const currentStockStatus = useMemo(() => {
        if (!stockData || stockData.length === 0) {
            return 'coming-soon';
        }

        // Kiểm tra xem sản phẩm có size không
        const hasSize = product.size_id && product.size_id.length > 0;

        // Nếu đã chọn màu và size (và sản phẩm có size)
        if (selectedColor && selectedSize && hasSize) {
            // Tìm stock cho màu và size đã chọn
            const currentStock = stockData.find(item =>
                item.size_id?.title === selectedSize
            );

            if (!currentStock) {
                return 'out-of-stock'; // Không có stock cho size này
            }

            if (parseInt(currentStock.stock) === 0) {
                return 'out-of-stock';
            }

            return 'in-stock';
        }

        // Nếu sản phẩm không có size hoặc chưa chọn size
        if (selectedColor) {
            // Tìm stock theo màu sắc
            const colorStock = stockData.find(item =>
                item.color_id?.title === selectedColor
            );

            if (!colorStock) {
                return 'out-of-stock'; // Không có stock cho màu này
            }

            if (parseInt(colorStock.stock) === 0) {
                return 'out-of-stock';
            }

            return 'in-stock';
        }

        // Nếu chỉ chọn size (và sản phẩm có size)
        if (selectedSize && hasSize) {
            const sizeStocks = stockData.filter(item => item.size_id?.title === selectedSize);
            const hasSizeStock = sizeStocks.some(item => parseInt(item.stock) > 0);
            return hasSizeStock ? 'in-stock' : 'out-of-stock';
        }

        // Nếu chưa chọn màu hoặc size, kiểm tra tổng quan
        const hasAnyStock = stockData.some(item => parseInt(item.stock) > 0);
        return hasAnyStock ? 'in-stock' : 'out-of-stock';
    }, [stockData, selectedColor, selectedSize, product.size_id]);

    // Lấy thông tin stock chi tiết
    const getStockInfo = useMemo(() => {
        if (!stockData || stockData.length === 0) {
            return { message: 'Sắp ra mắt', type: 'coming-soon' };
        }

        // Kiểm tra xem sản phẩm có size không
        const hasSize = product.size_id && product.size_id.length > 0;

        if (selectedColor && selectedSize && hasSize) {
            const currentStock = stockData.find(item =>
                item.size_id?.title === selectedSize
            );

            if (!currentStock) {
                return { message: 'Hết hàng cho size này', type: 'out-of-stock' };
            }

            if (parseInt(currentStock.stock) === 0) {
                return { message: 'Hết hàng', type: 'out-of-stock' };
            }

            return { message: `Còn ${currentStock.stock} sản phẩm`, type: 'in-stock' };
        }

        // Nếu sản phẩm không có size hoặc chưa chọn size
        if (selectedColor) {
            const colorStock = stockData.find(item =>
                item.color_id?.title === selectedColor
            );

            if (!colorStock) {
                return { message: 'Hết hàng cho màu này', type: 'out-of-stock' };
            }

            if (parseInt(colorStock.stock) === 0) {
                return { message: 'Hết hàng', type: 'out-of-stock' };
            }

            return { message: `Còn ${colorStock.stock} sản phẩm`, type: 'in-stock' };
        }

        // Nếu chỉ chọn size (và sản phẩm có size)
        if (selectedSize && hasSize) {
            const sizeStocks = stockData.filter(item => item.size_id?.title === selectedSize);
            const totalSizeStock = sizeStocks.reduce((sum, item) => sum + parseInt(item.stock || 0), 0);

            if (totalSizeStock === 0) {
                return { message: 'Hết hàng cho size này', type: 'out-of-stock' };
            }

            return { message: `Còn ${totalSizeStock} sản phẩm cho size này`, type: 'in-stock' };
        }

        // Kiểm tra tổng quan
        const totalStock = stockData.reduce((sum, item) => sum + parseInt(item.stock || 0), 0);
        if (totalStock === 0) {
            return { message: 'Hết hàng', type: 'out-of-stock' };
        }

        return { message: `Còn ${totalStock} sản phẩm`, type: 'in-stock' };
    }, [stockData, selectedColor, selectedSize, product.size_id]);

    const handleImageClick = (index) => {
        console.log('Thumbnail clicked:', index); // Debug log
        setSelectedImage(index);
    };

    // Tạo mảng ảnh hoàn chỉnh bao gồm ảnh chính và ảnh phụ
    const allImages = useMemo(() => {
        const images = [];

        // Thêm ảnh chính nếu có
        if (product.image) {
            images.push({
                filename_disk: product.image.filename_disk,
                isMain: true
            });
        }

        // Thêm ảnh phụ nếu có
        if (productImages[0]?.images) {
            productImages[0].images.forEach(image => {
                images.push({
                    filename_disk: image.directus_files_id?.filename_disk,
                    isMain: false
                });
            });
        }

        return images;
    }, [product.image, productImages]);

    // Logic cho nút navigation
    const maxVisibleThumbnails = 4; // Số ảnh hiển thị tối đa
    const visibleThumbnails = allImages.slice(thumbnailStartIndex, thumbnailStartIndex + maxVisibleThumbnails);

    const canScrollUp = thumbnailStartIndex > 0;
    const canScrollDown = thumbnailStartIndex + maxVisibleThumbnails < allImages.length;

    const handleThumbnailUp = (e) => {
        e.stopPropagation(); // Ngăn event bubbling
        if (canScrollUp) {
            setThumbnailStartIndex(prev => prev - 1);
        }
    };

    const handleThumbnailDown = (e) => {
        e.stopPropagation(); // Ngăn event bubbling
        if (canScrollDown) {
            setThumbnailStartIndex(prev => prev + 1);
        }
    };

    // Reset selectedImage khi ảnh thay đổi
    useEffect(() => {
        setSelectedImage(0);
        setThumbnailStartIndex(0);
    }, [allImages.length]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await getDetailItemById(id);
                console.log(data);
                setProduct(data[0]);
                if (data.color_id && data.color_id.length > 0) {
                    setSelectedColor(data.color_id[0].color_of_product_id.title);
                }
                setLoading(false);
            } catch (err) {
                setError('Có lỗi xảy ra khi tải thông tin sản phẩm');
                setLoading(false);
            }
            const fetchMoreImage = async () => {
                const data = await getMoreImage(id);
                console.log(data);
                setProductImages(data);
            }
            fetchMoreImage();
        };
        fetchProduct();

        const fetchRelatedProducts = async () => {
            try {
                const response = await getItemByCollection(pageInfor.title);

                if (isMounted.current && response?.data?.collection?.[0]?.product_id) {
                    const processedProducts = response.data.collection[0].product_id
                        .filter(item => item.Products_id.ma_san_pham !== id) // Loại bỏ sản phẩm hiện tại
                        .map(item => ({
                            ...item.Products_id,
                            name_collection: pageInfor.title,
                            image: item.Products_id.image || { filename_disk: 'default-product.jpg' }
                        }));
                    setRelatedProducts(processedProducts);
                }
            } catch (error) {
                if (isMounted.current) {
                    console.error('Error fetching related products:', error);
                }
            }
        };
        fetchRelatedProducts();
        const fetchStockItem = async () => {
            try {
                const response = await getStockById(id);
                console.log('Stock data:', response);
                setStockData(response);
            }
            catch (error) {
                console.error('Error fetching stock item:', error);
            }
        };
        fetchStockItem();
    }, [id, pageInfor.title]);
    const originalPrice = product?.original_price || (product?.price ? Math.round(product.price * 1.43) : 0);
    const discount = product ? originalPrice - product.price : 0;


    const handleQuantityChange = (value) => {
        const newQuantity = Math.max(1, Math.min(10, value));
        setQuantity(newQuantity);
    };

    const handleColorSelect = (colorTitle) => {
        setSelectedColor(colorTitle);
    };

    // Kiểm tra hết hàng tổng quát cho mọi trường hợp
    const isOutOfStock = useMemo(() => {
        if (!selectedColor) return true;
        // Không có size: kiểm tra stock theo màu
        if (!product.size_id || product.size_id.length === 0) {
            const colorStock = stockData.find(item => item.color_id?.title === selectedColor);
            return !colorStock || parseInt(colorStock.stock) === 0;
        }
        // Có size: kiểm tra stock theo màu + size
        if (selectedColor && selectedSize) {
            const stockItem = stockData.find(item =>
                item.color_id?.title === selectedColor &&
                item.size_id?.title === selectedSize
            );
            return !stockItem || parseInt(stockItem.stock) === 0;
        }
        // Nếu chưa chọn size thì cũng coi là hết hàng
        return true;
    }, [product.size_id, selectedColor, selectedSize, stockData]);

    const handleAddToCart = () => {
        if (isOutOfStock) {
            alert('Sản phẩm đã hết hàng!');
            return;
        }

        const cartItem = {
            id: `${product.ma_san_pham}_${selectedColor}_${selectedSize}`,
            productId: product.ma_san_pham,
            name: product.name,
            price: product.price,
            size: selectedSize || null,
            quantity: quantity,
            color: selectedColor || null,
            image: product.image.filename_disk,
            ma_san_pham: product.ma_san_pham,
            type: product.type || 'Vợt Pick',
            material: product.Material || 'Carbon Fiber'
        };

        addToCart(cartItem);
        alert('Đã thêm sản phẩm vào giỏ hàng!');
    };

    const handleBuyNow = () => {
        if (isOutOfStock) {
            alert('Sản phẩm đã hết hàng!');
            return;
        }

        // Lưu vào giỏ hàng
        handleAddToCart();

        // Cập nhật lại số lượng trên icon
        updateCartCount();

        // Chuyển hướng đến trang thanh toán
        navigate('/checkout');
    };

    const openSizeGuide = () => setIsSizeGuideOpen(true);
    const closeSizeGuide = () => setIsSizeGuideOpen(false);

    const handleOrderSuccess = () => {
        // Xóa giỏ hàng trong localStorage (nếu có)
        localStorage.removeItem('cartItems');
        // Xóa giỏ hàng trong context
        clearCart();
        // Cập nhật lại số lượng trên icon
        updateCartCount();
        // Chuyển hướng sang trang thành công
        navigate('/order-success');
    };

    // Render trạng thái stock
    const renderStockStatus = () => {
        const stockInfo = getStockInfo;

        switch (stockInfo.type) {
            case 'out-of-stock':
                return <div className="stock-status out-of-stock">{stockInfo.message}</div>;
            case 'coming-soon':
                return <div className="stock-status coming-soon">{stockInfo.message}</div>;
            case 'in-stock':
                return <div className="stock-status in-stock">{stockInfo.message}</div>;
            default:
                return null;
        }
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
        <>
            <Breadcrumb items={breadcrumbItems} />
            <div className="product-detail-page">
                <div className="container">
                    <div className="product-detail-row">
                        <div className="product-detail-col">
                            <div className="product-gallery">
                                <div className="thumbnail-container">
                                    <div className="thumbnail-images">
                                        {visibleThumbnails.map((image, index) => {
                                            const actualIndex = thumbnailStartIndex + index;
                                            return (
                                                <div
                                                    key={actualIndex}
                                                    className={`thumbnail-item ${selectedImage === actualIndex ? 'active' : ''}`}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleImageClick(actualIndex);
                                                    }}
                                                    onMouseDown={(e) => e.preventDefault()}
                                                >
                                                    <img
                                                        src={`http://localhost:8055/assets/${image.filename_disk}`}
                                                        alt={`${product.name} - Ảnh ${actualIndex + 1}`}
                                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                        draggable={false} // Ngăn drag ảnh
                                                    />
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div className="thumbnail-navigation">
                                        <button
                                            className="thumbnail-btn"
                                            onClick={handleThumbnailUp}
                                            disabled={!canScrollUp}
                                            onMouseDown={(e) => e.stopPropagation()}
                                        >
                                            ^
                                        </button>
                                        <button
                                            className="thumbnail-btn"
                                            onClick={handleThumbnailDown}
                                            disabled={!canScrollDown}
                                            onMouseDown={(e) => e.stopPropagation()}
                                        >
                                            v
                                        </button>
                                    </div>
                                </div>
                                <div className="main-image">
                                    <img
                                        src={`http://localhost:8055/assets/${allImages[selectedImage]?.filename_disk}`}
                                        alt={product.name}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </div>
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
                                    <span className="product-price">{product.price}₫</span>
                                </div>
                                {/* Hiển thị trạng thái stock */}
                                {renderStockStatus()}

                                <div className="product-attributes">
                                    <div className="product-colors">
                                        <h3>Màu sắc</h3>
                                        <div className="color-options">
                                            {product.color_id?.map((color) => {
                                                // Tính stock cho màu này
                                                const colorStock = stockData?.find(item =>
                                                    item.color_id?.title === color.color_of_product_id.title
                                                );
                                                const stockCount = colorStock ? parseInt(colorStock.stock || 0) : 0;

                                                return (
                                                    <div
                                                        key={color.color_of_product_id.id}
                                                        className={`color-option ${selectedColor === color.color_of_product_id.title ? 'selected' : ''} ${stockCount === 0 ? 'out-of-stock' : ''}`}
                                                        onClick={() => {
                                                            if (stockCount > 0) {
                                                                setSelectedColor(color.color_of_product_id.title);
                                                            }
                                                        }}
                                                        style={{ backgroundColor: color.color_of_product_id.title.toLowerCase() }}
                                                        title={`${color.color_of_product_id.title} - Còn ${stockCount} sản phẩm`}
                                                    >
                                                        {stockCount === 0 && <span className="stock-badge">Hết</span>}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                    <div className="product-quantity">
                                        <h3>Số lượng</h3>
                                        <div className="quantity-controls">
                                            <button
                                                className="quantity-btn"
                                                onClick={() => handleQuantityChange(quantity - 1)}
                                                disabled={quantity <= 1 || isOutOfStock}
                                            >
                                                -
                                            </button>
                                            <span className="quantity-display">{quantity}</span>
                                            <button
                                                className="quantity-btn"
                                                onClick={() => handleQuantityChange(quantity + 1)}
                                                disabled={quantity >= 10 || isOutOfStock}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    {/* Chỉ hiển thị phần size nếu sản phẩm có size */}
                                    {product.size_id && product.size_id.length > 0 && (
                                        <div className="product-sizes">
                                            <div className="size-header">
                                                <h3>Kích thước</h3>
                                                <button className="size-guide-btn" onClick={openSizeGuide}>
                                                    Hướng dẫn chọn size
                                                </button>
                                            </div>
                                            <div className="size-options">
                                                {product.size_id?.map((size) => {
                                                    // Tính stock cho size này
                                                    const sizeStock = stockData?.filter(item =>
                                                        item.size_id?.title === size.product_size_id.title
                                                    ).reduce((sum, item) => {
                                                        return sum + parseInt(item.stock || 0);
                                                    }, 0) || 0;

                                                    return (
                                                        <div
                                                            key={size.product_size_id.id}
                                                            className={`size-option ${selectedSize === size.product_size_id.title ? 'selected' : ''} ${sizeStock === 0 ? 'out-of-stock' : ''}`}
                                                            onClick={() => {
                                                                if (sizeStock > 0) {
                                                                    setSelectedSize(size.product_size_id.title);
                                                                }
                                                            }}
                                                            title={`${size.product_size_id.title} - Còn ${sizeStock} sản phẩm`}
                                                        >
                                                            {size.product_size_id.title}
                                                            {sizeStock === 0 && <span className="stock-badge">Hết</span>}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="product-actions">
                                    <button
                                        className={`add-to-cart-btn ${isOutOfStock ? 'disabled' : ''}`}
                                        onClick={handleAddToCart}
                                        disabled={isOutOfStock}
                                    >
                                        {isOutOfStock ? 'Hết hàng' : 'Thêm vào giỏ hàng'}
                                    </button>
                                    <button
                                        className={`buy-now-btn ${isOutOfStock ? 'disabled' : ''}`}
                                        onClick={handleBuyNow}
                                        disabled={isOutOfStock}
                                    >
                                        {isOutOfStock ? 'Hết hàng' : 'Mua ngay'}
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
                                <div
                                    className="product-related-item"
                                    key={product.ma_san_pham}
                                    onClick={() => navigate(`/collection/${path}/${product.ma_san_pham}`)}
                                >
                                    <img
                                        src={`http://localhost:8055/assets/${product.image?.filename_disk}`}
                                        alt={product.name || 'Product image'}
                                        className="product-related-img"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = 'https://theme.hstatic.net/1000312752/1001368650/14/slideshow_4.jpg?v=68';
                                        }}
                                    />
                                    <div className="product-related-name">{product.name}</div>
                                    <div className="product-related-price">
                                        {product.price}₫
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <SizeGuideModal
                    isOpen={isSizeGuideOpen}
                    onClose={closeSizeGuide}
                />
            </div>
        </>
    );
}
