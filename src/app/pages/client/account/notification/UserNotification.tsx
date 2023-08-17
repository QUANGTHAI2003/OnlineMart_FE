/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import imgHome from "@app/app/assets/images/nofitication/home.png";
import imgOrder from "@app/app/assets/images/nofitication/order.png";
import imgTime from "@app/app/assets/images/nofitication/time.png";
import imgVoucher from "@app/app/assets/images/nofitication/voucher.png";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dropdown, Space } from "antd";
import { useTranslation } from "react-i18next";

import GeneralNotification from "./GeneralNotification";
import OrderNofitication from "./OrderNofitication";
import PromotionNotification from "./PromotionNotification";
import SystemNofitication from "./SystemNofitication";
import * as S from "./UserNotification.styles";
const UserNotification = () => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const { t } = useTranslation();
  const onChange = (key: any) => {
    console.log(key);
  };
  const itemsNofitication = [
    {
      label: (
        <S.NotificationItem>
          <img className="w-[28px] height-[28px]" src={imgHome} alt={imgHome} />
        </S.NotificationItem>
      ),
      key: "home",
      children: <GeneralNotification />,
    },
    {
      label: (
        <S.NotificationItem>
          <img className="w-[28px] height-[28px]" src={imgVoucher} alt={imgVoucher} />
        </S.NotificationItem>
      ),
      key: "voucher",
      children: <PromotionNotification />,
    },
    {
      label: (
        <S.NotificationItem>
          <img className="w-[28px] height-[28px]" src={imgOrder} alt={imgOrder} />
        </S.NotificationItem>
      ),
      key: "order",
      children: <OrderNofitication />,
    },
    {
      label: (
        <S.NotificationItem>
          <img className="w-[28px] height-[28px]" src={imgTime} alt={imgTime} />
        </S.NotificationItem>
      ),
      key: "time",
      children: <SystemNofitication />,
    },
  ];
  const items = [
    {
      label: <p>{t("user.account_user.account_notification_page.read_all")}</p>,
      key: "0",
    },
    {
      label: <p>{t("user.account_user.account_notification_page.remove_all")}</p>,
      key: "1",
    },
  ];
  return (
    <>
      <div className="text-xl mb-3">{t("user.account_user.account_notification")}</div>
      {/* Content */}
      <div className="bg-[#ffffff] rounded-lg border-solid border-2 border-[#f5f5fa]">
        <div className="relative">
          <S.TabsNav defaultActiveKey="1" items={itemsNofitication} onChange={onChange} />
          <Dropdown
            className="absolute right-0 top-0 m-0 mr-5 mt-8"
            placement="bottomRight"
            arrow={{ pointAtCenter: true }}
            menu={{
              items,
            }}
            trigger={["click"]}
          >
            <a onClick={(e) => e.preventDefault()} className="px-5 text-[#666666]">
              <Space>
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </Space>
            </a>
          </Dropdown>
        </div>
      </div>
    </>
  );
};
export default UserNotification;
