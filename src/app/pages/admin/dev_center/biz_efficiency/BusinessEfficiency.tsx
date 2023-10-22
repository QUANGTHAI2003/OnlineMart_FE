import { AdminBreadcrumb } from "@app/app/components/common/Breadcrumb/Breadcrumb";
import { Col, Typography } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import * as S from "./BusinessEfficiency.styles";
import { PieChart, ReportTime, Statistical } from "./components";
import Note from "./components/Note";
import { TopCitiesData, TopCitiesTitle, TopProductsData, TopProductsTitle } from "./data";
import { BreadcrumbSkeleton, PieChartSkeleton, ReportTimeSkeleton, StatisticalSkeleton } from "./skeletons";

const { Title } = Typography;

const BusinessEfficiency = () => {
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
            {t("admin_shop.dev_center.biz_efficiency.common.biz_efficiency")}
          </Title>
        </S.SiteHeader>
      )}

      {loadingSkeleton ? (
        <ReportTimeSkeleton count={1} />
      ) : (
        <ReportTime setRangeInPieChart={setRange} setSelectedLabel={setSelectedLabel} />
      )}
      {loadingSkeleton ? (
        <StatisticalSkeleton count={1} />
      ) : (
        <Statistical range={range} selectedLabel={selectedLabel} />
      )}

      {loadingSkeleton ? (
        <PieChartSkeleton count={1} />
      ) : (
        <S.PieChartContainer>
          <Col md={24} xl={12} className="chart_col">
            <PieChart
              data={TopProductsData}
              thumbnail={TopProductsTitle(t)[0].thumbnail}
              title={TopProductsTitle(t)[0].title}
              tooltip={TopProductsTitle(t)[0].tooltip}
              see_more_link={TopProductsTitle(t)[0].see_more_link}
              range={range}
              selectedLabel={selectedLabel}
            />
          </Col>
          <Col md={24} xl={12} className="chart_col">
            <PieChart
              data={TopCitiesData}
              thumbnail={TopCitiesTitle(t)[0].thumbnail}
              title={TopCitiesTitle(t)[0].title}
              tooltip={TopCitiesTitle(t)[0].tooltip}
              see_more_link={TopCitiesTitle(t)[0].see_more_link}
              range={range}
              selectedLabel={selectedLabel}
            />
          </Col>
        </S.PieChartContainer>
      )}

      <Note />
    </>
  );
};

export default BusinessEfficiency;
