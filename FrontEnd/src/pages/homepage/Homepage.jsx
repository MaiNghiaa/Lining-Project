import React, { useState, useEffect } from "react";
import "./homepage.css";
import { Link } from "react-router-dom";

export default function Homepage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  const itemsPerGroup = 7;

  const slides = [
    {
      id: 1,
      image: 'http://theme.hstatic.net/1000312752/1001368650/14/slideshow_2.jpg?v=68',
    },
    {
      id: 2,
      image: 'http://theme.hstatic.net/1000312752/1001368650/14/slideshow_3.jpg?v=68',
    },
    {
      id: 3,
      image: 'http://theme.hstatic.net/1000312752/1001368650/14/slideshow_4.jpg?v=68',
    },
  ];

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

  const itemsNav = [
    {
      id: 1,
      name: "PICKLEBALL",
      iamge: "https://theme.hstatic.net/1000312752/1001368650/14/groupbuy_1_img_large.jpg?v=68",
    },

    {
      id: 2,
      name: "Chạy Bộ",
      iamge: "https://theme.hstatic.net/1000312752/1001368650/14/groupbuy_4_img_large.jpg?v=68",
    },
    {
      id: 3,
      name: "Traning",
      iamge: "https://theme.hstatic.net/1000312752/1001368650/14/groupbuy_6_img_large.jpg?v=68",
    },
    {
      id: 4,
      name: "Bóng rổ",
      iamge: "https://theme.hstatic.net/1000312752/1001368650/14/groupbuy_7_img_large.jpg?v=68",
    },
    {
      id: 5,
      name: "Cầu lông",
      iamge: "https://theme.hstatic.net/1000312752/1001368650/14/groupbuy_8_img_large.jpg?v=68",
    },
    {
      id: 6,
      name: "Bóng Đá",
      iamge: "https://theme.hstatic.net/1000312752/1001368650/14/groupbuy_10_img_large.jpg?v=68",
    },
    {
      id: 7,
      name: "Bóng bàn",
      iamge: "https://theme.hstatic.net/1000312752/1001368650/14/groupbuy_11_img_large.jpg?v=68",
    },
  ];
  const hinhanhnoibat = [
    {
      img: "https://file.hstatic.net/1000312752/article/2_cdf9066abcad4d319fec552b1469a54d_medium.jpg",
    },
    {
      img: "https://file.hstatic.net/1000312752/article/img_8901_68eef96b153d4664a433520aeb81039f_medium.jpg",
    },
    {
      img: "https://file.hstatic.net/1000312752/article/img_0875_55cfc2ffb2904c2bbc4222a499901409_medium.jpg",
    },
    {
      img: "https://file.hstatic.net/1000312752/article/img_1306_a89ae558f9544551a6942718fe24b964_medium.jpg",
    },
    {
      img: "https://file.hstatic.net/1000312752/article/_mg_8369_21c01fa501324c028fa35b4f3880e7ba_medium.jpg",
    },
    {
      img: "https://file.hstatic.net/1000312752/article/1202a426.1001_d34891be2a0e494898c3c9e6592dee91_medium.jpg",
    },
    {
      img: "https://file.hstatic.net/1000312752/article/1202a426.1002_cfd3a2fd3678448da7cb476786033450_medium.jpg",
    },
    {
      img: "https://file.hstatic.net/1000312752/article/_nam7405_54d16093623f4016b8478b34f6b79fb0_medium.jpg",
    },
    {
      img: "https://file.hstatic.net/1000312752/article/marius_kimutai_-_1st__2.05.06__marato_barcelona_f0dd8d2ea127461b89ee054f3cd333e3_medium.jpg",
    },
    {
      img: "https://file.hstatic.net/1000312752/article/3q7a3063_6d307dd7160d4b7384cd55701afd54bd_medium.jpg",
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

  return (
    <>
      <main className="main">
        <div className="slideshow-container">
          <div className="slideshow">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`slide ${index === currentSlide ? 'active' : ''}`}
              >
                <img src={slide.image} alt={`Slide ${slide.id}`} />
              </div>
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
                <div className="groupbuy-item" key={item.id}>
                  <img
                    src={item.iamge}
                    alt={item.name}
                    className="groupbuy-item-img"
                    style={{ minWidth: 95, width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
              ))}
            </div>
            <button className="nav-btn next" onClick={handleNextGroup}>
              {">"}
            </button>
          </div>
        </div>


        {/* Flash sale */}
        <div className="flash-sale-wrapper">
          <a href="https://lining.com.vn/collections/pickleball" className="hover-zoom" title="PICKLEBALL">
            <img alt="flashsale_img.jpg" onerror="this.style.display ='none'" className="lazyloaded" src="//theme.hstatic.net/1000312752/1001368650/14/flashsale_img.jpg?v=68" data-src="//theme.hstatic.net/1000312752/1001368650/14/flashsale_img.jpg?v=68" />
          </a>
        </div>


        {/* Video */}
        <div className="video-section">
          <div className="container">
            <div className="video-wrapper">
              <iframe
                src="https://www.youtube.com/embed/qdvT0n1pxOc?autoplay=0&controls=1&disablekb=0&playsinline=1&cc_load_policy=0&cc_lang_pref=auto&widget_referrer=https%3A%2F%2Flining.com.vn%2F&rel=0&showinfo=1&iv_load_policy=3&modestbranding=1&customControls=true&noCookie=false&enablejsapi=1&origin=https%3A%2F%2Flining.com.vn&widgetid=1&forigin=https%3A%2F%2Flining.com.vn%2F&aoriginsup=1&gporigin=https%3A%2F%2Flining.com.vn%2Fsearch%3Ftype%3Dproduct%26q%3Dqu%25E1%25BA%25A7n&vf=1"
                title="Lining Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="video-frame"
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
                <div className="readytowear-items pd-item">
                  <div
                    className="readytowear-img"
                    style={{ width: 255, height: 255 }}
                  >
                    <img
                      src="https://product.hstatic.net/1000312752/product/cdf10ca566464ae3a32fea53a1633bb5c9e14993783480a92007f3b38624078f777ed3_3a339d23d91c44e08fbbc9007cbd7a1d.jpg"
                      alt
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div className="readytowear-desc">
                    <h3 style={{ margin: "10px 0px" }}>
                      Áo T-Shirt nữ ATST792-3V
                    </h3>
                    <p
                      style={{
                        paddingBottom: 10,
                        color: "#c54934",
                        fontWeight: 600,
                      }}
                    >
                      608,727₫
                    </p>
                  </div>
                </div>
                <div className="readytowear-items pd-item">
                  <div
                    className="readytowear-img"
                    style={{ width: 255, height: 255 }}
                  >
                    <img
                      src="https://product.hstatic.net/1000312752/product/cdf10ca566464ae3a32fea53a1633bb5c9e14993783480a92007f3b38624078f777ed3_3a339d23d91c44e08fbbc9007cbd7a1d.jpg"
                      alt
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div className="readytowear-desc">
                    <h3 style={{ margin: "10px 0px" }}>
                      Áo T-Shirt nữ ATST792-3V
                    </h3>
                    <p
                      style={{
                        paddingBottom: 10,
                        color: "#c54934",
                        fontWeight: 600,
                      }}
                    >
                      608,727₫
                    </p>
                  </div>
                </div>
                <div className="readytowear-items pd-item">
                  <div
                    className="readytowear-img"
                    style={{ width: 255, height: 255 }}
                  >
                    <img
                      src="https://product.hstatic.net/1000312752/product/cdf10ca566464ae3a32fea53a1633bb5c9e14993783480a92007f3b38624078f777ed3_3a339d23d91c44e08fbbc9007cbd7a1d.jpg"
                      alt
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div className="readytowear-desc">
                    <h3 style={{ margin: "10px 0px" }}>
                      Áo T-Shirt nữ ATST792-3V
                    </h3>
                    <p
                      style={{
                        paddingBottom: 10,
                        color: "#c54934",
                        fontWeight: 600,
                      }}
                    >
                      608,727₫
                    </p>
                  </div>
                </div>
                <div className="readytowear-items pd-item">
                  <div
                    className="readytowear-img"
                    style={{ width: 255, height: 255 }}
                  >
                    <img
                      src="https://product.hstatic.net/1000312752/product/cdf10ca566464ae3a32fea53a1633bb5c9e14993783480a92007f3b38624078f777ed3_3a339d23d91c44e08fbbc9007cbd7a1d.jpg"
                      alt
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div className="readytowear-desc">
                    <h3 style={{ margin: "10px 0px" }}>
                      Áo T-Shirt nữ ATST792-3V
                    </h3>
                    <p
                      style={{
                        paddingBottom: 10,
                        color: "#c54934",
                        fontWeight: 600,
                      }}
                    >
                      608,727₫
                    </p>
                  </div>
                </div>

              </div>
              <div
                style={{
                  marginTop: 20,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <button className="btn1">Xem thêm</button>
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
                {hinhanhnoibat.map((item, index) => {
                  return (
                    <div className="blog-review-items" key={index}>
                      <div
                        className="blog-review-img"
                        style={{ width: "100%", height: "200px" }}
                      >
                        <img
                          src={item.img}
                          alt
                          style={{
                            width: "100%",
                            height: 200,
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
        <div className="homeblog">
          <div
            className="container"
            style={{ backgroundColor: "transparent" }}
          >
            <div className="homeblog_title">
              <h2 className="cnsp_title title--line"> TIN TỨC SẢN PHẨM
              </h2>
            </div>
            <div className="homeblog_wapper">
              <div className="homeblog_list">
                <div className="homeblog_item">
                  <div className="homeblog_img" style={{}}>
                    <img
                      src="https://file.hstatic.net/1000312752/article/pop-up_bbf3597f6fbc46e1b00c96918e2c3cb8_large.png"
                      alt="homeblog-item-img"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div className="text-item-homelog">
                    <p
                      style={{
                        fontSize: 20,
                        lineHeight: "1.5",
                        marginBottom: 8,
                      }}
                    >
                      CHITU 8/CHITU 8 PRO – MỘT ĐÔI GIÀY, MỌI HÀNH TRÌNH
                    </p>
                    <h2 style={{ fontSize: 16, lineHeight: "1.5" }}>
                      Ra mắt phiên bản 2025 – CHITU 8 và CHITU 8 PRO!🌟 Một lựa chọn...
                    </h2>
                  </div>
                </div>
                <div className="homeblog_item">
                  <div className="homeblog_img" style={{}}>
                    <img
                      src="https://file.hstatic.net/1000312752/article/pop-up_bbf3597f6fbc46e1b00c96918e2c3cb8_large.png"
                      alt="homeblog-item-img"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div className="text-item-homelog">
                    <p
                      style={{
                        fontSize: 20,
                        lineHeight: "1.5",
                        marginBottom: 8,
                      }}
                    >
                      SUPER LIGHT – RA MẮT PHIÊN BẢN 22 HOÀN TOÀN MỚI
                    </p>
                    <h2 style={{ fontSize: 16, lineHeight: "1.5" }}>Super Light trở lại với phiên bản 22 cùng công nghệ và thiết kế khác...</h2>
                  </div>
                </div>
                <div className="homeblog_item">
                  <div className="homeblog_img" style={{}}>
                    <img
                      src="https://file.hstatic.net/1000312752/article/pop-up_bbf3597f6fbc46e1b00c96918e2c3cb8_large.png"
                      alt="homeblog-item-img"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div className="text-item-homelog">
                    <p
                      style={{
                        fontSize: 20,
                        lineHeight: "1.5",
                        marginBottom: 8,
                      }}
                    >
                      LI-NING RA MẮT SIÊU PHẨM GIÀY SOFT GO 2 KNIT: THIẾT KẾ
                    </p>
                    <h2 style={{ fontSize: 16, lineHeight: "1.5" }}>
                      [...]
                    </h2>
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                {/* const breadcrumbItems = [
                  { label: 'Blog', path: '/blogs/cong-nghe-san-pham' }
                ]; */}
                <Link to="/blogs/cong-nghe-san-pham" label="Blog" path="/blogs/cong-nghe-san-pham">
                  <button className="btn1" style={{ marginTop: 20 }}>Xem tất cả</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
