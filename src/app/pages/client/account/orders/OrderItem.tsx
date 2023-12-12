import { baseImageUrl, formatCurrency } from "@app/utils/helper";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import * as S from "./ListOrder.style";

const OrderItem = ({ id, status, grand_total, item }: any) => {
  const [showAllItems, setShowAllItems] = useState(false);
  const toggleShowAllItems = () => {
    setShowAllItems(!showAllItems);
  };
  const { t } = useTranslation();
  const visibleItems = showAllItems ? item : item.slice(0, 2);
  return (
    <S.OrderItem>
      <div className="order-header">
        <p className="main-status">
          {status === "awaiting"
            ? t("admin_shop.orders.list.status.awaiting")
            : status === "processing"
            ? t("admin_shop.orders.list.status.processing")
            : status === "shipping"
            ? t("admin_shop.orders.list.status.shipping")
            : status === "canceled"
            ? t("admin_shop.orders.list.status.canceled")
            : status === "delivered"
            ? t("admin_shop.orders.list.status.delivered")
            : null}
        </p>
      </div>
      <div className="order-info">
        {visibleItems.map((item: any) => {
          return (
            <div key={uuidv4()} className="product">
              <div className="detail flex">
                <div
                  className="product-img"
                  style={{ backgroundImage: `url(${baseImageUrl}/${item?.product?.product_image})` }}
                >
                  <span className="quantity">{`x${item?.product?.product_quantity}`}</span>
                </div>
                <div className="product-info">
                  <p className="product-name line-clamp-2 mb-2">{item?.product?.product_name}</p>
                  <div className="store">
                    <span className="shop-name">{item?.shop_name}</span>
                  </div>
                </div>
              </div>
              <div className="price min-w-[120px] flex justify-end">
                <span className="text-gray-800 text-base font-normal">
                  {formatCurrency(item?.product?.product_price * item?.product?.product_quantity)}
                </span>
              </div>
            </div>
          );
        })}
        {item.length > 2 && (
          <div className="show-more mt-2">
            <button
              className="p-2 bg-white border cursor-pointer border-gray-500 border-opacity-20 text-gray-500 text-xs font-medium rounded-md"
              onClick={toggleShowAllItems}
            >
              {showAllItems
                ? t("user.orders.order.show_less")
                : `${t("user.orders.order.see_more")} ${item.length - 2} ${t("user.orders.order.product")}`}
            </button>
          </div>
        )}
      </div>
      <div className="order-footer">
        <div className="total-money">
          <div className="title">{`${t("user.shopping_cart_page.total_price")}:`}</div>
          <div className="total">{formatCurrency(grand_total)}</div>
        </div>
        <div className="button-group">
          <div>
            <Link to={`/account/order/${id}`}>{t("user.orders.order.see_detail")}</Link>
          </div>
        </div>
      </div>
    </S.OrderItem>
  );
};

export default OrderItem;
