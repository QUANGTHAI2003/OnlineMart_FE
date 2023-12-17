import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Typography } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import * as S from "../Dashboard.styles";
import { SellerProfileData } from "../data";

const { Text } = Typography;

const SellerProfile = (shopInfomation: any) => {
  const { t } = useTranslation();

  console.log({ shopInfomation });
  const [completed, setCompleted] = useState(25);

  useEffect(() => {
    const requiredProperties = ["type", "name_bank", "national_id"];

    let newCompleted = 25;
    for (const property of requiredProperties) {
      if (property === "type" && shopInfomation[property] === "1") {
        newCompleted += 25;
      } else if (property === "name_bank" && shopInfomation[property] === null) {
        newCompleted += 25;
      } else if (property === "national_id" && shopInfomation[property] !== null) {
        newCompleted += 25;
      }
    }

    setCompleted(newCompleted);
  }, [shopInfomation]);

  return (
    <S.SellerProfile>
      <div className="text-center leading-7 text-lg font-bold ">
        <span>{t("admin_shop.dashboard.profile_completed")}</span>
        <span className="bg-[#1890ff] px-1 mx-1 text-white rounded-sm">{`${completed}%`}</span>
      </div>

      <div className="profile_box">
        {SellerProfileData(t, shopInfomation).map((item) => {
          return (
            <Link to={`profile${item.link}`} className={`box_item ${item.disable}`} key={item.id}>
              <div className="site_header">
                <FontAwesomeIcon icon={item.icon} className="icon" />
                <Text strong className="title">
                  {item.title}
                </Text>
              </div>
              <div className="description">
                <p className="caption">{item.caption}</p>
                <div className="link">{item.link_title}</div>
              </div>
              <p className="status">{item.status}</p>
            </Link>
          );
        })}
      </div>
    </S.SellerProfile>
  );
};

export default SellerProfile;
