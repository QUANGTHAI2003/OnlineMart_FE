import { DualAxes } from "@ant-design/plots";
import { Select } from "antd";
import Title from "antd/es/typography/Title";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import * as S from "../Dashboard.styles";
import { DualChartData, DualChartOptions } from "../data";

const DualChart = () => {
  const { t } = useTranslation();

  const [selectedDualChart, setSelectedDualChart] = useState(DualChartOptions(t)[0].label);
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
  };

  return (
    <S.DualChart className="chart_col">
      <div className="chart_item">
        <div className="header_chart">
          <div className="left_header_chart">
            <Title level={5} className="title">
              {t("admin_shop.reports.sales.dualchart.store_revenue")}
            </Title>
            <div className="options_value">{selectedDualChart}</div>
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

        <div className="content_chart">
          <DualAxes {...configDualChart} className="chart" />
        </div>
      </div>
    </S.DualChart>
  );
};

export default DualChart;
