import { faBell, faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { faListUl } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Badge, Divider } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import * as S from "../AdminMainHeader.styles";
import NotificationSkeleton from "../skeletons/NotificationSkeleton";

const notification = [
  {
    id: 1,
    thumbnail: "https://salt.tikicdn.com/ts/sellercenterFE/a8/f2/0e/7b86528a6e9e973ede2da256173bfef1.jpeg",
    title: "Title adsffffffffffffff",
    subTitle:
      "Sub title Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum et facilis quos quia voluptatem quaerat eum, a labore, cum plaofficia quibusdam sapiente totam atque in debitis?",
    time: "15/09/2023 05:37:13",
    circleNotify: "badge_disable",
    aintSeenTitle: "",
  },
  {
    id: 2,
    thumbnail: "https://salt.tikicdn.com/ts/sellercenterFE/a8/f2/0e/7b86528a6e9e973ede2da256173bfef1.jpeg",
    title:
      "Title Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores illum nesciunt rerum possimus perferendis enim voluptatum sunt sit molestias, veritatis unde repudiandae beatae odit, ullam cum, in itaque. Numquam, maxime.",
    subTitle: "Sub title",
    time: "15/09/2023 05:37:13",
    circleNotify: "badge",
    aintSeenTitle: "aintSeenTitle",
  },
  {
    id: 3,
    thumbnail: "https://salt.tikicdn.com/ts/sellercenterFE/a8/f2/0e/7b86528a6e9e973ede2da256173bfef1.jpeg",
    title: "Title adsffffffffffffff",
    subTitle:
      "Sub title Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum et facilis quos quia voluptatem quaerat eum, a labore, cum plaofficia quibusdam sapiente totam atque in debitis?",
    time: "15/09/2023 05:37:13",
    circleNotify: "badge_disable",
    aintSeenTitle: "",
  },
  {
    id: 4,
    thumbnail: "https://salt.tikicdn.com/ts/sellercenterFE/a8/f2/0e/7b86528a6e9e973ede2da256173bfef1.jpeg",
    title: "Title adsffffffffffffff",
    subTitle:
      "Sub title Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum et facilis quos quia voluptatem quaerat eum, a labore, cum plaofficia quibusdam sapiente totam atque in debitis?",
    time: "15/09/2023 05:37:13",
    circleNotify: "badge_disable",
    aintSeenTitle: "",
  },
  {
    id: 5,
    thumbnail: "https://salt.tikicdn.com/ts/sellercenterFE/a8/f2/0e/7b86528a6e9e973ede2da256173bfef1.jpeg",
    title: "Title adsffffffffffffff",
    subTitle:
      "Sub title Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum et facilis quos quia voluptatem quaerat eum, a labore, cum plaofficia quibusdam sapiente totam atque in debitis?",
    time: "15/09/2023 05:37:13",
    circleNotify: "badge_disable",
    aintSeenTitle: "",
  },
  {
    id: 6,
    thumbnail: "https://salt.tikicdn.com/ts/sellercenterFE/a8/f2/0e/7b86528a6e9e973ede2da256173bfef1.jpeg",
    title: "Title adsffffffffffffff",
    subTitle: "Sub title asdfafffffffffff",
    time: "15/09/2023 05:37:13",
    circleNotify: "badge",
    aintSeenTitle: "aintSeenTitle",
  },
  {
    id: 7,
    thumbnail: "https://salt.tikicdn.com/ts/sellercenterFE/a8/f2/0e/7b86528a6e9e973ede2da256173bfef1.jpeg",
    title: "Title adsffffffffffffff",
    subTitle:
      "Sub title Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum et facilis quos quia voluptatem quaerat eum, a labore, cum plaofficia quibusdam sapiente totam atque in debitis?",
    time: "15/09/2023 05:37:13",
    circleNotify: "badge_disable",
    aintSeenTitle: "",
  },
];

const NotificationItem = () => {
  const { t } = useTranslation();

  const [loadingSkeletonCount, setLoadingSkeletonCount] = useState<boolean>(false);

  useEffect(() => {
    setLoadingSkeletonCount(true);
    setTimeout(() => {
      setLoadingSkeletonCount(false);
    }, 3000);
  }, []);

  const [open, setOpen] = useState(false);

  const showDefaultDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const current_number = 5;

  return (
    <div>
      {loadingSkeletonCount ? (
        <NotificationSkeleton count={1} />
      ) : (
        <S.NotificationItem className="notification_item">
          <Badge count={current_number} offset={[-3, 4]} className="badge_notify">
            <Button onClick={showDefaultDrawer} className="button_notify">
              <span className="anticon">
                <FontAwesomeIcon icon={faBell} className="icon" />
              </span>
            </Button>
          </Badge>

          <S.DrawerNotify
            title={
              <div className="notifyTitleContainer">
                <div className="notifyTitle">{t("admin_shop.header.notifications")}</div>
                <div className="notifyAction">
                  <a href="see_all" className="notifyViewDetail">
                    <div>
                      <FontAwesomeIcon icon={faListUl} className="icon" />
                    </div>
                    <div>{t("admin_shop.header.view_all")}</div>
                  </a>

                  <div className="divider">
                    <Divider className="divider_item" />
                  </div>

                  <a href="seen_all" className="notifyViewDetail">
                    <div>
                      <FontAwesomeIcon icon={faCircleCheck} className="icon" />
                    </div>
                    <div>{t("admin_shop.header.read_all")}</div>
                  </a>
                </div>
              </div>
            }
            placement="right"
            open={open}
            onClose={onClose}
            width={window.innerWidth > 768 ? 402 : "50%"}
          >
            {notification.map((notify) => {
              return (
                <div key={notify.id} className="notifyList">
                  <div className="notifyItem">
                    <img src={notify.thumbnail} alt="notification item" className="thumbnail" />
                    <div className="notifyContent">
                      <div className="title">
                        <div className={notify.aintSeenTitle}>
                          <div className="title_item">{notify.title}</div>
                          <Badge status="warning" className={notify.circleNotify} />
                        </div>
                      </div>
                      <div className="subTitle">{notify.subTitle}</div>
                      <div className="time">{notify.time}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </S.DrawerNotify>
        </S.NotificationItem>
      )}
    </div>
  );
};

export default NotificationItem;
