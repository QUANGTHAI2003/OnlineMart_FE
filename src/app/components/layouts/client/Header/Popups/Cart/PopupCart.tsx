import { ShoppingCartOutlined } from "@ant-design/icons";
import { useResponsive } from "@app/hooks";
import { formatCurrency } from "@app/utils/helper";
import { Badge, Button, List, Popover } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

import CartContentSkeleton from "./CartContentSkeleton";

interface ICartItem {
  id: number;
  name: string;
  price: number;
  urlImage: string;
}

interface ICartProps {
  items: ICartItem[];
  isBlue: boolean;
}

function Cart({ items, isBlue }: ICartProps) {
  const { t } = useTranslation();
  const { isDesktop } = useResponsive();
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleVisibleChange = (visible: boolean) => {
    setVisible(visible);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3 * 1000);
  }, []);

  const haveTextWhite = location.pathname.startsWith("/account/");

  const content = loading ? (
    <CartContentSkeleton count={items.length} />
  ) : (
    <div className="w-[370px] p-2">
      <h3 className="text-sm font-normal">{t("user.popup_cart.recently_title")}</h3>
      <List
        dataSource={items}
        renderItem={(item) => (
          <List.Item>
            <div className="flex w-full items-center cursor-pointer p-2 hover:bg-[#f5f5f5]">
              <img src={item.urlImage} alt={item.name} className="w-[40px] h-[40px] mr-2" />
              <div className="flex w-full flex-row justify-between">
                <div className="font-bold line-clamp-1">{item.name}</div>
                <div className="text-red-600 font-semibold">{formatCurrency(item.price)}</div>
              </div>
            </div>
          </List.Item>
        )}
      />
      <div className="mt-4">
        <a href="/checkout">
          <Button type="primary" block>
            {t("user.popup_cart.button_view")}
          </Button>
        </a>
      </div>
    </div>
  );

  return (
    <Popover
      content={content}
      trigger="hover"
      open={visible}
      onOpenChange={handleVisibleChange}
      placement="bottomRight"
    >
      <a href="/checkout">
        <Badge count={items.length} className="text-sm">
          <ShoppingCartOutlined
            className={`cursor-pointer text-2xl ${isBlue && `text-[#0060FF]`} ${
              haveTextWhite && !isDesktop ? "text-white" : ""
            } 
            }`}
          />
        </Badge>
      </a>
    </Popover>
  );
}

export default Cart;
