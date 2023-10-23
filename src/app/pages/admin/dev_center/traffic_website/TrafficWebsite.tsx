import { AdminBreadcrumb } from "@app/app/components/common/Breadcrumb/Breadcrumb";
import { Typography } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { ReportTime, Statistical } from "./components";
import { BreadcrumbSkeleton, ReportTimeSkeleton, StatisticalSkeleton } from "./skeletons";
import * as S from "./TrafficWebsite.styles";

const { Title } = Typography;

const TrafficWebsite = () => {
  const { t } = useTranslation();
  const [range, setRange] = useState<[Dayjs, Dayjs]>([dayjs(), dayjs()]);
  const [selectedLabel, setSelectedLabel] = useState<string>(t("admin_shop.dev_center.biz_efficiency.common.today"));

  const [loadingSkeleton, setLoadingSkeleton] = useState<boolean>(false);
  useEffect(() => {
    setLoadingSkeleton(true);
    setTimeout(() => {
      setLoadingSkeleton(false);
    }, 1000);
  }, []);

  return (
    <>
      {loadingSkeleton ? (
        <BreadcrumbSkeleton count={1} />
      ) : (
        <S.SiteHeader>
          <AdminBreadcrumb />
          <Title level={4} className="m-0">
            {t("admin_shop.dev_center.traffic_website.common.traffic_website")}
          </Title>
        </S.SiteHeader>
      )}

      {loadingSkeleton ? (
        <ReportTimeSkeleton count={1} />
      ) : (
        <ReportTime setSelectedLabel={setSelectedLabel} range={range} setRange={setRange} />
      )}

      {loadingSkeleton ? (
        <StatisticalSkeleton count={1} />
      ) : (
        <Statistical range={range} selectedLabel={selectedLabel} />
      )}
    </>
  );
};

export default TrafficWebsite;
