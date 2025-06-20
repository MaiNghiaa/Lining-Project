import React, { useState, useEffect } from "react";
import "./homepage.css";
import { Link, useNavigate } from "react-router-dom";
import { getFeaturedEvents, getNewArrival, getBannerBlog } from '../../services/blogService';
import getPageInfo from "../../utils/pageInfo";

const convertToPath = (name) => {
  const pathMap = {
    'Bóng rổ': 'bong-ro',
    'Bóng đá': 'bong-da',
    'Cầu lông': 'cau-long',
    'Golf': 'golf',
    'Wade': 'wade',
    'Badfive': 'badfive',
    'Lifestyle': 'lifestyle',
    'Issac': 'issac',
    'Pickleball': 'pickleball',
    'Chạy bộ': 'chay-bo',
    'Tập luyện': 'tap-luyen'
  };

  return pathMap[name];
};

export default function Homepage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  const itemsPerGroup = 7;
  const [newsEvents, setNewsEvents] = useState([]);
  const [eventsTechnology, setEventsTechnology] = useState([]);
  const [newArrival, setNewArrival] = useState([]);
  const [slides, setSlides] = useState([]);
  const navigate = useNavigate();

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : slides.length - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev < slides.length - 1 ? prev + 1 : 0));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      handleNextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    getFeaturedEvents("Sự kiện nổi bật").then(data => {
      setNewsEvents(data);
      console.log(data);
    });
    getFeaturedEvents("Công nghệ sản phẩm", 3).then(data => {
      setEventsTechnology(data);
      console.log(data);
    });
    getNewArrival().then(data => {
      setNewArrival(data);
      console.log(data);
    });

    getBannerBlog().then(data => {
      setSlides(data);
      console.log(data);
    });
  }, []);

  const itemsNav = [
    {
      id: 1,
      name: "PICKLEBALL",
      iamge: "https://theme.hstatic.net/1000312752/1001368650/14/groupbuy_1_img_large.jpg?v=68",
      path: 'pickleball'
    },

    {
      id: 2,
      name: "Chạy Bộ",
      iamge: "https://theme.hstatic.net/1000312752/1001368650/14/groupbuy_4_img_large.jpg?v=68",
      path: 'chay-bo'
    },
    {
      id: 3,
      name: "Traning",
      iamge: "https://theme.hstatic.net/1000312752/1001368650/14/groupbuy_6_img_large.jpg?v=68",
      path: 'tap-luyen'
    },
    {
      id: 4,
      name: "Bóng rổ",
      iamge: "https://theme.hstatic.net/1000312752/1001368650/14/groupbuy_7_img_large.jpg?v=68",
      path: 'bong-ro'
    },
    {
      id: 5,
      name: "Cầu lông",
      iamge: "https://theme.hstatic.net/1000312752/1001368650/14/groupbuy_8_img_large.jpg?v=68",
      path: 'cau-long'
    },
    {
      id: 6,
      name: "Bóng Đá",
      iamge: "https://theme.hstatic.net/1000312752/1001368650/14/groupbuy_10_img_large.jpg?v=68",
      path: 'bong-da'
    },
    {
      id: 7,
      name: "Bóng bàn",
      iamge: "https://theme.hstatic.net/1000312752/1001368650/14/groupbuy_11_img_large.jpg?v=68",
      path: 'golf'
    },
  ];

  const handlePrevGroup = () => {
    setCurrentGroupIndex((prev) =>
      prev > 0 ? prev - 1 : Math.ceil(itemsNav.length / itemsPerGroup) - 1
    );
  };

  const handleNextGroup = () => {
    setCurrentGroupIndex((prev) =>
      prev < Math.ceil(itemsNav.length / itemsPerGroup) - 1 ? prev + 1 : 0
    );
  };

  const getCurrentGroup = () => {
    const start = currentGroupIndex * itemsPerGroup;
    return itemsNav.slice(start, start + itemsPerGroup);
  };

  const handleProductClick = (item) => {
    if (!item) return;
    console.log(item);

    navigate(`/collection/${convertToPath(item.name_collection)}/${item.ma_san_pham}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const collections = await getNewArrival();
        // Lấy tất cả sản phẩm từ tất cả collection và thêm tên collection
        const allProducts = collections.reduce((acc, collection) => {
          const products = collection.product_id.map(item => ({
            ...item.Products_id,
            name_collection: collection.title
          }));
          return [...acc, ...products];
        }, []);

        // Sắp xếp theo id (giả sử id càng lớn thì càng mới) và lấy 10 sản phẩm đầu tiên
        const sortedProducts = allProducts
          .sort((a, b) => b.id - a.id)
          .slice(0, 10);

        setNewArrival(sortedProducts);
      } catch (error) {
        console.error('Error fetching new arrivals:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <main className="main">
        <div className="slideshow-container">
          <div className="slideshow">
            {slides.map((slide, index) => (
              <Link to={`/blogs/${slide.type_id.link_title}/${slide.id}`}
                key={slide.id}
                className={`slide ${index === currentSlide ? 'active' : ''}`}
              >
                <img src={`http://localhost:8055/assets/${slide.image_cover.filename_disk}`} alt={`Slide ${slide.id}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </Link>
            ))}
            <button className="nav-btn prev" onClick={handlePrevSlide}>
              {"<"}
            </button>
            <button className="nav-btn next" onClick={handleNextSlide}>{">"}
            </button>
          </div>
        </div>

        {/* Group buy */}
        <div className="groupbuy">
          <div className="groupbuy-title">
            <h2 className="thethao-title title--line">MÔN THỂ THAO</h2>
          </div>
          <div className="groupbuy__wrapper">
            <button className="nav-btn prev" onClick={handlePrevGroup}>
              {"<"}
            </button>
            <div className="groupbuy-list">
              {getCurrentGroup().map((item) => (
                <Link
                  to={`/collection/${item.path}`}
                  key={item.id}
                >
                  <div className="groupbuy-item">
                    <img
                      src={item.iamge}
                      alt={item.name}
                      className="groupbuy-item-img"
                      style={{ minWidth: 95, width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                </Link>
              ))}
            </div>
            <button className="nav-btn next" onClick={handleNextGroup}>
              {">"}
            </button>
          </div>
        </div>


        {/* Flash sale */}
        <div className="flash-sale-wrapper">
          <a href="/collection/pickleball" className="hover-zoom" title="PICKLEBALL">
            <img
              alt="flashsale_img.jpg"
              onError={(e) => e.target.style.display = 'none'}
              className="lazyloaded"
              src="//theme.hstatic.net/1000312752/1001368650/14/flashsale_img.jpg?v=68"
              data-src="//theme.hstatic.net/1000312752/1001368650/14/flashsale_img.jpg?v=68"
            />
          </a>
        </div>


        {/* Video */}
        <div className="video-section">
          <div className="video-wrapper">
            <div className="video-frame">
              <iframe
                src="https://www.youtube.com/embed/qdvT0n1pxOc?autoplay=0&controls=1&disablekb=0&playsinline=1&cc_load_policy=0&cc_lang_pref=auto&widget_referrer=https%3A%2F%2Flining.com.vn%2F&rel=0&showinfo=1&iv_load_policy=3&modestbranding=1&customControls=true&noCookie=false&enablejsapi=1&origin=https%3A%2F%2Flining.com.vn&widgetid=1&forigin=https%3A%2F%2Flining.com.vn%2F&aoriginsup=1&gporigin=https%3A%2F%2Flining.com.vn%2Fsearch%3Ftype%3Dproduct%26q%3Dqu%25E1%25BA%25A7n&vf=1"
                title="Lining Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>

        {/* Ready to wear */}
        <div className="readytowear">
          <div className="container">
            <div className="readytowear-title">
              <h2 className="readytowear-title_h2 title--line">NEW ARRIVALS</h2>
            </div>
            <div className="readytowear__wrapper">
              <div className="readytowear-list">

                {newArrival.map((item, index) => {
                  return (
                    <div
                      className="readytowear-items pd-item"
                      key={index}
                      onClick={() => handleProductClick(item)}
                    >
                      <div className="readytowear-img">
                        <img
                          src={`http://localhost:8055/assets/${item.image?.filename_disk || 'default-product.jpg'}`}
                          alt={item.name || 'Product image'}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://theme.hstatic.net/1000312752/1001368650/14/slideshow_4.jpg?v=68';
                          }}
                        />
                      </div>
                      <div className="readytowear-desc">
                        <h3>
                          {item.name}
                        </h3>
                        <p>
                          {parseInt(item.price?.replace(/,/g, '')).toLocaleString('vi-VN')}₫
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="readytowear-button-wrapper">
                <button className="btn1" onClick={() => navigate('/collection/pickleball')}>Xem thêm</button>
              </div>
            </div>
          </div>
        </div>
        <div className="blog-review">
          <div className="container">
            <div className="blog-review-title">
              <h2 className="blog-review-title_h2 title--line">SỰ KIỆN NỔI BẬT
              </h2>
            </div>
            <div className="blog_review__grid">
              <div className="blog-review-list">
                {newsEvents.map((item, index) => {
                  return (
                    <Link to={`/blogs/${item.type_id.link_title}/${item.id}`} className="blog-review-items" key={index}>
                      <div
                        className="blog-review-img"
                        style={{ width: "100%", height: "200px" }}
                      >
                        <img
                          src={`http://localhost:8055/assets/${item.image_cover.filename_disk}`}
                          alt="blog-review-img"
                          style={{
                            width: "100%",
                            height: 200,
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
        <div className="homeblog">
          <div className="container">
            <div className="homeblog_title">
              <h2 className="cnsp_title title--line"> TIN TỨC SẢN PHẨM
              </h2>
            </div>
            <div className="homeblog_wapper">
              <div className="homeblog_list">

                {eventsTechnology.map((item, index) => {
                  return (
                    <Link to={`/blogs/cong-nghe-san-pham/${item.id}`} className="homeblog_item" key={index}>
                      <div className="homeblog_img">
                        <img
                          src={`http://localhost:8055/assets/${item.image_cover.filename_disk}`}
                          alt="homeblog-item-img"
                        />
                      </div>
                      <div className="text-item-homelog">
                        <p>
                          {item.title}
                        </p>
                        <h2>
                          {item.description}
                        </h2>
                      </div>
                    </Link>
                  );
                })}
              </div>
              <div className="homeblog-button-wrapper">
                <Link to="/blogs/cong-nghe-san-pham">
                  <button className="btn1">Xem tất cả</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
