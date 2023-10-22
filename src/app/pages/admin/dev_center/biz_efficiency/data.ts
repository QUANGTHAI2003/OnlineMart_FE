import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import topCities from "@app/app/assets/images/dev_center/top-cities.png";
import topProduct from "@app/app/assets/images/dev_center/top-products.png";

const red_percent = "#dc2626";
const green_percent = "#84cc16";
const primary_box = "rgb(24, 144, 255)";
const orange_box = "#f97316";
const jade_green_box = "#14b8a6";
const pupple_box = "#7e22ce";
const pink_box = "#db2777";
const yellow_box = "#eab308";
const brown_box = "#c2410c";

export const BusinessReportData = (t: any) => [
  {
    id: 1,
    title: t("admin_shop.dev_center.biz_efficiency.common.revenue"),
    value: 100000,
    tooltip: t("admin_shop.dev_center.biz_efficiency.common.tooltip.revenue"),
    percent: 125.3,
    fill_color: primary_box,
    percent_color: green_percent,
    arrow_icon: CaretUpOutlined,
    data: [
      {
        year: "2/1991",
        value: 3,
      },
      {
        year: "1992",
        value: 4,
      },
      {
        year: "1993",
        value: 7,
      },
      {
        year: "1995",
        value: 4,
      },
      {
        year: "1997",
        value: 3,
      },
      {
        year: "1998",
        value: 9,
      },
      {
        year: "1999",
        value: 1,
      },
    ],
  },
  {
    id: 2,
    title: t("admin_shop.dev_center.biz_efficiency.common.orders"),
    value: 1902032,
    tooltip: t("admin_shop.dev_center.biz_efficiency.common.tooltip.orders"),
    percent: 100,
    fill_color: orange_box,
    percent_color: red_percent,
    arrow_icon: CaretDownOutlined,
    data: [
      {
        year: "2/1991",
        value: 3,
      },
      {
        year: "1992",
        value: 4,
      },
      {
        year: "1993",
        value: 7,
      },
      {
        year: "1995",
        value: 4,
      },
      {
        year: "1997",
        value: 3,
      },
      {
        year: "1998",
        value: 9,
      },
      {
        year: "1999",
        value: 1,
      },
    ],
  },
  {
    id: 3,
    title: t("admin_shop.dev_center.biz_efficiency.common.net_revenue"),
    value: 111216458,
    tooltip: t("admin_shop.dev_center.biz_efficiency.common.tooltip.net_revenue"),
    percent: 253.6,
    fill_color: jade_green_box,
    percent_color: green_percent,
    arrow_icon: CaretUpOutlined,
    data: [
      {
        year: "2/1991",
        value: 3,
      },
      {
        year: "1992",
        value: 4,
      },
      {
        year: "1993",
        value: 7,
      },
      {
        year: "1995",
        value: 4,
      },
      {
        year: "1997",
        value: 3,
      },
      {
        year: "1998",
        value: 9,
      },
      {
        year: "1999",
        value: 1,
      },
    ],
  },
  {
    id: 4,
    title: t("admin_shop.dev_center.biz_efficiency.common.views"),
    value: 2899,
    tooltip: t("admin_shop.dev_center.biz_efficiency.common.tooltip.views"),
    percent: 94.8,
    fill_color: pupple_box,
    percent_color: red_percent,
    arrow_icon: CaretDownOutlined,
    data: [
      {
        year: "2/1991",
        value: 3,
      },
      {
        year: "1992",
        value: 4,
      },
      {
        year: "1993",
        value: 7,
      },
      {
        year: "1995",
        value: 4,
      },
      {
        year: "1997",
        value: 3,
      },
      {
        year: "1998",
        value: 9,
      },
      {
        year: "1999",
        value: 1,
      },
    ],
  },
  {
    id: 5,
    title: t("admin_shop.dev_center.biz_efficiency.common.conversion_rate"),
    value: 1.8,
    tooltip: t("admin_shop.dev_center.biz_efficiency.common.tooltip.conversion_rate"),
    percent: 85.5,
    fill_color: pink_box,
    percent_color: red_percent,
    arrow_icon: CaretDownOutlined,
    data: [
      {
        year: "2/1991",
        value: 3,
      },
      {
        year: "1992",
        value: 4,
      },
      {
        year: "1993",
        value: 7,
      },
      {
        year: "1995",
        value: 4,
      },
      {
        year: "1997",
        value: 3,
      },
      {
        year: "1998",
        value: 9,
      },
      {
        year: "1999",
        value: 1,
      },
    ],
  },
  {
    id: 6,
    title: t("admin_shop.dev_center.biz_efficiency.common.average_order"),
    value: 1253999,
    tooltip: t("admin_shop.dev_center.biz_efficiency.common.tooltip.average_order"),
    percent: 100,
    fill_color: yellow_box,
    percent_color: green_percent,
    arrow_icon: CaretUpOutlined,
    data: [
      {
        year: "2/1991",
        value: 3,
      },
      {
        year: "1992",
        value: 4,
      },
      {
        year: "1993",
        value: 7,
      },
      {
        year: "1995",
        value: 4,
      },
      {
        year: "1997",
        value: 3,
      },
      {
        year: "1998",
        value: 9,
      },
      {
        year: "1999",
        value: 1,
      },
    ],
  },
  {
    id: 7,
    title: t("admin_shop.dev_center.biz_efficiency.common.cancelled_orders"),
    value: 165,
    tooltip: t("admin_shop.dev_center.biz_efficiency.common.tooltip.cancelled_orders"),
    percent: 100,
    fill_color: brown_box,
    percent_color: red_percent,
    arrow_icon: CaretDownOutlined,
    data: [
      {
        year: "2/1991",
        value: 3,
      },
      {
        year: "1992",
        value: 4,
      },
      {
        year: "1993",
        value: 7,
      },
      {
        year: "1995",
        value: 4,
      },
      {
        year: "1997",
        value: 3,
      },
      {
        year: "1998",
        value: 9,
      },
      {
        year: "1999",
        value: 1,
      },
    ],
  },
];

