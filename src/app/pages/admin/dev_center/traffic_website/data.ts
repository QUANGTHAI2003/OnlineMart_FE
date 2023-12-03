import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
export const red_percent = "#dc2626";
export const green_percent = "#84cc16";
export const primary_box = "rgb(24, 144, 255)";
export const orange_box = "#f97316";
export const jade_green_box = "#14b8a6";
export const purple_box = "#7e22ce";

export const ExportExcelData = [
  {
    total_views: 1800000,
    conversion_rate: 19282,
    total_viewers: 111216458,
    total_buyers: 288899,
  },
];

export const TrafficWebsiteData = (t: any) => [
  {
    id: 1,
    title: t("admin_shop.dev_center.traffic_website.common.total_views"),
    value: 1800000,
    tooltip: t("admin_shop.dev_center.traffic_website.common.tooltip.total_views"),
    percent: 125.3,
    fill_color: primary_box,
    percent_color: green_percent,
    arrow_icon: CaretUpOutlined,
    data: [
      {
        year: "02/12/2023",
        value: 6,
      },
      {
        year: "01/12/2023",
        value: 1000,
      },
      {
        year: "30/11/2023",
        value: 3453,
      },
    ],
  },
  {
    id: 2,
    title: t("admin_shop.dev_center.traffic_website.common.conversion_rate"),
    value: 19282,
    tooltip: t("admin_shop.dev_center.traffic_website.common.tooltip.conversion_rate"),
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
    title: t("admin_shop.dev_center.traffic_website.common.total_viewers"),
    value: 111216458,
    tooltip: t("admin_shop.dev_center.traffic_website.common.tooltip.total_viewers"),
    percent: 253.6,
    fill_color: jade_green_box,
    percent_color: green_percent,
    arrow_icon: CaretUpOutlined,
    data: [
      {
        year: "2/1991",
        value: 8,
      },
      {
        year: "1992",
        value: 4,
      },
      {
        year: "1993",
        value: 2,
      },
      {
        year: "1995",
        value: 4,
      },
      {
        year: "1997",
        value: 1,
      },
      {
        year: "1998",
        value: 9,
      },
      {
        year: "1999",
        value: 4,
      },
    ],
  },
  {
    id: 4,
    title: t("admin_shop.dev_center.traffic_website.common.total_buyers"),
    value: 288899,
    tooltip: t("admin_shop.dev_center.traffic_website.common.tooltip.total_buyers"),
    percent: 94.8,
    fill_color: purple_box,
    percent_color: red_percent,
    arrow_icon: CaretDownOutlined,
    data: [
      {
        year: "2/1991",
        value: 1,
      },
      {
        year: "1992",
        value: 3,
      },
      {
        year: "1993",
        value: 1,
      },
      {
        year: "1995",
        value: 8,
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
        value: 2,
      },
    ],
  },
];
