import imgHome from "@app/app/assets/images/nofitication/home.png";
import imgOrder from "@app/app/assets/images/nofitication/order.png";
import imgTime from "@app/app/assets/images/nofitication/time.png";
import imgVoucher from "@app/app/assets/images/nofitication/voucher.png";
import imgItem from "@app/app/assets/images/nofitication/nofiticationItem.png";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { INotification } from "./ListNotification.interface";
import { Button, Dropdown, Space } from "antd";
import { useTranslation } from "react-i18next";
import { data } from "./data";
import * as S from "./UserNotification.styles";
import useSyncUrlWithTab from "@app/hooks/useSyncUrlWithTab";
import UserNotificationItem from "./UserNotificationItem";
import EmptyNotification from "./EmptyNotification";
import { v4 as uuidv4 } from "uuid";

const UserNotification = () => {
  const { t } = useTranslation();
  const NofiticationTab = [
    {
      label: (
        <S.NotificationItem>
          <img className="w-[28px] height-[28px]" src={imgHome} alt={imgHome} />
        </S.NotificationItem>
      ),
      key: "home",
      tab: "home",
    },
    {
      label: (
        <S.NotificationItem>
          <img className="w-[28px] height-[28px]" src={imgVoucher} alt={imgVoucher} />
        </S.NotificationItem>
      ),
      key: "voucher",
      tab: "voucher",
    },
    {
      label: (
        <S.NotificationItem>
          <img className="w-[28px] height-[28px]" src={imgOrder} alt={imgOrder} />
        </S.NotificationItem>
      ),
      key: "order",
      tab: "order",
    },
    {
      label: (
        <S.NotificationItem>
          <img className="w-[28px] height-[28px]" src={imgTime} alt={imgTime} />
        </S.NotificationItem>
      ),
      key: "time",
      tab: "time",
    },
  ];

  const initialTab = NofiticationTab[0].tab;
  const { tabFiltered, handleChangeTab } = useSyncUrlWithTab(initialTab, "tab");
  const filteredNotification =
    tabFiltered === "home" ? data : data.filter((notification: INotification) => notification.slug === tabFiltered);
  const visibleData = filteredNotification.map((notification: INotification) => (
    <UserNotificationItem key={uuidv4()} data={notification.items} image={imgItem} />
  ));
  const visibleNotification = NofiticationTab.map((item: any) => ({
    key: item.key,
    label: item.label,
    children: visibleData.length > 0 ? visibleData : <EmptyNotification />,
  }));
  const element = visibleNotification;
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
          <S.TabsNav
            items={element}
            onChange={handleChangeTab}
            activeKey={tabFiltered}
            tabBarExtraContent={
              <Dropdown
                placement="bottomRight"
                arrow={{ pointAtCenter: true }}
                menu={{
                  items,
                }}
                trigger={["click"]}
              >
                <Button onClick={(e) => e.preventDefault()} className="text-black border-none">
                  <Space>
                    <FontAwesomeIcon icon={faEllipsisVertical} />
                  </Space>
                </Button>
              </Dropdown>
            }
          />
        </div>
      </div>
    </>
  );
};
export default UserNotification;
