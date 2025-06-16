import React from "react";
import Header from "../../layout/header/Header";
import "./collection.css";
export default function Collection() {
  return (
    <div>
      <Header />
      <main className="main">
        <div className="container">
          <div className="collection_wrapper">
            <div className="collect_inner">
              <div className="ega_left">
                <img
                  src="./images/collection/20.webp"
                  alt="isacc"
                  style={{ width: "100%" }}
                />
              </div>
              <div className="ega_right">
                <div className="collection_banner">
                  <img
                    src="./images/collection/20.webp"
                    alt="isacc"
                    style={{ width: "100%", marginBottom: "20px" }}
                  />
                </div>
                <div className="title">
                  <div className="title_left">
                    <p>Thể Thao</p>
                  </div>
                  <div className="title_right">
                      <p className="sxep">Sắp xếp theo:</p>
                      <select id="sortby__wrap" name="sortby__wrap">
                      <option value="manual">Sản phẩm nổi bật</option>
                        <option value="price-ascending">Giá: Tăng dần</option>
                        <option value="price-descending">Giá: Giảm dần</option>
                        <option value="title-ascending">Tên: A-Z</option>
                        <option value="title-descending">Tên: Z-A</option>
                        <option value="created-ascending">Cũ nhất</option>
                        <option value="created-descending">Mới nhất</option>
                        <option value="best-selling">Bán chạy nhất</option>
                      </select>
                  </div>
                </div>
                <div className="wrapper">
                  <div className="wrapper_list">
                    <div className="wrapper_item">
                      <div className="wrapper_img">
                        <img
                          src="./images/collection/xx_02063_982b9d5f44c546ba89487d3771fe8472.webp"
                          alt=""
                          style={{ width: "100%" }}
                        />
                      </div>
                      <div className="tensanpham">
                        <p>Giày chạy bộ SUPER</p>
                      </div>
                      <p>
                        <span> 1.500.000đ</span>
                      </p>
                    </div>
                    <div className="wrapper_item">
                      <div className="wrapper_img">
                        <img
                          src="./images/collection/xx_02063_982b9d5f44c546ba89487d3771fe8472.webp"
                          alt=""
                          style={{ width: "100%" }}
                        />
                      </div>
                      <div className="tensanpham">
                        <p>Giày chạy bộ SUPER</p>
                      </div>
                      <p>
                        <span> 1.500.000đ</span>
                      </p>
                    </div>
                    <div className="wrapper_item">
                      <div className="wrapper_img">
                        <img
                          src="./images/collection/xx_02063_982b9d5f44c546ba89487d3771fe8472.webp"
                          alt=""
                          style={{ width: "100%" }}
                        />
                      </div>
                      <div className="tensanpham">
                        <p>Giày chạy bộ SUPER</p>
                      </div>
                      <p>
                        <span> 1.500.000đ</span>
                      </p>
                    </div>
                    <div className="wrapper_item">
                      <div className="wrapper_img">
                        <img
                          src="./images/collection/xx_02063_982b9d5f44c546ba89487d3771fe8472.webp"
                          alt=""
                          style={{ width: "100%" }}
                        />
                      </div>
                      <div className="tensanpham">
                        <p>Giày chạy bộ SUPER</p>
                      </div>
                      <p>
                        <span> 1.500.000đ</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
