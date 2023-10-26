import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Pie } from "@ant-design/plots";
import { Select, Tooltip, Typography } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import * as S from "../Dashboard.styles";
import { OrderPendingOptions } from "../data";

interface IPieChart {
  data: any;
  thumbnail: string;
  title: string;
  tooltip: string;
}

const { Title } = Typography;

const PieChart: React.FC<IPieChart> = ({ data, thumbnail, title, tooltip }) => {
  const { t } = useTranslation();
  const [selectedPieChart, setSelectedPieChart] = useState(OrderPendingOptions(t)[0].label);

  const config: any = {
    appendPadding: 10,
    data: data,
    angleField: "value",
    colorField: "type",
    radius: 0.9,
    label: {
      type: "inner",
      offset: "-30%",
      content: ({ percent }: { percent: number }) => `${(percent * 100).toFixed(0)}%`,
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
    <S.PieChart
      title={
        <div className="card_title">
          <div className="left_title">
            <div className="left_thumbnail">
              <img src={thumbnail} alt="Thumbnail" />
            </div>

            <div className="label">
              <div className="main_title">
                <Title level={5} className="m-0">
                  {title}
                </Title>
                <Tooltip title={tooltip} className="tooltip">
                  <ExclamationCircleOutlined className="icon_tooltip" />
                </Tooltip>
              </div>

              <div className="sub_title">{selectedPieChart}</div>
            </div>
          </div>

          <div className="content_select">
            <Select
              defaultValue={OrderPendingOptions(t)[0].value}
              options={OrderPendingOptions(t)}
              onChange={(value) => {
                const option = OrderPendingOptions(t).find((option) => option.value === value);
                if (option) {
                  setSelectedPieChart(option.label);
                }
              }}
            />
          </div>
        </div>
      }
      bordered={false}
    >
      <div className="column_chart">
        <Pie {...config} className="chart" />
      </div>
    </S.PieChart>
  );
};

export default PieChart;
