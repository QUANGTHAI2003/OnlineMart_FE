import { Area } from "@ant-design/plots";
import { useGetRevenueQuery } from "@app/store/slices/api/admin/dashboardApi";
import Title from "antd/es/typography/Title";
import { useTranslation } from "react-i18next";

import * as S from "../Dashboard.styles";

const DualChart = () => {
  const { t } = useTranslation();
  const { data } = useGetRevenueQuery("7days");

  const config = {
    data: data?.chart,
    xField: "time",
    yField: "value",
    xAxis: {
      range: [0, 1],
    },
  };

  return (
    <S.DualChart className="chart_col">
      <div className="chart_item">
        <div className="header_chart">
          <div className="left_header_chart">
            <Title level={5} className="title">
              {t("admin_shop.reports.sales.dualchart.store_revenue")}
            </Title>
          </div>
        </div>

        <div className="content_chart">{data && <Area {...config} />}</div>
      </div>
    </S.DualChart>
  );
};

export default DualChart;
