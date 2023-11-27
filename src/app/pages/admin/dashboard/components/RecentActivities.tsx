import { useGetActivityLogQuery } from "@app/store/slices/api/activityApi";
import { IActivity } from "@app/types/activity.types";
import { Avatar, Col, Row, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import * as S from "../Dashboard.styles";

const { Title, Text } = Typography;

const RecentActivities = () => {
  const { t } = useTranslation();
  const { data: activities } = useGetActivityLogQuery();
  const baseImage = import.meta.env.VITE_BASE_IMAGE_URL as string;

  return (
    <S.RecentActivities>
      <div className="site_header">
        <Title level={4} className="m-0">
          {t("admin_shop.dashboard.recent_act")}
        </Title>
        <Text strong>
          <Link to={"/admin/shop/settings/logs"} target="_blank">
            {t("admin_shop.dashboard.all")}
          </Link>
        </Text>
      </div>

      <div className="content">
        {activities &&
          activities.map((activity: IActivity) => (
            <Row key={activity?.id} className="recent_box">
              <Col span={14} className="box_recent_left">
                <Avatar src={`${baseImage}/${activity?.avatar}`} className="avatar" />
                <div className="info">
                  <div className="name line-clamp-2">{activity?.author}</div>
                  <div className="active_time">{activity?.action_date}</div>
                </div>
              </Col>
              <Col span={9} className="box_recent_right line-clamp-2">
                {activity?.content}
              </Col>
            </Row>
          ))}
      </div>
    </S.RecentActivities>
  );
};

export default RecentActivities;
