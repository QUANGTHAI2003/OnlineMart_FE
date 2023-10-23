import { useSyncToURL } from "@app/hooks";
import { formatNumber } from "@app/utils/helper";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Select, Typography } from "antd";
import { useState } from "react";
import { CSVLink } from "react-csv";
import { useTranslation } from "react-i18next";

import { ExportExcelData } from "../data";
import * as S from "../TrafficWebsite.styles";
const { Text } = Typography;

interface IPrimaryIndex {
  range: any;
  selectedLabel: string;
}

const PrimaryIndex: React.FC<IPrimaryIndex> = ({ range, selectedLabel }) => {
  const { t } = useTranslation();
  const syncToURL = useSyncToURL();
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
        t("admin_shop.dev_center.traffic_website.common.total_views"),
        t("admin_shop.dev_center.traffic_website.common.conversion_rate"),
        t("admin_shop.dev_center.traffic_website.common.total_viewers"),
        t("admin_shop.dev_center.traffic_website.common.total_buyers"),
      ]);
      ExportExcelData.map((item) => {
        const arr = [];
        arr[0] = formatNumber(item.total_views);
        arr[1] = formatNumber(item.conversion_rate);
        arr[2] = formatNumber(item.total_viewers);
        arr[3] = formatNumber(item.total_buyers);
        result.push(arr);
      });

      setDataExport(result);
      done();
    }
  };

  const handleChange = (value: string) => {
    syncToURL({ option_value: value });
  };

  return (
    <S.PrimaryIndex>
      <div className="col flex gap-4">
        <Text strong>{`${t("admin_shop.dev_center.traffic_website.common.primary_index")}:`}</Text>
        <div className="date_value">
          <span>{displayRange}</span>
          <span className="numdays">{`(${displayDays})`}</span>
        </div>
      </div>

      <div className="col flex justify-between">
        <div className="select">
          <div className="select_item">
            <Text strong>{t("admin_shop.dev_center.traffic_website.select.pages")}</Text>
            <Select
              className="select_style"
              defaultValue="all"
              onChange={handleChange}
              options={[
                { value: "all", label: t("admin_shop.dev_center.traffic_website.select.all") },
                { value: "products", label: t("admin_shop.dev_center.traffic_website.select.products") },
                { value: "shop", label: t("admin_shop.dev_center.traffic_website.select.shop") },
              ]}
            />
          </div>

          <div className="select_item">
            <Text strong>{t("admin_shop.dev_center.traffic_website.select.devices")}</Text>
            <Select
              className="select_style"
              defaultValue="all"
              onChange={handleChange}
              options={[
                { value: "all", label: t("admin_shop.dev_center.traffic_website.select.all") },
                { value: "phone", label: t("admin_shop.dev_center.traffic_website.select.phone") },
                { value: "computer", label: t("admin_shop.dev_center.traffic_website.select.computer") },
              ]}
            />
          </div>
        </div>

        <div className="export_excel">
          <CSVLink data={dataExport} filename={"Traffic-website.csv"} asyncOnClick={true} onClick={getQRsExport}>
            <Button className="button_export">
              {t("admin_shop.dev_center.biz_efficiency.common.download")}
              <FontAwesomeIcon icon={faDownload} />
            </Button>
          </CSVLink>
        </div>
      </div>
    </S.PrimaryIndex>
  );
};

export default PrimaryIndex;
