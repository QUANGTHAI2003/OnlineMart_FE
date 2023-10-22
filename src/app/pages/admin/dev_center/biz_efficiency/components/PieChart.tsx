import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Pie } from "@ant-design/plots";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import * as S from "../BusinessEfficiency.styles";

interface IPieChart {
  data: any;
  thumbnail: string;
  title: string;
  tooltip: string;
  see_more_link: string;
  range: any;
  selectedLabel: string;
}

const { Title } = Typography;

const PieChart: React.FC<IPieChart> = ({ data, thumbnail, title, tooltip, see_more_link, range, selectedLabel }) => {
  const { t } = useTranslation();

  const displayRange = range
    ? `${selectedLabel ? selectedLabel + ": " : ""}${t(
        "admin_shop.dev_center.biz_efficiency.common.from"
      )} ${range[0].format("DD/MM/YYYY")} ${t("admin_shop.dev_center.biz_efficiency.common.to")} ${range[1].format(
        "DD/MM/YYYY"
      )}`
    : `${t("admin_shop.dev_center.biz_efficiency.common.select_time_report")}`;

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
                <Tooltip title={tooltip}>
                  <ExclamationCircleOutlined className="icon_tooltip" />
                </Tooltip>
              </div>

              <div className="sub_title">{displayRange}</div>
            </div>
          </div>

          {see_more_link !== "" && (
            <div className="right_title">
              <Link to={see_more_link} target="_blank">
                <div className="see_more">
                  <p>{t("admin_shop.dev_center.biz_efficiency.common.see_more_link")}</p>
                  <FontAwesomeIcon icon={faAngleRight} />
                </div>
              </Link>
            </div>
          )}
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
