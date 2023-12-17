import {
  faBoxOpen,
  faBuildingColumns,
  faFileCircleCheck,
  faFileLines,
  faHandHoldingDollar,
  faPager,
  faPeopleCarryBox,
  faSackXmark,
  faTruck,
  faTruckRampBox,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const bg_gradien_green = "linear-gradient( 102.1deg,  rgba(96,221,142,1) 8.7%, rgba(24,138,141,1) 88.1% )";
const bg_gradien_blue =
  "radial-gradient( circle farthest-corner at 92.3% 71.5%,  rgba(83,138,214,1) 0%, rgba(134,231,214,1) 90% )";
const bg_gradient_orange =
  "radial-gradient( circle farthest-corner at 10% 20%,  rgba(255,209,67,1) 0%, rgba(255,145,83,1) 90% )";
const bg_gradient_redpink =
  "linear-gradient( 112.5deg,  rgba(236,62,98,1) 1.5%, rgba(235,108,108,1) 17.9%, rgba(241,163,163,1) 57.8%, rgba(254,217,217,1) 89.9% )";

export const SellerProfileData = (t: any, shopInformation: any) => [
  {
    id: 1,
    queue: 1,
    icon: faUser,
    title: t("admin_shop.dashboard.title.account_store_info"),
    caption: "",
    disable: "",
    link_title: "",
    link: "",
    status: t("admin_shop.dashboard.status.completed"),
  },
  {
    id: 2,
    queue: 2,
    icon: faPager,
    disable: "",
    title: t("admin_shop.dashboard.title.legal_paperwork"),
    caption: shopInformation?.national_id !== null ? null : t("admin_shop.dashboard.caption.provide"),
    link_title: shopInformation?.national_id !== null ? null : t("admin_shop.dashboard.title.legal_paperwork"),
    link: "/business_license",
    status: shopInformation?.national_id !== null ? t("admin_shop.dashboard.status.completed") : null,
  },
  {
    id: 3,
    queue: 3,
    icon: faFileLines,
    title: t("admin_shop.dashboard.title.profile_act"),
    caption: shopInformation?.type !== "1" ? t("admin_shop.dashboard.caption.complete_all") : null,
    link_title: "",
    disable: "cursor-not-allowed",
    link: "/profile-activation",
    status: shopInformation?.type === "1" ? t("admin_shop.dashboard.status.completed") : null,
  },
  {
    id: 4,
    queue: 4,
    icon: faBuildingColumns,
    title: t("admin_shop.dashboard.title.bank_account"),
    caption: shopInformation?.name_bank !== null ? null : t("admin_shop.dashboard.caption.provide"),
    disable: "",
    link_title: shopInformation?.name_bank !== null ? null : t("admin_shop.dashboard.title.bank_account"),
    link: "/store_depot",
    status: shopInformation?.name_bank !== null ? t("admin_shop.dashboard.status.completed") : null,
  },
];

export const BusinessResultsData = (t: any) => [
  {
    id: 1,
    icon: faHandHoldingDollar,
    title: t("admin_shop.dashboard.title.revenue"),
    value: 1000255,
    today: "12/05/2023",
    background: bg_gradien_green,
  },
  {
    id: 2,
    icon: faPeopleCarryBox,
    title: t("admin_shop.dashboard.title.new_orders"),
    value: 1000255,
    today: "12/05/2023",
    background: bg_gradien_blue,
  },
  {
    id: 3,
    icon: faTruckRampBox,
    title: t("admin_shop.dashboard.title.refund_orders"),
    value: 1000255,
    today: "12/05/2023",
    background: bg_gradient_orange,
  },
  {
    id: 4,
    icon: faSackXmark,
    title: t("admin_shop.dashboard.title.cancelled_orders"),
    value: 1000255,
    today: "12/05/2023",
    background: bg_gradient_redpink,
  },
];

export const DualChartData = [
  {
    time: "2019-03",
    value: 2000,
    count: 300,
  },
  {
    time: "2019-04",
    value: 900,
    count: 800,
  },
  {
    time: "2019-05",
    value: 300,
    count: 400,
  },
  {
    time: "2019-06",
    value: 450,
    count: 380,
  },
  {
    time: "2019-07",
    value: 470,
    count: 220,
  },
];

export const DualChartOptions = (t: any) => [
  { value: "7days", label: t("admin_shop.reports.sales.common.7days") },
  { value: "1month", label: t("admin_shop.reports.sales.common.1month") },
  { value: "1quarter", label: t("admin_shop.reports.sales.common.1quarter") },
  { value: "1year", label: t("admin_shop.reports.sales.common.1year") },
];

export const RecentActivitiesData = [
  {
    id: 1,
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6SGvshARHJ5GYSH_Kig8-cYNw5rO3nWn7mA&usqp=CAU",
    name: "Cao Chương Vĩ Hoàng Chung Thanh",
    action: "Thêm sản phẩm của nhà sản xuất chưa thanh toán",
    active_time: "10/10/2023",
  },
  {
    id: 2,
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6SGvshARHJ5GYSH_Kig8-cYNw5rO3nWn7mA&usqp=CAU",
    name: "Cao Chương Vĩ",
    action: "Thêm sản phẩm",
    active_time: "10/10/2023",
  },
  {
    id: 3,
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6SGvshARHJ5GYSH_Kig8-cYNw5rO3nWn7mA&usqp=CAU",
    name: "Cao Chương Vĩ",
    action: "Thêm sản phẩm",
    active_time: "10/10/2023",
  },
  {
    id: 4,
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6SGvshARHJ5GYSH_Kig8-cYNw5rO3nWn7mA&usqp=CAU",
    name: "Cao Chương Vĩ",
    action: "Thêm sản phẩm",
    active_time: "10/10/2023",
  },
  {
    id: 5,
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6SGvshARHJ5GYSH_Kig8-cYNw5rO3nWn7mA&usqp=CAU",
    name: "Cao Chương Vĩ",
    action: "Thêm sản phẩm",
    active_time: "10/10/2023",
  },
  {
    id: 6,
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6SGvshARHJ5GYSH_Kig8-cYNw5rO3nWn7mA&usqp=CAU",
    name: "Cao Chương Vĩ",
    action: "Thêm sản phẩm",
    active_time: "10/10/2023",
  },
  {
    id: 7,
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6SGvshARHJ5GYSH_Kig8-cYNw5rO3nWn7mA&usqp=CAU",
    name: "Cao Chương Vĩ",
    action: "Thêm sản phẩm",
    active_time: "10/10/2023",
  },
  {
    id: 8,
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6SGvshARHJ5GYSH_Kig8-cYNw5rO3nWn7mA&usqp=CAU",
    name: "Cao Chương Vĩ",
    action: "Thêm sản phẩm",
    active_time: "10/10/2023",
  },
  {
    id: 9,
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6SGvshARHJ5GYSH_Kig8-cYNw5rO3nWn7mA&usqp=CAU",
    name: "Cao Chương Vĩ",
    action: "Thêm sản phẩm",
    active_time: "10/10/2023",
  },
  {
    id: 10,
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6SGvshARHJ5GYSH_Kig8-cYNw5rO3nWn7mA&usqp=CAU",
    name: "Cao Chương Vĩ",
    action: "Thêm sản phẩm",
    active_time: "10/10/2023",
  },
  {
    id: 11,
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6SGvshARHJ5GYSH_Kig8-cYNw5rO3nWn7mA&usqp=CAU",
    name: "Cao Chương Vĩ",
    action: "Thêm sản phẩm",
    active_time: "10/10/2023",
  },
];

export const OrderPendingOptions = (t: any) => [
  { value: "7days", label: t("admin_shop.reports.sales.common.7days") },
  { value: "1month", label: t("admin_shop.reports.sales.common.1month") },
  { value: "1quarter", label: t("admin_shop.reports.sales.common.1quarter") },
  { value: "1year", label: t("admin_shop.reports.sales.common.1year") },
];

export const OrdersPendingData = (t: any) => [
  {
    id: 1,
    icon: faFileCircleCheck,
    title: t("admin_shop.dashboard.title.awaiting_confirmation"),
    value: 135465,
    link: "awaiting_confirmation",
  },
  {
    id: 2,
    icon: faBoxOpen,
    title: t("admin_shop.dashboard.title.in_progress"),
    value: 135465,
    link: "processing",
  },
  {
    id: 3,
    icon: faTruck,
    title: t("admin_shop.dashboard.title.in_transit"),
    value: 1355465,
    link: "shipping",
  },
  {
    id: 4,
    icon: faHandHoldingDollar,
    title: t("admin_shop.dashboard.title.delivered"),
    value: 135465,
    link: "delivered",
  },
  {
    id: 5,
    icon: faSackXmark,
    title: t("admin_shop.dashboard.title.cancelled"),
    value: 1358465,
    link: "cancelled",
  },
];
