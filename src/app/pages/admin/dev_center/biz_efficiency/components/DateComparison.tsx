import { formatCurrency, formatNumber, formatPercentage } from "@app/utils/helper";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Typography } from "antd";
import { useState } from "react";
import { CSVLink } from "react-csv";
import { useTranslation } from "react-i18next";

import * as S from "../BusinessEfficiency.styles";
import { ExportExcelData } from "../data";

interface IDataComparison {
  range: any;
  selectedLabel: string;
}

const { Text } = Typography;

const DateComparison: React.FC<IDataComparison> = ({ range, selectedLabel }) => {
  const { t } = useTranslation();
  const [dataExport, setDataExport] = useState<string[][]>([]);
  const numDays = range ? range[1].diff(range[0], "day") : null;
  const displayRange = range ? (
    <>
      {range[0].format("DD/MM/YYYY")}
      <span className="compare">{`(${t("admin_shop.dev_center.biz_efficiency.common.compare_with")})`}</span>
      {range[1].format("DD/MM/YYYY")}
    </>
  ) : (
    `${t("admin_shop.dev_center.biz_efficiency.common.select_time_report")}`
  );
  let displayDays;
  if (selectedLabel === t("admin_shop.dev_center.biz_efficiency.common.today")) {
    displayDays = t("admin_shop.dev_center.biz_efficiency.common.on_current_day");
  } else if (selectedLabel === t("admin_shop.dev_center.biz_efficiency.common.yesterday")) {
    displayDays = t("admin_shop.dev_center.biz_efficiency.common.within_a_day");
  } else if (selectedLabel === t("admin_shop.dev_center.biz_efficiency.common.past_7days")) {
    displayDays = t("admin_shop.dev_center.biz_efficiency.common.within_7days");
  } else if (selectedLabel === t("admin_shop.dev_center.biz_efficiency.common.past_30days")) {
    displayDays = t("admin_shop.dev_center.biz_efficiency.common.within_30days");
  } else if (numDays !== null) {
    displayDays = `${t("admin_shop.dev_center.biz_efficiency.common.within")} ${numDays} ${t(
      "admin_shop.dev_center.biz_efficiency.common.days"
    )}`;
  } else {
    displayDays = "";
  }

  const getQRsExport = (done: any) => {
    const result = [];
    if (ExportExcelData && ExportExcelData.length > 0) {
      result.push([
        t("admin_shop.dev_center.biz_efficiency.common.revenue"),
        t("admin_shop.dev_center.biz_efficiency.common.orders"),
        t("admin_shop.dev_center.biz_efficiency.common.net_revenue"),
        t("admin_shop.dev_center.biz_efficiency.common.views"),
        t("admin_shop.dev_center.biz_efficiency.common.conversion_rate"),
        t("admin_shop.dev_center.biz_efficiency.common.average_order"),
        t("admin_shop.dev_center.biz_efficiency.common.cancelled_orders"),
      ]);
      ExportExcelData.map((item) => {
        const arr = [];
        arr[0] = formatCurrency(item.revenue);
        arr[1] = formatNumber(item.orders);
        arr[2] = formatCurrency(item.net_revenue);
        arr[3] = formatNumber(item.views);
        arr[4] = formatPercentage(item.conversion_rate);
        arr[5] = formatCurrency(item.average_order);
        arr[6] = formatNumber(item.cancelled_orders);
        result.push(arr);
      });

      setDataExport(result);
      done();
    }
  };

  return (
    <S.DateComparison>
      <div className="date_compare">
        <Text strong>{t("admin_shop.dev_center.biz_efficiency.common.primary_index")}</Text>

        <div className="date_value">
          <span>{displayRange}</span>
          <span className="numdays">{`(${displayDays})`}</span>
        </div>
      </div>

      <div className="export_excel">
        <CSVLink data={dataExport} filename={"Business-report.csv"} asyncOnClick={true} onClick={getQRsExport}>
          <Button className="button_export">
            {t("admin_shop.dev_center.biz_efficiency.common.download")}
            <FontAwesomeIcon icon={faDownload} />
          </Button>
        </CSVLink>
      </div>
    </S.DateComparison>
  );
};

export default DateComparison;
