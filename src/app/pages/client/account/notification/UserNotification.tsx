// TODO: Phải chọn vào tab Notification trong Profile thì mới chạy được badge, khi mới vào giao diện trang chủ sẽ không hiển thị badge

import imgHome from "@app/app/assets/images/nofitication/home.png";
import imgOrder from "@app/app/assets/images/nofitication/order.png";
import imgTime from "@app/app/assets/images/nofitication/time.png";
import imgVoucher from "@app/app/assets/images/nofitication/voucher.png";
import useSyncUrlWithTab from "@app/hooks/useSyncUrlWithTab";
import {
  useDeleteMassNotificationMutation,
  useGetNotificationsByUserQuery,
  useUpdateMassStatusNotificationMutation,
} from "@app/store/slices/api/user/notificationApi";
import { setNotification, setNotificationCount } from "@app/store/slices/redux/showNotificationSlice";
import { useAppDispatch, useAppSelector } from "@app/store/store";
import { INotification } from "@app/types/notifications.types";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge, Button, Dropdown, Modal, notification, Space } from "antd";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";

import EmptyNotification from "./EmptyNotification";
import NotificationSkeleton from "./skeletons/NotificationSkeleton";
import * as S from "./UserNotification.styles";
import UserNotificationItem from "./UserNotificationItem";

const UserNotification = () => {
  const { t } = useTranslation();
  const userId = useAppSelector((state) => state.userState.user)?.id;
  const { data: notificationsData, isFetching, refetch } = useGetNotificationsByUserQuery(userId);
  const [updateMassStatusNotification] = useUpdateMassStatusNotificationMutation();
  const [deleteMassNotification] = useDeleteMassNotificationMutation();

  const dispatch = useAppDispatch();
  const unreadNotifications = notificationsData?.filter((notification: any) => notification.status === "unread");

  const isHaveNotify = unreadNotifications?.length > 0;
  const countNotify = unreadNotifications?.length;

  const hasUnreadInVoucher = unreadNotifications?.some((notification: any) => notification.type === "voucher");
  const hasUnreadInOrder = unreadNotifications?.some((notification: any) => notification.type === "order");
  const hasUnreadInOther = unreadNotifications?.some((notification: any) => notification.type === "other");

  const handleNotificationUpdate = () => {
    refetch();
  };

  useEffect(() => {
    dispatch(setNotification(isHaveNotify));
    dispatch(setNotificationCount(countNotify));
  }, [countNotify, dispatch, isHaveNotify]);

  const NofiticationTab = [
    {
      label: (
        <S.NotificationItem>
          {hasUnreadInVoucher || hasUnreadInOrder || hasUnreadInOther ? (
            <Badge dot>
              <img className="w-[28px] height-[28px]" src={imgHome} alt={imgHome} />
            </Badge>
          ) : (
            <img className="w-[28px] height-[28px]" src={imgHome} alt={imgHome} />
          )}
        </S.NotificationItem>
      ),
      key: "home",
      tab: "home",
    },
    {
      label: (
        <S.NotificationItem>
          {hasUnreadInVoucher ? (
            <Badge dot>
              <img className="w-[28px] height-[28px]" src={imgVoucher} alt={imgVoucher} />
            </Badge>
          ) : (
            <img className="w-[28px] height-[28px]" src={imgVoucher} alt={imgVoucher} />
          )}
        </S.NotificationItem>
      ),
      key: "voucher",
      tab: "voucher",
    },
    {
      label: (
        <S.NotificationItem>
          {hasUnreadInOrder ? (
            <Badge dot>
              <img className="w-[28px] height-[28px]" src={imgOrder} alt={imgOrder} />
            </Badge>
          ) : (
            <img className="w-[28px] height-[28px]" src={imgOrder} alt={imgOrder} />
          )}
        </S.NotificationItem>
      ),
      key: "order",
      tab: "order",
    },
    {
      label: (
        <S.NotificationItem>
          {hasUnreadInOther ? (
            <Badge dot>
              <img className="w-[28px] height-[28px]" src={imgTime} alt={imgTime} />
            </Badge>
          ) : (
            <img className="w-[28px] height-[28px]" src={imgTime} alt={imgTime} />
          )}
        </S.NotificationItem>
      ),
      key: "other",
      tab: "other",
    },
  ];

  const initialTab = NofiticationTab[0].tab;
  const { tabFiltered, handleChangeTab } = useSyncUrlWithTab(initialTab, "tab");
  const filteredNotification =
    tabFiltered === "home"
      ? notificationsData
      : notificationsData?.filter((notificationData: INotification) => notificationData?.type === tabFiltered);

  const visibleData = filteredNotification?.map((notificationData: INotification) =>
    notificationData ? (
      <UserNotificationItem key={uuidv4()} notificationData={notificationData} onUpdate={handleNotificationUpdate} />
    ) : null
  );

  const visibleNotification = NofiticationTab.map((item: any) => ({
    key: item.key,
    label: item.label,
    children: isFetching ? (
      <NotificationSkeleton count={4} />
    ) : visibleData?.length > 0 ? (
      visibleData
    ) : (
      <EmptyNotification />
    ),
  }));

  const element = visibleNotification;

  const handleMarkAllAsRead = () => {
    Modal.confirm({
      title: t("user.account_user.account_notification_page.confirm_mark_all"),
      centered: true,
      onOk: async () => {
        if (tabFiltered === "home") {
          await updateMassStatusNotification({ type: "home", status: "read" });
        } else {
          await updateMassStatusNotification({ type: tabFiltered, status: "read" });
        }
        notification.success({
          message: t("user.account_user.account_notification_page.success"),
          description: t("user.account_user.account_notification_page.mark_all_success"),
        });
        refetch();
      },
    });
  };

  const handleDeleteAll = () => {
    Modal.confirm({
      title: t("user.account_user.account_notification_page.confirm_delete_all"),
      centered: true,
      onOk: async () => {
        await deleteMassNotification({ type: tabFiltered });
        notification.success({
          message: t("user.account_user.account_notification_page.success"),
          description: t("user.account_user.account_notification_page.delete_all_success"),
        });
        refetch();
      },
    });
  };

  const items = [
    {
      label: (
        <button onClick={handleMarkAllAsRead} className="border-0 p-1 cursor-pointer bg-transparent">
          {t("user.account_user.account_notification_page.read_all")}
        </button>
      ),
      key: "0",
    },
    {
      label: (
        <button onClick={handleDeleteAll} className="border-0 p-1 cursor-pointer bg-transparent">
          {t("user.account_user.account_notification_page.remove_all")}
        </button>
      ),
      key: "1",
    },
  ];

  return (
    <>
      <div className="text-xl mb-3">{t("user.account_user.account_notification")}</div>
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
                <Button className="mark_mass border-none">
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
