import { Empty } from "antd";
import { useTranslation } from "react-i18next";

const EmptyOrder: React.FC = () => {
  const { t } = useTranslation();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return (
    <Empty
      className="py-16"
      image="https://frontend.tikicdn.com/_desktop-next/static/img/account/empty-order.png"
      imageStyle={{ height: 220 }}
      description={<span>{t("user.orders.order_details.no_cart")}</span>}
    />
  );
};

export default EmptyOrder;
