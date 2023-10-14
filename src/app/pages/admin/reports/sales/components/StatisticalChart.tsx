import { DualAxes, Pie } from "@ant-design/plots";
import { formatCurrency } from "@app/utils/helper";
import { Col, Row, Select, Typography } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { DualChartData, DualChartOptions, PieChartData, PieChartOptions } from "../data";
import * as S from "../SalesReport.styles";
const { Title } = Typography;

const StatisticalChart = () => {
  const { t } = useTranslation();
  const data = PieChartData(t);

  const [selectedDualChart, setSelectedDualChart] = useState(DualChartOptions(t)[0].label);
  const [selectedPieChart, setSelectedPieChart] = useState(PieChartOptions(t)[0].label);

  const configDualChart: any = {
    data: [DualChartData, DualChartData],
    xField: "time",
    yField: ["value", "count"],
    yAxis: [
      {
        value: {
          min: 0,
          label: {
            formatter: (val: any) => `${val}`,
          },
        },
        count: true,
      },
    ],
    geometryOptions: [
      {
        geometry: "column",
        color: "#5B8FF9",
        columnWidthRatio: 0.4,
        label: {
          position: "middle",
        },
      },
      {
        geometry: "line",
        smooth: true,
        color: "#5AD8A6",
      },
    ],
    interactions: [
      {
        type: "element-highlight",
      },
      {
        type: "active-region",
      },
    ],
    legend: {
      custom: true,
      position: "bottom",
      items: [
        {
          value: "value",
          name: t("admin_shop.reports.sales.dualchart.revenue"),
          marker: {
            symbol: "square",
            style: {
              fill: "#5B8FF9",
              r: 5,
            },
          },
        },
        {
          value: "count",
          name: t("admin_shop.reports.sales.dualchart.profit"),
          marker: {
            symbol: "circle",
            style: {
              fill: "#5AD8A6",
              r: 5,
            },
          },
        },
      ],
    },
    // annotations: {
    //   value: [
    //     {
    //       type: "text",
    //       position: ["2019-06", "max"],
    //       content: "柱线混合图",
    //     },
    //   ],
    //   count: [
    //     {
    //       type: "dataMarker",
    //       top: true,
    //       position: ["2019-05", 400],
    //       line: {
    //         length: 20,
    //       },
    //       text: {
    //         content: "2019-05, 发布新版本",
    //         style: {
    //           textAlign: "left",
    //         },
    //       },
    //     },
    //   ],
    // },
  };

  const configPieChart = {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "type",
    radius: 0.8,
    label: {
      type: "outer",
      content: "{name} {value}",
    },
    interactions: [
      {
        type: "pie-legend-active",
      },
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
                <div className="options_value">{selectedDualChart}</div>
              </div>
              <Title level={2} className="right_header_chart">
                {formatCurrency(6000000)}
              </Title>
            </div>

            <div className="content_chart">
              <DualAxes {...configDualChart} className="chart" />
            </div>

            <div className="content_select">
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
            </div>
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

            <div className="content_chart">
              <Pie {...configPieChart} className="chart" />
            </div>

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
