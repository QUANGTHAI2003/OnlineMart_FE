import { formatCurrency, formatNumber } from "@app/utils/helper";

export const ProductListFilterCategory = [
  {
    id: 1,
    label: "Đồ Chơi - Mẹ & Bé",
    value: "Đồ Chơi - Mẹ & Bé",
  },
  {
    id: 2,
    label: "NGON",
    value: "NGON",
  },
  {
    id: 3,
    label: "Điện Thoại - Máy Tính Bảng",
    value: "Điện Thoại - Máy Tính Bảng",
  },
  {
    id: 4,
    label: "Làm Đẹp - Sức Khỏe",
    value: "Làm Đẹp - Sức Khỏe",
  },
  {
    id: 5,
    label: "Điện Gia Dụng",
    value: "Điện Gia Dụng",
  },
  {
    id: 6,
    label: "Thời Trang",
    value: "Thời Trang",
  },
  {
    id: 7,
    label: "Thời trang nữ",
    value: "Thời trang nữ",
  },
  {
    id: 8,
    label: "Thời trang nam",
    value: "Thời trang nam",
  },
  {
    id: 9,
    label: "Laptop - Máy Vi Tính - Linh kiện",
    value: "Laptop - Máy Vi Tính - Linh kiện",
  },
  {
    id: 10,
    label: "Nhà Cửa - Đời Sống",
    value: "Nhà Cửa - Đời Sống",
  },
];
export const ProductListFilterBrand = [
  {
    id: 1,
    label: "PHO TÀU LÝ GIA LAI",
    value: "PHO TÀU LÝ GIA LAI",
  },
  {
    id: 2,
    label: "Xưởng may Đô Thành",
    value: "Xưởng may Đô Thành",
  },
  {
    id: 3,
    label: "HD-PROLIFE",
    value: "HD-PROLIFE",
  },
  {
    id: 4,
    label: "ECOHOME",
    value: "ECOHOME",
  },
  {
    id: 5,
    label: "Công ty cổ phần dược phẩm oshi",
    value: "Công ty cổ phần dược phẩm oshi",
  },
  {
    id: 6,
    label: "Xưởng Gỗ Quỹ Bình",
    value: "Xưởng Gỗ Quỹ Bình",
  },
  {
    id: 7,
    label: "3SachMart",
    value: "3SachMart",
  },
  {
    id: 8,
    label: "LadolVita",
    value: "LadolVita",
  },
];
export const InventoryListData = [
  {
    id: 1,
    product_media:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7_nx-EEBpDiX_mgLv9aQ5_1QBXdKVup_eSg&usqp=CAU",
    name: "Bánh trung thu dafdsf asdfasdf rer eerasfs dasfsadfasdf",
    product_code: "OM123-M-GREENBEAN ASDFSADF ASAFSDFSAFASDFADSADF",
    sellable: formatNumber(20000000000),
    qty_inventory: formatNumber(5000000),
    created_at: "10/8/2023",
    retail_price: formatCurrency(75000),
    import_price: formatCurrency(30000),
    wholesale_price: formatCurrency(50000),
    barcode: "JHGHJ135CGFCGCGVGH568GXFDGJGFJ9879 DFGSDFGS",
    supplier: "Kinh Đô ajlsdkfj asdfasdf adsfsdf",
    status: "suspended",
  },
  {
    id: 2,
    product_media:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7_nx-EEBpDiX_mgLv9aQ5_1QBXdKVup_eSg&usqp=CAU",
    name: "Bánh trung thu nhân gà hầm sả tắc",
    product_code: "OM123-M-GREENBEAN ASDFSADF ASAFSDFSAFASDFADSADF",
    sellable: formatNumber(10000000000),
    qty_inventory: formatNumber(6000000),
    created_at: "20/8/2023",
    retail_price: formatCurrency(35000),
    import_price: formatCurrency(30000),
    wholesale_price: formatCurrency(20000),
    barcode: "JHGHJ135CGFC",
    supplier: "Vãng sanh đường",
    status: "in_process",
  },
  {
    id: 3,
    product_media:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7_nx-EEBpDiX_mgLv9aQ5_1QBXdKVup_eSg&usqp=CAU",
    name: "Bánh trung thu nhân ốc quế sầu riêng",
    product_code: "OM123-M-GREENBEAN ASDFSADF ASAFSDFSAFASDFADSADF",
    sellable: formatNumber(50000000000),
    qty_inventory: formatNumber(9000000),
    created_at: "7/1/2023",
    retail_price: formatCurrency(15000),
    import_price: formatCurrency(70000),
    wholesale_price: formatCurrency(50000),
    barcode: "GCGVGH568GXFDGJGFJ9879",
    supplier: "Thăng Thiên",
    status: "suspended",
  },
];
