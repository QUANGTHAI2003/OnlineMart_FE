import type { TabsProps } from "antd";
import { useTranslation } from "react-i18next";

import * as S from "./Discount.styles";
import DiscountItem from "./DiscountItem";
import EmptyDiscount from "./EmptyDiscount";

const DiscountTicketData = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1691394790591-b1ce2093b045?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=60",
    name: "Zalo",
    count: 80000,
    total: 3000000,
    code: "KhanhAn",
    expiry: "31/09/2023",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1682687218904-de46ed992b58?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=600&q=60",
    name: "Nhà bán",
    count: 110000,
    total: 3000000,
    code: "dsadsadasd",
    expiry: "13/09/2023",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1691441131483-7901e11ba084?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMnx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=60",
    name: "Nhà bán 2",
    count: 120000,
    total: 3000000,
    code: "hhhhhhhhhhh",
    expiry: "15/09/2023",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1691441131483-7901e11ba084?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMnx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=60",
    name: "Nhà bán 5",
    count: 140000,
    total: 3000000,
    code: "ooooooooooo",
    expiry: "23/09/2023",
  },
];

const Discount = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, react-hooks/exhaustive-deps
  const { t } = useTranslation();
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: t("user.voucher.all"),
      children: DiscountTicketData.map((item) => {
        return (
          <DiscountItem
            key={item.id}
            image={item.image}
            id={item.id}
            name={item.name}
            count={item.count}
            total={item.total}
            code={item.code}
            expiry={item.expiry}
          />
        );
      }),
    },
    {
      key: "2",
      label: `Tiki`,
      children: <EmptyDiscount />,
    },
    {
      key: "3",
      label: t("user.voucher.shop"),
      children: <EmptyDiscount />,
    },
    {
      key: "4",
      label: t("user.voucher.payment-offer"),
      children: <EmptyDiscount />,
    },
    {
      key: "5",
      label: t("user.voucher.expire"),
      children: <EmptyDiscount />,
    },
  ];
  return (
    <div className="bg-[#f5f5fa]">
      <span className="text-base font-normal">{t("user.voucher.name")}</span>
      <S.DiscountTab defaultActiveKey="1" items={items} />
    </div>
  );
};

export default Discount;
