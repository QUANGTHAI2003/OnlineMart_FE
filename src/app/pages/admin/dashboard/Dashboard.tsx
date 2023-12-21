import openShop from "@app/app/assets/images/openShop.png";
import { useGetInfoShopRootQuery } from "@app/store/slices/api/admin/adminShopApi";
import { useAppSelector } from "@app/store/store";
import { Button, Col, Modal, Typography } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { TopProductsTitle } from "../dev_center/biz_efficiency/data";

import { BusinessResults, DualChart, OrdersPending, PieChart, RecentActivities, SellerProfile } from "./components";
import * as S from "./Dashboard.styles";
import {
  DualChartSkeleton,
  OrdersPendingSkeleton,
  PieChartSkeleton,
  RecentActSkeleton,
  SiteHeaderSkeleton,
} from "./skeletons";

const { Title } = Typography;

const Dashboard = () => {
  const { t } = useTranslation();

  const shopId = useAppSelector((state) => state.userState.user?.shop_id);
  const { data: shopInfomation } = useGetInfoShopRootQuery(shopId);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [loadingSkeletonCount, setLoadingSkeletonCount] = useState<boolean>(false);
  useEffect(() => {
    setLoadingSkeletonCount(true);
    setTimeout(() => {
      setLoadingSkeletonCount(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (shopInfomation?.type !== "1") {
      setIsModalOpen(true);
    }
  }, [shopInfomation?.type]);

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Modal
        open={isModalOpen}
        footer={[
          <Button key="back" type="primary" size="large" block onClick={handleOk}>
            {t("admin_shop.dashboard.complete_now")}
          </Button>,
        ]}
        onCancel={handleCancel}
      >
        <div className="flex justify-center flex-col items-center px-4">
          <img src={openShop} width="280" height="280" alt="openShop" />
          <Title className="px-8 text-center" level={4}>
            {shopInfomation?.type === "0" ? (
              <div>{t("admin_shop.dashboard.complete")}</div>
            ) : shopInfomation?.type === "2" ? (
              <span>{shopInfomation?.reason_accpect}</span>
            ) : null}
          </Title>
        </div>
      </Modal>
      <div>
        {loadingSkeletonCount ? (
          <SiteHeaderSkeleton count={1} />
        ) : (
          <div>
            <SellerProfile shopInfomation={shopInfomation} />
            {shopInfomation?.type === "1" && <BusinessResults />}
          </div>
        )}
        {shopInfomation?.type === "1" && (
          <S.MainContent>
            <Col xs={24} sm={24} md={24} lg={15} xl={17} className="col_content right_col">
              {loadingSkeletonCount ? <DualChartSkeleton count={1} /> : <DualChart />}

              {loadingSkeletonCount ? <OrdersPendingSkeleton count={1} /> : <OrdersPending />}

              {loadingSkeletonCount ? (
                <PieChartSkeleton count={1} />
              ) : (
                <div className="chart_col">
                  <PieChart
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
        )}
      </div>
    </>
  );
};

export default Dashboard;
