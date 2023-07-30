import { ShoppingCartOutlined } from "@ant-design/icons";
import { Badge, Button, List, Popover } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import CartContentSkeleton from "./CartContentSkeleton";

interface ICartItem {
  id: number;
  name: string;
  price: number;
  urlImage: string;
}

interface ICartProps {
  items: ICartItem[];
  loading: boolean;
}

function Cart({ items, loading }: ICartProps) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  const handleVisibleChange = (visible: boolean) => {
    setVisible(visible);
  };

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
                <div className="text-red-600 font-semibold">{item.price.toLocaleString()}</div>
              </div>
            </div>
          </List.Item>
        )}
      />
      <div className="mt-4">
        <Button type="primary" block>
          {t("user.popup_cart.button_view")}
        </Button>
      </div>
    </div>
  );

  return (
    <Popover content={content} trigger="hover" open={visible} onOpenChange={handleVisibleChange} placement="bottom">
      <Badge count={items.length}>
        <ShoppingCartOutlined className="cursor-pointer  text-2xl" />
      </Badge>
    </Popover>
  );
}

export default Cart;
