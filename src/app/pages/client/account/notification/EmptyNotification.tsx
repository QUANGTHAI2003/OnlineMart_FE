import Mascot from "@app/app/assets/images/mascot.png";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const EmptyNotification = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full pb-8 text-center text-[14px] rounded-md bg-white">
      <img src={Mascot} alt="IMG" width={160} className="object-cover" />
      <p className="text-noti my-4">{t("user.account_user.account_notification_page.no_notification")}</p>
      <Link
        to="/"
        className="order-btn bg-[#fdd835] py-[5px] px-[20px] text-lg text-[#4a4a4a] rounded-md inline-block mx-auto"
      >
        {t("user.account_user.account_notification_page.no_product")}
      </Link>
    </div>
  );
};

export default EmptyNotification;
