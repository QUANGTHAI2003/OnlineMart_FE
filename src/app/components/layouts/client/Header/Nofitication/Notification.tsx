import { faBell } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Popover } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

// import { useTranslation } from "react-i18next";

function Notification() {
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

  const notifications = [
    {
      id: 1,
      image_url: "https://cdn.sforum.vn/sforum/wp-content/uploads/2018/11/2-10.png",
      title: "Thông báo 1 Thông báo 1 Thông báo 1 Thông báo 1 Thông báo 1 Thông báo 1Thông báo 1",
      content: "Nội dung ngắn",
    },
    {
      id: 2,
      image_url: "https://vapa.vn/wp-content/uploads/2022/12/anh-cute-001-1.jpg",
      title: "Thông báo 2",
      content:
        "Nội dung dài quá sẽ bị  Nội dung dài quá sẽ bị  Nội dung dài quá sẽ bị  Nội dung dài quá sẽ bị Nội dung dài quá sẽ bị ZXCZXXC",
    },
    {
      id: 3,
      image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo1OaW3VfQMuHMJiqrUGUxoEUDI4aNVu6mWQ&usqp=CAU",
      title: "Thông báo 3",
      content: "Nội dung thông báo 3",
    },
    {
      id: 4,
      image_url: "https://cdn.sforum.vn/sforum/wp-content/uploads/2018/11/2-10.png",
      title: "Nội dung 4",
      content: "Nội dung ngắn",
    },
    {
      id: 5,
      image_url: "https://vapa.vn/wp-content/uploads/2022/12/anh-cute-001-1.jpg",
      title: "Nội dung 5",
      content: "Nội dung dài quá sẽ bị áidjasdiasjdisji",
    },
    {
      id: 6,
      image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo1OaW3VfQMuHMJiqrUGUxoEUDI4aNVu6mWQ&usqp=CAU",
      title: "Nội dung 6",
      content: "Nội dung thông báo 3",
    },
  ];

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const { t } = useTranslation();
  const content = (
    <div className="notification-popover-content mx-auto">
      <div className="text-left text-lg mb-2 text-gray-500">{t("user.notifications.my_notifications")}</div>
      <div className="notification-items-container flex-wrap">
        {notifications.slice(0, showLess ? 4 : notifications.length).map((notification) => (
          <div className="notification-item flex items-center mb-2" key={notification.id}>
            <div className="flex-shrink-0">
              <img src={notification.image_url} alt={notification.title} className="notification-image w-12 h-12" />
            </div>
            <div className="notification-text ml-2 w-96">
              <div className="notification-title font-medium text-gray-800 truncate">{notification.title}</div>
              <div className="notification-content text-sm whitespace-pre-line line-clamp-2 text-gray-600 truncate">
                {notification.content}
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        className=" text-black border-none flex bg-white mx-auto items-center justify-center py-2 px-4"
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
        className="text-black w-4/12 text-right rounded-full cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <span className="text-lg">
          <FontAwesomeIcon icon={faBell} />
        </span>
        <span className="ps-2"> Notifications </span>
      </div>
    </Popover>
  );
}

export default Notification;
