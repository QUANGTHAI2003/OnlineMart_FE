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
      tab: "waiting_for_approve",
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

export const ProductData = [
  {
    id: 1,
    name: "Áo Khoác Dù Nam Hai Lớp Chống Nước Có Nón Áo Khoác Nam Dày Dặn Đi Phượt Cao Cấp AD54 - ShopN6 (Nhiều Màu)",
    thumbnail_url: "https://salt.tikicdn.com/cache/280x280/ts/product/6a/b3/a1/ffca8523f714609022be8873d199a7aa.jpg",
    sku: "1321591803627",
    category: "Áo khoác gió",
    brand: "N6",
    price: 123000,
    stock: 32,
    status: "selling",
    updated_at: "2021-09-09",
  },
  {
    id: 2,
    name: "Điện thoại Tecno SPARK 10 Pro 8GB/128GB - Helio G88 | 5000 mAh | Sạc nhanh 18W | Cảm ứng vân tay - Hàng chính hãng",
    thumbnail_url:
      "https://salt.tikicdn.com/cache/368x368/ts/product/f8/0c/fa/53ee2b104f182faa02113d68c7b7201d.png.webp",
    sku: "1321591803622",
    category: "Điện thoại Smartphone",
    brand: "Tecno",
    price: 3540000,
    stock: 32,
    status: "draft",
    updated_at: "2021-09-09",
  },
  {
    id: 3,
    name: "Sherlock Holmes Toàn Tập  (3 Tập - Bìa Cứng - Hộp Ngang)",
    thumbnail_url:
      "https://salt.tikicdn.com/cache/368x368/ts/product/1d/57/e1/8949d9b2f2ee57edafd290e5ca02ce74.jpg.webp",
    sku: "13215918053623",
    category: "Tác phẩm kinh điển",
    brand: "Sherlock Holmes",
    price: 598000,
    stock: 32,
    status: "waiting_for_approve",
    updated_at: "2021-09-09",
  },
  {
    id: 4,
    name: "Bộ Đèn Pha Trước Xe Đạp Có Sạc USB Siêu Sáng Cao Cấp Chống Nước và Đèn Hậu Phía Sau Dành Cho Xe Đạp Địa Hình, Xe Đạp Thể Thao Giúp Đạp Xe An Toàn Ban Đêm - Hàng Chính Hãng",
    thumbnail_url:
      "https://salt.tikicdn.com/cache/368x368/ts/product/91/d3/0f/6fa265db137d02ec922dfb3fa29fa0a6.jpg.webp",
    sku: "13215918103623",
    category: "Đèn xe đạp",
    brand: "Mai Lee",
    price: 330650,
    stock: 32,
    status: "off",
    updated_at: "2021-09-09",
  },
  {
    id: 5,
    name: "Bộ túi và Hộp Bánh Trung Thu Givral Tết Đoàn Viên 5 đặc biệt (150gr)",
    thumbnail_url:
      "https://salt.tikicdn.com/cache/368x368/ts/product/82/49/56/0339aa0aee03ccc00ae2fe1636c75007.png.webp",
    sku: "13215918036423",
    category: "Bánh Trung Thu",
    brand: "Givral",
    price: 676000,
    stock: 0,
    status: "out_of_stock",
    updated_at: "2021-09-09",
  },
  {
    id: 6,
    name: "Bộ Phát Wifi TP-Link Archer AX10 Wifi 6 1500Mbps - Hàng Chính Hãng",
    thumbnail_url:
      "https://salt.tikicdn.com/cache/368x368/ts/product/6a/75/dd/b62d80f6c540b2f0c4db1f245bf16aa6.jpg.webp",
    sku: "132159180433623",
    category: "Router Wifi",
    brand: "TP-Link",
    price: 598000,
    stock: 32,
    status: "waiting_for_approve",
    updated_at: "2021-09-09",
  },
];
