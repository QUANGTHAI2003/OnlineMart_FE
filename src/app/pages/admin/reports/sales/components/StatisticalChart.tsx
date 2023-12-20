import { Column, Pie } from "@ant-design/plots";
import { useGetInformationShippingQuery, useGetRevenueQuery } from "@app/store/slices/api/admin/dashboardApi";
import { formatCurrency } from "@app/utils/helper";
import { Col, Row, Select, Typography } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { PieChartOptions } from "../data";
import * as S from "../SalesReport.styles";
const { Title } = Typography;

const StatisticalChart = () => {
  const { t } = useTranslation();
  // const data = PieChartData(t);

  // const [selectedDualChart, setSelectedDualChart] = useState(DualChartOptions(t)[0].label);
  const [selectedPieChart, setSelectedPieChart] = useState(PieChartOptions(t)[0].label);

  const selectedOption = PieChartOptions(t).find((option: any) => option.label === selectedPieChart);
  let queryParameter = "";

  queryParameter = selectedOption?.value as string;

  const { data: order } = useGetInformationShippingQuery(queryParameter);
  const { data: revenue } = useGetRevenueQuery("7days");

  const config: any = {
    data: revenue?.chart,
    xField: "time",
    yField: "value",
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      time: {
        alias: "Thời gian",
      },
      value: {
        alias: "Doanh thu",
      },
    },
  };

  const configPie = {
    appendPadding: 10,
    data: order,
    angleField: "sales",
    colorField: "type",
    radius: 0.9,
    label: {
      type: "inner",
      offset: "-30%",
      content: ({ percent }: any) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: "center",
      },
    },
    interactions: [
      {
        type: "element-active",
      },
    ],
  };

  return (
    <S.StatisticalChart>
      <Row className="chart_row">
        <Col sm={24} md={24} lg={12} className="chart_col">
          <div className="chart_item">
            <div className="header_chart">
              <div className="left_header_chart">
                <Title level={5} className="title">
                  {t("admin_shop.reports.sales.dualchart.store_revenue")}
                </Title>
              </div>
              <Title level={2} className="right_header_chart">
                {revenue && formatCurrency(revenue?.total_revenue)}
              </Title>
            </div>

            <div className="content_chart">{revenue && <Column {...config} className="chart" />}</div>

            {/* <div className="content_select">
              <Select
                defaultValue={DualChartOptions(t)[0].value}
                options={DualChartOptions(t)}
                onChange={(value) => {
                  const option = DualChartOptions(t).find((option) => option.value === value);
                  if (option) {
                    setSelectedDualChart(option.label);
                  }
                }}
              />
            </div> */}
          </div>
        </Col>

        <Col sm={24} md={24} lg={12} className="chart_col">
          <div className="chart_item">
            <div className="header_chart">
              <div className="left_header_chart">
                <Title level={5} className="title">
                  {t("admin_shop.reports.sales.dualchart.delivery_info")}
                </Title>
                <div className="options_value">{selectedPieChart}</div>
              </div>
            </div>

            <div className="content_chart">{order && <Pie {...configPie} className="chart" />}</div>

            <div className="content_select">
              <Select
                defaultValue={PieChartOptions(t)[0].value}
                options={PieChartOptions(t)}
                onChange={(value) => {
                  const option = PieChartOptions(t).find((option) => option.value === value);
                  if (option) {
                    setSelectedPieChart(option.label);
                  }
                }}
              />
            </div>
          </div>
        </Col>
      </Row>
    </S.StatisticalChart>
  );
};

export default StatisticalChart;
