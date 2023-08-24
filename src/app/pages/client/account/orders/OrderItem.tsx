/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-one-expression-per-line */
import { formatCurrency } from "@app/utils/helper";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import * as S from "./ListOrder.style";

const OrderItem = ({ order_id, order_status, shop_name, order_total, order_item }: any) => {
  const [showAllItems, setShowAllItems] = useState(false);

  const toggleShowAllItems = () => {
    setShowAllItems(!showAllItems);
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const { t } = useTranslation();
  const visibleItems = showAllItems ? order_item : order_item.slice(0, 2);

  return (
    <S.OrderItem>
      <div className="order-header">
        <p className="main-status">{order_status}</p>
      </div>
      <div className="order-info">
        {visibleItems.map((item: any) => {
          return (
            <div key={item.id} className="product">
              <div className="detail flex">
                <div className="product-img" style={{ backgroundImage: `url(${item.image})` }}>
                  <span className="quantity">{`x${item.qty}`}</span>
                </div>
                <div className="product-info line-clamp-2">
                  <p className="product-name mb-2">{item.name}</p>
                  <div className="store">
                    <span className="shop-name">{shop_name}</span>
                  </div>
                </div>
              </div>
              <div className="price min-w-[120px] flex justify-end">
                <span className="text-gray-800 text-base font-normal">{formatCurrency(item.price * item.qty)}</span>
              </div>
            </div>
          );
        })}
        {order_item.length > 2 && (
          <div className="show-more mt-2">
            <button
              className="p-2 bg-white border border-gray-500 border-opacity-20 text-gray-500 text-xs font-medium rounded-md"
              onClick={toggleShowAllItems}
            >
              {showAllItems
                ? t("user.orders.order.show_less")
                : `${t("user.orders.order.see_more")} ${order_item.length - 2} ${t("user.orders.order.product")}`}
            </button>
          </div>
        )}
      </div>
      <div className="order-footer">
        <div className="total-money">
          <div className="title">Tổng tiền:</div>
          <div className="total">{formatCurrency(order_total)}</div>
        </div>
        <div className="button-group">
          <div>{t("user.orders.order.repurchase")}</div>
          <div>
            <Link to={`/account/order/${order_id}`}>{t("user.orders.order.see_detail")}</Link>
          </div>
        </div>
      </div>
    </S.OrderItem>
  );
};

export default OrderItem;
