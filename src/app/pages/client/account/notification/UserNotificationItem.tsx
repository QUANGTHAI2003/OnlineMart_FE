import { Button } from "antd";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";
import * as S from "./UserNotification.styles";

const UserNotificationItem = ({ data, image }: any) => {
  const { t } = useTranslation();
  return (
    <div className="content-noti w-ful mb-6 text-center text-[14px] rounded-md bg-white">
      {data?.map((item: any) => {
        return (
          <S.ContentNoti key={uuidv4()}>
            <div className="flex items-center">
              <div className="date mr-14">
                <span>{item.date}</span>
              </div>
              <img src={image} alt="IMG" className="object-cover bg-[#DC3A85] rounded-full  " />
              <div className="ml-14 title-content">
                <span className="title">{item.title}</span>
              </div>
            </div>
            <div className="flex items-center">
              <Button type="link">{t("user.account_user.account_notification_page.read_an")}</Button>
              <Button danger type="text">
                {t("user.account_user.account_notification_page.remove_an")}
              </Button>
            </div>
          </S.ContentNoti>
        );
      })}
    </div>
  );
};

export default UserNotificationItem;
