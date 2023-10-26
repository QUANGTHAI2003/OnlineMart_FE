import { Avatar, Col, Row, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import * as S from "../Dashboard.styles";
import { RecentActivitiesData } from "../data";

const { Title, Text } = Typography;

const RecentActivities = () => {
  const { t } = useTranslation();

  return (
    <S.RecentActivities>
      <div className="site_header">
        <Title level={4} className="m-0">
          {t("admin_shop.dashboard.recent_act")}
        </Title>
        <Text strong>
          <Link to={"/admin/settings/logs"} target="_blank">
            {t("admin_shop.dashboard.all")}
          </Link>
        </Text>
      </div>

      <div className="content">
        {RecentActivitiesData.map((item) => {
          return (
            <Row key={item.id} className="recent_box">
              <Col span={14} className="box_recent_left">
                <Avatar src={item.avatar} className="avatar" />
                <div className="info">
                  <div className="name line-clamp-2">{item.name}</div>
                  <div className="active_time">{item.active_time}</div>
                </div>
              </Col>

              <Col span={9} className="box_recent_right line-clamp-2">
                {item.action}
              </Col>
            </Row>
          );
        })}
      </div>
    </S.RecentActivities>
  );
};

export default RecentActivities;
