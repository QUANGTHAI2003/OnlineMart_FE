import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Typography } from "antd";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import * as S from "../Dashboard.styles";
import { SellerProfileData } from "../data";

const { Title, Text } = Typography;

const SellerProfile = () => {
  const { t } = useTranslation();
  const completed = 20;

  return (
    <S.SellerProfile>
      <Title level={3} className="seller_title">
        {`${t("admin_shop.dashboard.profile_completed")} ${completed}%`}
      </Title>

      <div className="profile_box">
        {SellerProfileData(t).map((item) => {
          return (
            <Link to={`profile?${item.link}`} className="box_item" key={item.id} target="_blank">
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
