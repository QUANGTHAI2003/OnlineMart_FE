/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-one-expression-per-line */
import { Pagination, Tabs } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import SearchBar from "./components/SearchBar";
import EmptyOrder from "./EmptyOrder";
import * as S from "./ListOrder.style";
import OrderItem from "./OrderItem";

const { TabPane } = Tabs;

const ListOrder = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Số lượng mục hiển thị trên mỗi trang
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const { t } = useTranslation();
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  /*  const [hasPage, setHasPage] = useState(true);*/
  const OrderData = [
    {
      order_id: 1,
      shopname: "Minh Ty",
      order_date: "2023-08-23",
      order_status: "Đang vận chuyển",
      order_total: 100000,
      items: [
        {
          product_id: 1,
          image: "https://salt.tikicdn.com/cache/200x200/ts/product/4d/07/69/fee34463b2c954eb24ef46604cbe6b8e.png",
          name: "Không Diệt Không Sinh Đừng Sợ Hãi (TB5) 1",
          price: 79000,
          qty: 2,
        },
        {
          product_id: 2,
          image: "https://salt.tikicdn.com/cache/200x200/ts/product/4d/07/69/fee34463b2c954eb24ef46604cbe6b8e.png",
          name: "Không Diệt Không Sinh Đừng Sợ Hãi (TB5) 2",
          price: 79000,
          qty: 1,
        },
        {
          product_id: 3,
          image: "https://salt.tikicdn.com/cache/200x200/ts/product/4d/07/69/fee34463b2c954eb24ef46604cbe6b8e.png",
          name: "Không Diệt Không Sinh Đừng Sợ Hãi (TB5) 3",
          price: 79000,
          qty: 1,
        },
        {
          product_id: 4,
          image: "https://salt.tikicdn.com/cache/200x200/ts/product/4d/07/69/fee34463b2c954eb24ef46604cbe6b8e.png",
          name: "Không Diệt Không Sinh Đừng Sợ Hãi (TB5) 4",
          price: 79000,
          qty: 1,
        },
      ],
    },
    {
      order_id: 2,
      shopname: "Minh Ty",
      order_date: "2023-08-23",
      order_status: "Đang vận chuyển",
      order_total: 10000,
      items: [
        {
          product_id: 1,
          image: "https://salt.tikicdn.com/cache/200x200/ts/product/4d/07/69/fee34463b2c954eb24ef46604cbe6b8e.png",
          name: "Không Diệt Không Sinh Đừng Sợ Hãi (TB5)",
          price: 79000,
          qty: 1,
        },
        {
          product_id: 2,
          image: "https://salt.tikicdn.com/cache/200x200/ts/product/4d/07/69/fee34463b2c954eb24ef46604cbe6b8e.png",
          name: "Không Diệt Không Sinh Đừng Sợ Hãi (TB5)",
          price: 79000,
          qty: 1,
        },
        {
          product_id: 3,
          image: "https://salt.tikicdn.com/cache/200x200/ts/product/4d/07/69/fee34463b2c954eb24ef46604cbe6b8e.png",
          name: "Không Diệt Không Sinh Đừng Sợ Hãi (TB5)",
          price: 79000,
          qty: 1,
        },
        {
          product_id: 4,
          image: "https://salt.tikicdn.com/cache/200x200/ts/product/4d/07/69/fee34463b2c954eb24ef46604cbe6b8e.png",
          name: "Không Diệt Không Sinh Đừng Sợ Hãi (TB5)",
          price: 79000,
          qty: 1,
        },
      ],
    },
  ];

  interface IOrder {
    order_id: number;
    order_date: string;
    order_status: string;
    shopname: string;
    order_total: number;
    items: IProduct[];
  }

  interface IProduct {
    product_id: number;
    image: string;
    name: string;
    price: number;
    qty: number;
  }
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleOrders = OrderData.slice(startIndex, endIndex).map((order: IOrder) => {
    return (
      <OrderItem
        key={order.order_id}
        order_id={order.order_id}
        order_status={order.order_status}
        order_total={order.order_total}
        shop_name={order.shopname}
        order_item={order.items}
      />
    );
  });
  const orders = [
    {
      key: "1",
      label: t("user.orders.order.all_menus"),
      children: OrderData.length === 0 ? <EmptyOrder /> : visibleOrders,
    },
    {
      key: "2",
      label: t("user.orders.order.wait_pay"),
      children:
        OrderData.filter((order) => order.order_status === t("user.orders.order.wait_pay")).length === 0 ? (
          <EmptyOrder />
        ) : (
          OrderData.filter((order) => order.order_status === t("user.orders.order.wait_pay")).map((order: any) => (
            <OrderItem
              key={order.order_id}
              order_id={order.order_id}
              order_status={order.order_status}
              order_total={order.order_total}
              shop_name={order.shopname}
              order_item={order.items}
            />
          ))
        ),
    },
    {
      key: "3",
      label: t("user.orders.order.processing"),
      children:
        OrderData.filter((order) => order.order_status === t("user.orders.order.processing")).length === 0 ? (
          <EmptyOrder />
        ) : (
          OrderData.filter((order) => order.order_status === t("user.orders.order.processing")).map((order: any) => (
            <OrderItem
              key={order.order_id}
              order_id={order.order_id}
              order_status={order.order_status}
              order_total={order.order_total}
              shop_name={order.shopname}
              order_item={order.items}
            />
          ))
        ),
    },
    {
      key: "4",
      label: t("user.orders.order.being_transported"),
      children:
        OrderData.filter((order) => order.order_status === t("user.orders.order.being_transported")).length === 0 ? (
          <EmptyOrder />
        ) : (
          OrderData.filter((order) => order.order_status === t("user.orders.order.being_transported")).map(
            (order: any) => (
              <OrderItem
                key={order.order_id}
                order_id={order.order_id}
                order_status={order.order_status}
                order_total={order.order_total}
                shop_name={order.shopname}
                order_item={order.items}
              />
            )
          )
        ),
    },
    {
      key: "5",
      label: t("user.orders.order.delivered"),
      children:
        OrderData.filter((order) => order.order_status === t("user.orders.order.delivered")).length === 0 ? (
          <EmptyOrder />
        ) : (
          OrderData.filter((order) => order.order_status === t("user.orders.order.delivered")).map((order: any) => (
            <OrderItem
              key={order.order_id}
              order_id={order.order_id}
              order_status={order.order_status}
              order_total={order.order_total}
              shop_name={order.shopname}
              order_item={order.items}
            />
          ))
        ),
    },
    {
      key: "6",
      label: t("user.orders.order.canceled"),
      children:
        OrderData.filter((order) => order.order_status === t("user.orders.order.delivered")).length === 0 ? (
          <EmptyOrder />
        ) : (
          OrderData.filter((order) => order.order_status === t("user.orders.order.delivered")).map(
            (
              order: any // đoạn này k ổn rồi nữa api phải trả response 2 ngôn ngữ luôn ;)) đúng suawar thành tiếng việt tạm đi
            ) => (
              <OrderItem
                key={order.order_id}
                order_id={order.order_id}
                order_status={order.order_status}
                order_total={order.order_total}
                shop_name={order.shopname}
                order_item={order.items}
              />
            )
          )
        ),
    },
  ];

  return (
    <>
      <div className="text-xl mb-3">{t("user.orders.order.my_order")}</div>
      <div className="w-full">
        <S.CustomTabs defaultActiveKey="1">
          {orders.map((item): any => {
            return (
              <TabPane
                key={item.key}
                tab={
                  <S.TextGray>
                    <div className="text-sm w-36 flex justify-center">{item.label}</div>
                  </S.TextGray>
                }
              >
                <S.SearchBar>
                  <SearchBar />
                </S.SearchBar>
                {item.children}
              </TabPane>
            );
          })}
        </S.CustomTabs>
      </div>
      {true && (
        <div className="p-4 flex justify-end">
          <Pagination
            current={currentPage}
            pageSize={itemsPerPage}
            total={OrderData.length}
            onChange={handlePageChange}
          />
        </div>
      )}
    </>
  );
};

export default ListOrder;
