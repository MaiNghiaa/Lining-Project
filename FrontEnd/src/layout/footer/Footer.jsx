import React from 'react'
import './footer.css'
export default function Footer() {
  return (
    <footer>
      <div className="ega_footer">
        <div className="container" style={{ backgroundColor: 'transparent' }}>
          <div className="ega_list">
            <div className="ega_item">
              <div className="ega_title">
                <p className="ega_tit">LI-NING DISTRIBUTOR IN VIET NAM</p>
              </div>
              <ul>
                <li className="ega_h2">GIỚI THIỆU</li>
                <li className="ega_h2">HỆ THỐNG CỬA HÀNG</li>
                <li className="ega_h2">THÔNG TIN LIÊN HỆ</li>
              </ul>
            </div>
            <div className="ega_item">
              <div className="ega_title">
                <p className="ega_tit">CHÍNH SÁCH BÁN HÀNG</p>
              </div>
              <ul>
                <li className="ega_h2">BẢO MẬT</li>
                <li className="ega_h2">THANH TOÁN</li>
                <li className="ega_h2">VẬN CHUYỂN</li>
                <li className="ega_h2">ĐỔI TRẢ HÀNG MUA ONLINE</li>
                <li className="ega_h2">ĐỔI TRẢ HÀNG MUA TẠI CỬA HÀNG</li>
              </ul>
            </div>
            <div className="ega_item">
              <div className="ega_title">
                <p className="ega_tit">HỖ TRỢ KHÁCH HÀNG</p>
              </div>
              <ul>
                <li className="ega_h2">ĐIỀU KHOẢN DỊCH VỤ</li>
                <li className="ega_h2">HƯỚNG DẪN MUA HÀNG</li>
                <li className="ega_h2">HƯỚNG DẪN ĐO SIZE VÀ BẢO QUẢN</li>
                <li className="ega_h2">HƯỚNG DẪN THANH TOÁN</li>
              </ul>
            </div>
            <div className="ega_item">
              <div className="ega_title">
                <p className="ega_tit">NEWSLETTER</p>
              </div>
              <ul>
                <li className="ega_h2">Đăng ký nhận bản tin để cập nhật những tin tức mới nhất về Li-Ning Distributor in Vietnam</li>
              </ul>
            </div>
          </div>
          <div className="ega_footer_bottom">
            <div className="ega_footer_bottom_item">
              <span className='ega_footer_bottom_text'>Li-Ning Distributor in Vietnam</span>
            </div>
            <div className="ega_footer_bottom_item">
              <span className='ega_footer_bottom_text'>Hotline : 1900633083 | info.liningvn@gmail.com</span>
            </div>

            <div className="ega_footer_bottom_item">
              <span className='ega_footer_bottom_text'>Địa Chỉ : T2, Khối DVTM, Tòa Handiresco, 31 Lê Văn Lương, Phường Nhân Chính, Quận Thanh Xuân, Thành Phố Hà Nội, Việt Nam</span>

            </div>
            <div className="ega_footer_bottom_item">
              <span className='ega_footer_bottom_text'>MST/ĐKKD/QĐTL: 0106129772</span>
            </div>
            <div className="ega_footer_bottom_item" >
              <span className='ega_footer_bottom_text'>© Bản quyền thuộc về</span>
              <a href="#" className="navigate_link_ega_text" >
                {" "}Li-Ning Distributor in Vietnam
              </a>
              <span className='ega_footer_bottom_text'>{" | "}</span>
              <a href="#" className="navigate_link_ega_text">
                Powered by Haravan
              </a>
            </div>
          </div>
        </div>
      </div>

    </footer>

  )
}
