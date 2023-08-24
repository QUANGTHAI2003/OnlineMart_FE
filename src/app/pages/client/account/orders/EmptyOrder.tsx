import { Empty } from "antd";

const EmptyOrder: React.FC = () => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return (
    <Empty
      className="py-16"
      image="https://frontend.tikicdn.com/_desktop-next/static/img/account/empty-order.png"
      imageStyle={{ height: 220 }}
      description={<span>Chưa có đơn hàng</span>}
    />
  );
};

export default EmptyOrder;
