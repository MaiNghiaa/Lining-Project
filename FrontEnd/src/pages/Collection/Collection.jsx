import React, { useEffect, useState, useRef } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import "./collection.css"; // import file css thường
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { getItemByCollection } from "../../services/blogService";
import getPageInfo from "../../utils/pageInfo";
import { collectionFilters } from "../../utils/filterCollection";
export default function Collection() {
  const [sort, setSort] = useState("featured");
  const [expandedFilters, setExpandedFilters] = useState({});
  const [selectedFilters, setSelectedFilters] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const { path } = useParams();
  const pageInfo = getPageInfo(path);
  const isMounted = useRef(true);

  const breadcrumbItems = [
    { label: 'Danh mục', path: '/collection' },
    { label: pageInfo.title, path: `/collection/${path}` }
  ];

  const toggleFilter = (filterName) => {
    setExpandedFilters(prev => ({
      ...prev,
      [filterName]: !prev[filterName]
    }));
  };

  const handleCheckboxChange = (filterName, value) => {
    setSelectedFilters(prev => {
      const currentFilters = prev[filterName] || [];
      if (currentFilters.includes(value)) {
        return {
          ...prev,
          [filterName]: currentFilters.filter(item => item !== value)
        };
      } else {
        return {
          ...prev,
          [filterName]: [...currentFilters, value]
        };
      }
    });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getItemByCollection(pageInfo.title);
        console.log("@@response", response);
        if (response?.data?.collection?.[0]?.product_id) {
          const processedProducts = response.data.collection[0].product_id.map(item => {
            const product = item.Products_id;
            return {
              id: product.id,
              name: product.name,
              price: parseFloat(product.price.replace(/,/g, '')),
              ma_san_pham: product.ma_san_pham,
              description: product.description,
              image: product.image,
              type: product.type_id?.[0]?.type_of_product_id?.collection_name || '',
              line: product.line_id?.[0]?.line_of_product_id?.title || '',
              size: product.size_id?.map(s => s.product_size_id?.title).filter(Boolean) || [],
              gender: product.gender_id?.map(g => g.product_gender_id?.title).filter(Boolean) || [],
              color: product.color_id?.map(c => c.color_of_product_id?.title).filter(Boolean) || []
            };
          });
          console.log("Processed products:", processedProducts);
          setProducts(processedProducts);
          setFilteredProducts(processedProducts);
        } else {
          console.log("No products found in response:", response);
        }
        setLoading(false);
      } catch (error) {
        if (isMounted.current) {
          console.error('Error fetching products:', error);
          setLoading(false);
        }
      }
    };

    setLoading(true);
    fetchProducts();

    return () => {
      isMounted.current = false;
    };
  }, [pageInfo.title]);

  useEffect(() => {
    const applyFilters = () => {
      let filtered = [...products];

      Object.entries(selectedFilters).forEach(([filterType, selectedValues]) => {
        if (selectedValues.length > 0) {
          filtered = filtered.filter(product => {
            switch (filterType) {
              case 'Loại Sản Phẩm':
                return selectedValues.includes(product.type);
              case 'Dòng Sản Phẩm':
                return selectedValues.includes(product.line);
              case 'Kích cỡ':
                return product.size.length === 0 || product.size.some(size => selectedValues.includes(size));
              case 'Màu sắc':
                return product.color.length === 0 || product.color.some(color => selectedValues.includes(color));
              case 'Giới Tính':
                return product.gender.length === 0 || product.gender.some(gender => selectedValues.includes(gender));
              default:
                return true;
            }
          });
        }
      });

      setFilteredProducts(filtered);
    };

    applyFilters();
  }, [selectedFilters, products]);

  console.log('Loading state:', loading);
  console.log('Products:', products);

  const sortProducts = (products) => {
    if (!Array.isArray(products)) return [];

    const sortedProducts = [...products];
    switch (sort) {
      case 'priceLowHigh':
        return sortedProducts.sort((a, b) => a.price - b.price);
      case 'priceHighLow':
        return sortedProducts.sort((a, b) => b.price - a.price);
      case 'nameAZ':
        return sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
      case 'nameZA':
        return sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
      case 'newest':
        return sortedProducts.sort((a, b) => new Date(b.date_created) - new Date(a.date_created));
      case 'oldest':
        return sortedProducts.sort((a, b) => new Date(a.date_created) - new Date(b.date_created));
      case 'featured':
      default:
        return sortedProducts;
    }
  };

  const sortedProducts = sortProducts(filteredProducts);

  const handleProductClick = (productId) => {
    navigate(`/collection/${path}/${productId}`);
  };

  // Get the appropriate filters based on the collection
  const getFiltersForCollection = () => {
    return collectionFilters[pageInfo.title] || collectionFilters.default;
  };

  if (loading) {
    return <div className="loading">Đang tải...</div>;
  }

  return (
    <div className="collection-page">
      {/* Breadcrumb */}
      <Breadcrumb items={breadcrumbItems} />
      <div className="container">
        <div className="category-content">
          {/* Sidebar Filter */}
          <div className="category-sidebar">
            <h2 className="sidebar-title">BỘ LỌC</h2>
            {Object.entries(getFiltersForCollection()).map(([filterName, options]) => (
              <div
                key={filterName}
                className={`filter-section ${expandedFilters[filterName] ? 'active' : ''}`}
              >
                <div
                  className="filter-header"
                  onClick={() => toggleFilter(filterName)}
                >
                  <span>{filterName}</span>
                  <span className="filter-icon">
                    {expandedFilters[filterName] ? '-' : '+'}
                  </span>
                </div>
                <div className="filter-options">
                  {options.map((option) => (
                    <label key={option} className="filter-option">
                      <input
                        type="checkbox"
                        checked={selectedFilters[filterName]?.includes(option)}
                        onChange={() => handleCheckboxChange(filterName, option)}
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Product List */}
          <div className="category-products">
            <div className="category-header">
              <h1 className="category-title">{pageInfo.title}</h1>
              <div className="sort-section">
                <label style={{ fontSize: "14px", color: "#000", lineHeight: "1.5" }}>Sắp xếp theo:</label>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="sort-select"
                >
                  <option value="priceLowHigh">Giá: Tăng dần</option>
                  <option value="priceHighLow">Giá: Giảm dần</option>
                  <option value="nameAZ">Tên: A-Z</option>
                  <option value="nameZA">Tên: Z-A</option>
                  <option value="oldest">Cũ nhất</option>
                  <option value="newest">Mới nhất</option>
                </select>
              </div>
            </div>

            <div className="products-grid">
              {sortedProducts.map((product) => (
                <div
                  key={product.id}
                  className="product-card"
                  onClick={() => handleProductClick(product.ma_san_pham)}
                >
                  <div className="product-image">
                    <img
                      src={`http://localhost:8055/assets/${product.image.filename_disk}`}
                      alt={product.name}
                    />
                  </div>
                  <div className="product-info">
                    <h3 style={{ fontSize: "16px", color: "#000", lineHeight: "1.4", height: "44px", overflow: "hidden", display: "-webkit-box", "-webkit-line-clamp": "2", "-webkit-box-orient": "vertical" }}>{product.name}</h3>
                    {/* <p className="product-code">Mã SP: {product.ma_san_pham}</p> */}
                    <p className="product-price" style={{ fontSize: "14px", color: "#000", lineHeight: "1.5" }}>{product.price.toLocaleString('vi-VN')}₫</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
