/* eslint-disable react/jsx-one-expression-per-line */
import { useGetNotificationsByUserQuery } from "@app/store/slices/api/user/notificationApi";
import { useAppSelector } from "@app/store/store";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { faClipboardList, faClockRotateLeft, faGift } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge, Popover } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function Notification() {
  const { t } = useTranslation();
  const userId = useAppSelector((state) => state.userState.user)?.id;
  const { data: notificationsData } = useGetNotificationsByUserQuery(userId);
  const notifications = notificationsData || [];

  const { isShowNotification, notificationCount } = useAppSelector((state) => state.isNotify);

  const [visible, setVisible] = useState(false);
  const [showLess, setShowLess] = useState(true);

  const handleMouseEnter = () => {
    setVisible(true);
  };

  const handleMouseLeave = () => {
    setVisible(false);
  };

  useEffect(() => {
    setShowLess(true);
  }, [visible]);

  const content = (
    <div className="notification-popover-content mx-auto">
      <div className="text-left text-lg mb-2 text-gray-500">{t("user.notifications.notifications")}</div>
      <div className="notification-items-container flex flex-col flex-wrap gap-1">
        {notifications.slice(0, showLess ? 4 : notifications.length).map((notification: any) => (
          <Link
            to={""}
            className="notification-item flex items-center gap-2 py-1 hover:bg-[#f0f9ff]"
            key={notification.id}
          >
            <div className="flex-shrink-0">
              {notification.type === "voucher" && (
                <FontAwesomeIcon
                  icon={faGift}
                  className="p-3 text-xl rounded-full bg-emerald-600 text-white shadow-2xl"
                />
              )}
              {notification.type === "order" && (
                <FontAwesomeIcon
                  icon={faClipboardList}
                  className="p-3 text-xl rounded-full bg-yellow-400 text-white shadow-2xl w-5 h-5"
                />
              )}
              {notification.type === "other" && (
                <FontAwesomeIcon
                  icon={faClockRotateLeft}
                  className="p-3 text-xl rounded-full bg-pink-600 text-white shadow-2xl"
                />
              )}
            </div>
            <div className="notification-text ml-2 w-96">
              <div className="notification-title font-medium text-gray-800 truncate">{notification.title}</div>
              <div className="notification-content text-sm whitespace-pre-line line-clamp-2 text-gray-600 truncate">
                {notification.content}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <button
        className="text-black border-none flex bg-white mx-auto items-center justify-center py-2 px-4 cursor-pointer"
        onClick={() => setShowLess(!showLess)}
        aria-label={showLess ? t("user.notifications.show_all") : t("user.notifications.show_less")}
      >
        {showLess ? t("user.notifications.show_all") : t("user.notifications.show_less")}
      </button>
    </div>
  );

  return (
    <Popover content={content} placement="bottomRight" trigger="hover">
      <div
        className="text-black flex items-center text-right cursor-pointer mr-2"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Badge size="small" count={isShowNotification ? notificationCount : 0}>
          <span className="text-lg">
            <FontAwesomeIcon icon={faBell} />
          </span>
        </Badge>
      </div>
    </Popover>
  );
}

export default Notification;