export const ExportExcelData = [
  {
    revenue: 100000,
    orders: 1920032,
    net_revenue: 111216458,
    views: 2899,
    conversion_rate: 1.8,
    average_order: 1253999,
    cancelled_orders: 165,
  },
];

export const TopProductsData = [
  {
    type: "Apple iPad Air (5th Gen) Wi-Fi, 2022",
    value: 10,
  },
  {
    type: "Máy Tính Bảng Samsung Galaxy Tab A7 Lite T225 3GB/32GB - Hàng Chính Hãng",
    value: 20,
  },
  {
    type: "Loa Bluetooth 50W công suất lớn Super Bass pin 6600MAH sạc nhanh Type C công nghệ AI Hàng Chính Hãng PKCB",
    value: 30,
  },
  {
    type: "Loa bluetooth mini không dây wireless TWS HiFi loa nghe nhạc âm trầm bass mạnh có đèn RGB đổi màu theo nhạc, hỗ trợ thẻ nhớ - Hàng chính hãng VinBuy",
    value: 40,
  },
  {
    type: "Sữa bột Vinamilk Dielac Alpha 4 - Hộp thiếc 1500g (dành cho trẻ 2-6 tuổi)",
    value: 50,
  },
];

export const TopCitiesData = [
  {
    type: "Thừa Thiên - Huế",
    value: 5,
  },
  {
    type: "Ninh Bình",
    value: 10,
  },
  {
    type: "TP. Hồ Chí Minh",
    value: 20,
  },
  {
    type: "Cần Thơ",
    value: 64,
  },
  {
    type: "Hậu Giang",
    value: 32,
  },
];

export const TopProductsTitle = (t: any) => [
  {
    id: 1,
    thumbnail: topProduct,
    title: t("admin_shop.dev_center.biz_efficiency.top_box.top_products"),
    tooltip: t("admin_shop.dev_center.biz_efficiency.top_box.tooltip.top_products"),
    see_more_link: "/admin/shop/dev_center/product_insight",
  },
];

export const TopCitiesTitle = (t: any) => [
  {
    id: 1,
    thumbnail: topCities,
    title: t("admin_shop.dev_center.biz_efficiency.top_box.top_cities"),
    tooltip: t("admin_shop.dev_center.biz_efficiency.top_box.tooltip.top_cities"),
    see_more_link: "",
  },
];
