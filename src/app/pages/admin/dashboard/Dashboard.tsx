import { Col } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { TopProductsData, TopProductsTitle } from "../dev_center/biz_efficiency/data";

import { BusinessResults, DualChart, OrdersPending, PieChart, RecentActivities, SellerProfile } from "./components";
import Note from "./components/Note";
import * as S from "./Dashboard.styles";
import {
  DualChartSkeleton,
  OrdersPendingSkeleton,
  PieChartSkeleton,
  RecentActSkeleton,
  SiteHeaderSkeleton,
} from "./skeletons";

const Dashboard = () => {
  const { t } = useTranslation();

  const [loadingSkeletonCount, setLoadingSkeletonCount] = useState<boolean>(false);
  useEffect(() => {
    setLoadingSkeletonCount(true);
    setTimeout(() => {
      setLoadingSkeletonCount(false);
    }, 1000);
  }, []);

  return (
    <div>
      {loadingSkeletonCount ? (
        <SiteHeaderSkeleton count={1} />
      ) : (
        <div>
          <SellerProfile />
          <BusinessResults />
        </div>
      )}

      <S.MainContent>
        <Col xs={24} sm={24} md={24} lg={15} xl={17} className="col_content right_col">
          {loadingSkeletonCount ? <DualChartSkeleton count={1} /> : <DualChart />}

          {loadingSkeletonCount ? <OrdersPendingSkeleton count={1} /> : <OrdersPending />}

          {loadingSkeletonCount ? (
            <PieChartSkeleton count={1} />
          ) : (
            <div className="chart_col">
              <PieChart
                data={TopProductsData}
                thumbnail={TopProductsTitle(t)[0].thumbnail}
                title={TopProductsTitle(t)[0].title}
                tooltip={TopProductsTitle(t)[0].tooltip}
              />
            </div>
          )}
        </Col>

        <Col xs={0} sm={0} md={0} lg={9} xl={7} className="col_content">
          {loadingSkeletonCount ? <RecentActSkeleton count={1} /> : <RecentActivities />}
        </Col>
      </S.MainContent>

      <Note />
    </div>
  );
};

export default Dashboard;
