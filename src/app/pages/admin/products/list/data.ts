export const ProductListTab = (t: any) => {
  return [
    {
      id: 1,
      name: t("admin_shop.product.list.status.all"),
      tab: "all",
      alert:
        "Mục này chứa các sản phẩm đã được duyệt để bán hàng, không bao gồm sản phẩm ở trạng thái Nháp, Chờ duyệt và Khóa vĩnh viễn.",
    },
    {
      id: 2,
      name: t("admin_shop.product.list.status.selling"),
      tab: "selling",
      alert:
        "Mục này chứa các sản phẩm có thể bán. Bao gồm sản phẩm đang hiển thị và bị hạn chế hiển thị trong kết quả tìm kiếm.",
    },
    {
      id: 3,
      name: t("admin_shop.product.list.status.out_of_stock"),
      tab: "out-of-stock",
      alert:
        "Mục này chứa các sản phẩm có lựa chọn đã hết hàng hoặc hết hàng toàn bộ. Cập nhật giá trị ở cột Tồn có thể bán > 0 để bán lại.",
    },
    {
      id: 4,
      name: t("admin_shop.product.list.status.draft"),
      tab: "draft",
      alert:
        "Mục này chứa các sản phẩm có thể bán. Bao gồm sản phẩm đang hiển thị và bị hạn chế hiển thị trong kết quả tìm kiếm.",
    },
    {
      id: 5,
      name: t("admin_shop.product.list.status.waiting_for_approve"),
      tab: "waiting-for-approve",
      alert:
        "Mục này chứa các sản phẩm đang chờ duyệt bởi Tiki. Duyệt thành công sẽ tự động chuyển qua mục Đang bán, bị từ chối chuyển qua mục Vi phạm.",
    },
    {
      id: 6,
      name: t("admin_shop.product.list.status.off"),
      tab: "off",
      alert: "Mục này chứa các sản phẩm mà Nhà bán đã tắt toàn bộ lựa chọn Khách hàng không thể xem và đặt hàng.",
    },
  ];
};

export const searchType = (t: any) => {
  return [
    { value: "name", label: t("admin_shop.product.list.filter.type.name") },
    { value: "category", label: t("admin_shop.product.list.filter.type.category") },
    { value: "brand", label: t("admin_shop.product.list.filter.type.brand") },
    { value: "price", label: t("admin_shop.product.list.filter.type.price") },
    { value: "sku", label: t("admin_shop.product.list.filter.type.sku") },
  ];
};

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
