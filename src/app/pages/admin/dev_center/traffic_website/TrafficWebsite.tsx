import { AdminBreadcrumb } from "@app/app/components/common/Breadcrumb/Breadcrumb";
import { useGetTrafficQuery } from "@app/store/slices/api/admin/trafficApi";
import { useAppSelector } from "@app/store/store";
import { Typography } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { ReportTime, Statistical } from "./components";
import { StatisticalSkeleton } from "./skeletons";
import * as S from "./TrafficWebsite.styles";

const { Title } = Typography;

const TrafficWebsite = () => {
  const { t } = useTranslation();

  const deviceType = useAppSelector((state) => state.trafficAdmin.deviceType);
  const pageType = useAppSelector((state) => state.trafficAdmin.pageType);
  const { startDate, endDate } = useAppSelector((state) => state.trafficAdmin.dateFilter);

  const { data: trafficData, isFetching } = useGetTrafficQuery(
    {
      device_type: deviceType,
      page_type: pageType,
      start_date: startDate,
      end_date: endDate,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const [range, setRange] = useState<[Dayjs, Dayjs]>([dayjs(), dayjs()]);
  const [selectedLabel, setSelectedLabel] = useState<string>(t("admin_shop.dev_center.biz_efficiency.common.today"));

  return (
    <>
      <S.SiteHeader>
        <AdminBreadcrumb />
        <Title level={4} className="m-0">
          {t("admin_shop.dev_center.traffic_website.common.traffic_website")}
        </Title>
      </S.SiteHeader>

      <ReportTime setSelectedLabel={setSelectedLabel} range={range} setRange={setRange} />

      {isFetching ? (
        <StatisticalSkeleton count={1} />
      ) : (
        <Statistical trafficData={trafficData} range={range} selectedLabel={selectedLabel} />
      )}
    </>
  );
};

export default TrafficWebsite;
