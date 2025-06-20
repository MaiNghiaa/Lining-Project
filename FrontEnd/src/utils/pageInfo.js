export default function getPageInfo(slug) {
  switch (slug) {
    case 'chay-bo':
      return {
        title: 'Chạy bộ',
        breadcrumbLabel: 'Chạy bộ'
      };
    case 'tap-luyen':
      return {
        title: 'Tập luyện',
        breadcrumbLabel: 'Tập luyện'
      };
    case 'bong-ro':
      return {
        title: 'Bóng rổ',
        breadcrumbLabel: 'Bóng rổ'
      };
    case 'bong-da':
      return {
        title: 'Bóng đá',
        breadcrumbLabel: 'Bóng đá'
      };
    case 'golf':
      return {
        title: 'Golf',
        breadcrumbLabel: 'Golf'
      };
    case 'pickleball':
      return {
        title: 'Pickleball',
        breadcrumbLabel: 'Pickleball'
      };
      case 'wade':
      return {
        title: 'WADE',
        breadcrumbLabel: 'WADE'
      };
      case 'badfive':
      return {
        title: 'BADFIVE',
        breadcrumbLabel: 'BADFIVE'
      };
      case 'lifestyles':
        return {
          title: 'LIFESTYLES',
          breadcrumbLabel: 'LIFESTYLES'
        };
      case 'isaac':
        return {
          title: 'ISAAC',
          breadcrumbLabel: 'ISAAC'
        };
        default:
      return {
        title: 'Cầu lông',
        breadcrumbLabel: 'Cầu lông'
      };

      case 'tin-tuc-su-kien':
        return {
            title: 'Tin tức - sự kiện',
            breadcrumbLabel: 'Tin tức - sự kiện'
        };
    case 'tin-khuyen-mai':
        return {
            title: 'Tin khuyến mại',
            breadcrumbLabel: 'Tin khuyến mại'
        };
    case 'cong-nghe-san-pham':
        return {
            title: 'Công nghệ sản phẩm',
            breadcrumbLabel: 'Công nghệ sản phẩm'
        };
    case 'su-kien-noi-bat':
        return {
            title: 'Sự kiện nổi bật',
            breadcrumbLabel: 'Sự kiện nổi bật'
        };
    
  }
};
