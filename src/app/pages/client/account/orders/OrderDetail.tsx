/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-one-expression-per-line */
import { Button, Table } from "antd";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";

const dataSource = [
  {
    key: "1",
    product: {
      image: "https://salt.tikicdn.com/cache/280x280/ts/product/ff/d2/e2/d2232966ba4242671992411431a21f9d.jpg.webp",
      name: "Máy Hút Bụi Mini Cầm Tay DEERMA - Hàng Chính Hãng",
      shop_name: "MinhTy",
      code_product: 12312,
    },
    price: 100000,
    quantity: 2,
    discount: 10,
    subtotal: 180000,
  },
  {
    key: "2",
    product: {
      image: "https://salt.tikicdn.com/cache/280x280/ts/product/ff/d2/e2/d2232966ba4242671992411431a21f9d.jpg.webp",
      name: "Máy Hút Bụi Mini Cầm Tay DEERMA - Hàng Chính Hãng",
      shop_name: "MinhTy",
      code_product: 12312,
    },
    price: 150000,
    quantity: 1,
    discount: 0,
    subtotal: 150000,
  },
];

const OrderDetailPage = () => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const { id } = useParams();

  const totalSubtotal = dataSource.reduce((total, item) => total + item.subtotal, 0);
  const shippingFee = 22000; // Phí vận chuyển cố định
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const { t } = useTranslation();
  const totalAmount = totalSubtotal + shippingFee;
  const columns = [
    {
      title: t("user.orders.order_details.product"),
      dataIndex: "product",
      key: "product",
      render: (product: any) => (
        <div className="flex flex-row">
          <div className="col-span-1 ">
            <img src={product.image} alt={product.name} className="mr-2 w-12 h-12" />
          </div>
          <div className=" ml-5 col-span-2 grid grid-rows-3 gap-4">
            <div className="row-span-1">
              <span className="font-bold">{product.name}</span>
            </div>
            <div className="row-span-1">
              {t("user.orders.order_details.provided")}
              <span className="text-blue-500 p-2">{product.shop_name}</span>
            </div>
            <div className="row-span-1">
              <span>
                SKU:
                {product.code_product}
              </span>
            </div>
            <div className="row-span-1 flex items-center">
              <Button type="default" className="border-blue-400 text-blue-400">
                {t("user.orders.order_details.chat_seller")}
              </Button>
              <Button type="default" className=" ml-3 border-blue-400 text-blue-400">
                {t("user.orders.order_details.repurchase")}
              </Button>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: t("user.orders.order_details.price"),
      dataIndex: "price",
      key: "price",
      render: (price: any) => <span> {price.toLocaleString()}đ</span>,
    },
    {
      title: t("user.orders.order_details.quantity"),
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: t("user.orders.order_details.discount"),
      dataIndex: "discount",
      key: "discount",
      // eslint-disable-next-line react/jsx-one-expression-per-line
      render: (discount: any) => <span>{`${discount} %`} </span>,
    },
    {
      title: t("user.orders.order_details.provisional"),
      dataIndex: "subtotal",
      key: "subtotal",
      // eslint-disable-next-line react/jsx-one-expression-per-line
      render: (subtotal: any) => <span> {`${subtotal.toLocaleString()}đ`}</span>,
    },
  ];
  const footer = () => (
    <>
      <div className="text-right  text-base px-12">
        <div className="mb-2   items-center">
          <span className="pr-10"> {t("user.orders.order_details.provisional")}:</span>

          <span>{`${totalSubtotal.toLocaleString()}đ`} </span>
        </div>
        <div className="mb-2">
          <span className="pr-12">{t("user.orders.order_details.transport_fee")}:</span>{" "}
          <span>{`${shippingFee.toLocaleString()}đ`}</span>
        </div>
        <div>
          <span className="pr-10">{t("user.orders.order_details.total")}:</span>
          <span className="text-red-600"> {`${totalAmount.toLocaleString()}đ`}</span>
        </div>
      </div>
      <div className="flex justify-end mt-6 p">
        <Button type="primary" className="bg-yellow-300 font-bold text-black">
          {t("user.orders.order_details.cancel_order")}
        </Button>
      </div>
    </>
  );
  // Giả sử bạn có dữ liệu đơn hàng từ API hoặc lưu trữ
  const orderData = {
    id: 1,
    image: "https://salt.tikicdn.com/cache/280x280/ts/product/d9/e7/c5/1e8879b20f37a74b93bd7b6dd0e64e13.png.webp",
    name: "Không Diệt Không Sinh Đừng Sợ Hãi (TB5)",
    user_name: " Minh Ty",
    order_status: "Đang vận chuyển",
    price: 79000,
    qty: 1,
    phone: "091 566 1392",
    total: 79000,
    shopname: "MinhTy",
    recipient_address: "123 Đường ABC, Quận XYZ, Thành phố HCM",
    payment_method: "THANH TOÁN KHI NHẬN HÀNG",
  };

  return (
    <>
      <div className="sm:flex sm:justify-between">
        <div>
          <h1 className="text-lg pb-3">
            {t("user.orders.order_details.order_detail")} #{id}
          </h1>
        </div>
        <span className="flex justify-end">{t("user.orders.order_details.order_date")}: 20:00 06/07/2023</span>
      </div>
      <div className="grid grid-rows-3 grid-flow-col gap-4">
        <div className="row-start-2 row-span-2">{t("user.orders.order_details.receive_address")}</div>
        <div className="row-start-2 row-span-2">{t("user.orders.order_details.delivery_method")}</div>
        <div className="row-start-2 row-span-2">{t("user.orders.order_details.payments")}</div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-5">
        <div className="bg-white rounded-xl p-4">
          <div className="font-bold">NGUYỄN MINH TÝ</div>

          <p className="py-3">
            {t("user.orders.order_details.address")}: &nbsp;
            {orderData.recipient_address}
          </p>
          <p className="">
            {t("user.orders.order_details.phone")}: &nbsp;
            {orderData.phone}
          </p>
        </div>
        <div className="bg-white rounded-xl p-4">
          <div>
            <span className="py-2">{t("user.orders.order_details.delivery_on")} thứ hai, 10/07</span>
            <p className="py-2">{t("user.orders.order_details.provided")} MINHTY</p>
            <p className="py-2">{t("user.orders.order_details.transport_fee")} 22.000đ</p>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4">
          <span>{orderData.payment_method}</span>
        </div>
      </div>
      <div className="mt-4">
        <Table
          dataSource={dataSource}
          columns={columns}
          footer={footer} // Sử dụng footer để đưa phần tổng cộng vào bảng
          pagination={false}
        />
      </div>
      <div className="flex items-center space-x-10 mt-3">
        <Link to={"/account/orders"} className="pl-12 text-blue-400">
          {" "}
          {t("user.orders.order_details.back_order")}{" "}
        </Link>
      </div>
    </>
  );
};

export default OrderDetailPage;
