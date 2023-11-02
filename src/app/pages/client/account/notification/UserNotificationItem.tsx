import {
  useDeleteNotificationMutation,
  useUpdateStatusNotificationMutation,
} from "@app/store/slices/api/user/notificationApi";
import { faClipboardList, faClockRotateLeft, faGift } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Modal, notification } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";

import * as S from "./UserNotification.styles";

const UserNotificationItem = ({ notificationData: initialNotification, onUpdate }: any) => {
  const { t } = useTranslation();
  const [notificationData, setNotification] = useState(initialNotification);
  const formattedDate = dayjs(notificationData.created_at).format("DD/MM/YYYY");
  const [updateStatusNotification] = useUpdateStatusNotificationMutation();
  const [deleteNotification] = useDeleteNotificationMutation();

  const handleClick = async () => {
    if (notificationData.status === "unread") {
      await updateStatusNotification({ notificationId: notificationData.id, status: "read" });
      setNotification({ ...notificationData, status: "read" });
      onUpdate();
    }
  };

  const handleDelete = () => {
    Modal.confirm({
      title: t("user.account_user.account_notification_page.confirm_delete"),
      centered: true,
      onOk: async () => {
        await deleteNotification(notificationData.id);
        notification.success({
          message: t("user.account_user.account_notification_page.success"),
          description: t("user.account_user.account_notification_page.delete_success"),
        });
        setNotification(null);
      },
    });
  };

  return (
    <S.ContentNoti key={uuidv4()}>
      <div className="flex items-center gap-10">
        <div className="date text-[#666]">
          <span>{formattedDate}</span>
        </div>

        {notificationData.type === "voucher" && (
          <FontAwesomeIcon icon={faGift} className="p-3 text-xl rounded-full bg-emerald-600 text-white shadow-2xl" />
        )}
        {notificationData.type === "order" && (
          <FontAwesomeIcon
            icon={faClipboardList}
            className="p-3 text-xl rounded-full bg-yellow-400 text-white shadow-2xl w-5 h-5"
          />
        )}
        {notificationData.type === "other" && (
          <FontAwesomeIcon
            icon={faClockRotateLeft}
            className="p-3 text-xl rounded-full bg-pink-600 text-white shadow-2xl"
          />
        )}

        <div className="content">
          <span className="content_item">{notificationData.content}</span>
        </div>
      </div>
      <div className="flex items-center">
        <Button type="link" className="mark_read" onClick={handleClick} disabled={notificationData.status === "read"}>
          {notificationData.status === "unread"
            ? t("user.account_user.account_notification_page.read_an")
            : t("user.account_user.account_notification_page.read")}
        </Button>
        <Button danger type="text" className="delete" onClick={handleDelete}>
          {t("user.account_user.account_notification_page.remove_an")}
        </Button>
      </div>
    </S.ContentNoti>
  );
};

export default UserNotificationItem;
