import { AdminBreadcrumb } from "@app/app/components/common/Breadcrumb/Breadcrumb";
import { Typography } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { OrderStatus, StatisticalChart } from "./components";
import * as S from "./SalesReport.styles";
import { BreadcrumbSkeleton, OrderStatusSkeleton, StatisticalSkeleton } from "./skeletons";

const { Title } = Typography;

const SalesReport = () => {
  const { t } = useTranslation();

  const [loadingSkeleton, setLoadingSkeleton] = useState<boolean>(false);
  useEffect(() => {
    setLoadingSkeleton(true);
    setTimeout(() => {
      setLoadingSkeleton(false);
    }, 1000);
  }, []);

  return (
    <S.SalesReport>
      {loadingSkeleton ? (
        <BreadcrumbSkeleton count={1} />
      ) : (
        <div className="site_header">
          <AdminBreadcrumb />

          <Title level={4} className="m-0">
            {t("admin_shop.reports.sales.common.sales_report")}
          </Title>
        </div>
      )}

      <div className="content">
        {loadingSkeleton ? <StatisticalSkeleton count={1} /> : <StatisticalChart />}

        {loadingSkeleton ? <OrderStatusSkeleton count={1} /> : <OrderStatus />}
      </div>
    </S.SalesReport>
  );
};

export default SalesReport;
