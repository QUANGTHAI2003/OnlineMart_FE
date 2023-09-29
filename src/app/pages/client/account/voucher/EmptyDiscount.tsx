import EmptyDiscountImg from "@app/app/assets/images/empty_discount.svg";
import { Empty } from "antd";
import { useTranslation } from "react-i18next";

const EmptyDiscount: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="w-full">
      <Empty
        className="py-16"
        image={EmptyDiscountImg}
        imageStyle={{ height: 220 }}
        description={<span>{t("user.voucher.empty")}</span>}
      />
    </div>
  );
};

export default EmptyDiscount;
