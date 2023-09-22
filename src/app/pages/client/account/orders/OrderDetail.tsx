import { formatCurrency } from "@app/utils/helper";
import { Button, Table } from "antd";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import * as S from "./ListOrder.style";

const OrderData = [
  {
    id: 1,
    status: "Đang vận chuyển",
    status_slug: "delivered",
    grand_total: 138000,
    items: [
      {
        id: 1,
        category_name: "Đồng hồ",
        product_id: 1,
        product_sku: 7180770726869,
        product_name:
          "Dụng cụ cạo lưỡi bằng inox 304 sáng bóng làm sạch bề mặt lưỡi giúp hơi thở thơm mát tặng kèm khăn đa năng 2 mặt BaoAn hàng chính hãng - inox",
        sale_price: 0,
        qty: 2,
        price: 69000,
        subtotal: 138000,
        discount: 0,
        grand_total: 138000,
        thumbnail_url:
          "https://salt.tikicdn.com/cache/200x200/ts/product/4d/07/69/fee34463b2c954eb24ef46604cbe6b8e.png",
        current_seller: [
          {
            id: 1,
            name: "Shop mạnh tiến",
            link: null,
            store_id: 1,
          },
        ],
      },
    ],
    shipping_address: [
      {
        id: 1,
        name: "Nguyễn Minh Tý",
        road: "Số 1 đường số 15",
        ward: "Phường An Khánh",
        district: "Quận Ninh Kiều",
        city: "Cần Thơ",
        country: "Việt Nam",
        telephone: "0915661392",
      },
    ],

    shipping: [
      {
        method_fee_text: 22000,
        method_text: "24h Thứ Năm, 24/08",
        method_name: "Giao tiết kiệm",
        delivery_name: "Tikinow Smart Logistics",
      },
    ],
    payment_method: [
      {
        id: 1,
        name: "COD",
        description: "THANH TOÁN KHI NHẬN HÀNG",
      },
    ],
    created_at: "20:00 16/11/2003",
  },
];

const OrderDetailPage = () => {
  // const { id } = useParams();
  const totalSubtotal = OrderData.reduce((total, item) => total + item.items[0].subtotal, 0);
  const { t } = useTranslation();
  const totalAmount = totalSubtotal + OrderData[0].shipping[0].method_fee_text;
  const columns: any = [
    {
      title: t("user.orders.order_details.product"),
      dataIndex: "product",
      key: "product",
      render: () => {
        return (
          <div key={OrderData[0].items[0].product_id} className="flex flex-row">
            <div className="col-span-1 w-20">
              <img
                src={OrderData[0].items[0].thumbnail_url}
                alt={OrderData[0].items[0].product_name}
                className="mr-2 w-12 h-12"
              />
            </div>
            <div className="ml-5  grid gap-3">
              <div className="row-span-1">
                <span className="font-bold line-clamp-2">{OrderData[0].items[0].product_name}</span>
              </div>
              <div className="row-span-1">
                {t("user.orders.order_details.provided")}
                <span className="text-blue-500 p-2">{OrderData[0].items[0].current_seller[0].name}</span>
              </div>
              <div className="row-span-1">
                <span>
                  SKU:
                  {OrderData[0].items[0].product_sku}
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
        );
      },
    },

    {
      title: t("user.orders.order_details.price"),
      dataIndex: "price",
      key: "price",
      render: () => <span>{formatCurrency(OrderData[0].items[0].price)}</span>,
    },
    {
      title: t("user.orders.order_details.quantity"),
      dataIndex: "quantity",
      key: "quantity",
      render: () => <span>{OrderData[0].items[0].qty}</span>,
    },
    {
      title: t("user.orders.order_details.discount"),
      dataIndex: "discount",
      key: "discount",
      render: () => <span>{`${OrderData[0].items[0].discount} %`}</span>,
    },
    {
      title: t("user.orders.order_details.provisional"),
      dataIndex: "subtotal",
      key: "subtotal",
      render: () => <span>{`${formatCurrency(OrderData[0].items[0].subtotal)}`}</span>,
    },
  ];
  const footer = () => (
    <>
      <div className="text-right sub-total   px-12">
        <div className="mb-2   items-center">
          <span className="pr-4">{t("user.orders.order_details.provisional")}</span>
          <span>{`${formatCurrency(totalSubtotal)}`}</span>
        </div>
        <div className="mb-2">
          <span className="pr-4">{t("user.orders.order_details.transport_fee")}</span>
          <span>{`${formatCurrency(OrderData[0].shipping[0].method_fee_text)}`}</span>
        </div>
        <div>
          <span className="pr-4">{t("user.orders.order_details.total")}</span>
          <span className="text-red-600">{`${formatCurrency(totalAmount)}`}</span>
        </div>
      </div>
      <div className="flex justify-end mt-6 p">
        <Button type="primary" className="bg-yellow-300 font-bold text-black">
          {t("user.orders.order_details.cancel_order")}
        </Button>
      </div>
    </>
  );

  return (
    <>
      <div className="sm:flex sm:justify-between">
        <div>
          <h1 className="text-lg pb-3">
            {t("user.orders.order_details.order_detail")}
            {/* nữa truyền id vô đây */}
            {OrderData[0].status}
          </h1>
        </div>
        <span className="flex justify-end">
          {t("user.orders.order_details.order_date")}
          {OrderData[0].created_at}
        </span>
      </div>
      <S.OrderDetails>
        <div className="grid grid-cols-1 infor-method sm:grid-cols-3 gap-4 mt-5">
          <div className="row-start-2 row-span-2">{t("user.orders.order_details.receive_address")}</div>
          <div className="row-start-2 row-span-2">{t("user.orders.order_details.delivery_method")}</div>
          <div className="row-start-2 row-span-2">{t("user.orders.order_details.payments")}</div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-5">
          <div className="bg-white rounded-xl p-4">
            <div className="font-bold">{OrderData[0].shipping_address[0].name}</div>

            <p className="py-3">
              {t("user.orders.order_details.address")}
              {OrderData[0].shipping_address[0].road}
            </p>
            <p className="">
              {t("user.orders.order_details.phone")}
              {OrderData[0].shipping_address[0].telephone}
            </p>
          </div>
          <div className="bg-white rounded-xl p-4">
            <div>
              <span className="py-2">
                {t("user.orders.order_details.delivery_on")}
                {OrderData[0].shipping[0].method_text}
              </span>
              <p className="py-2">{OrderData[0].shipping[0].method_name}</p>
              <p className="py-2">{OrderData[0].shipping[0].delivery_name}</p>
              <p className="py-2">
                {t("user.orders.order_details.transport_fee")}
                {formatCurrency(OrderData[0].shipping[0].method_fee_text)}
              </p>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4">
            <span>{OrderData[0].payment_method[0].description}</span>
          </div>
        </div>
        <div className="mt-4 table-responsive">
          <div className="table-scroll-instructions">{t("user.orders.order_details.table_scrool")}</div>
          <Table scroll={{ x: 320 }} dataSource={OrderData} columns={columns} footer={footer} pagination={false} />
        </div>
        <div className="flex items-center space-x-10 mt-3">
          <Link to={"/account/orders"} className="pl-12 link-agin text-blue-400">
            {t("user.orders.order_details.back_order")}
          </Link>
        </div>
      </S.OrderDetails>
    </>
  );
};

export default OrderDetailPage;
