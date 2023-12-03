import { useSyncToURL } from "@app/hooks";
import { setDeviceType, setPageType } from "@app/store/slices/redux/admin/trafficAdminSlice";
import { useAppDispatch, useAppSelector } from "@app/store/store";
import { Select, Typography } from "antd";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

import * as S from "../TrafficWebsite.styles";
const { Text } = Typography;

interface IPrimaryIndex {
  range: any;
  selectedLabel: string;
}

const PrimaryIndex: React.FC<IPrimaryIndex> = ({ range, selectedLabel }) => {
  const { t } = useTranslation();
  const syncToURL = useSyncToURL();
  const dispatch = useAppDispatch();
  const location = useLocation();

  // const [dataExport, setDataExport] = useState<string[][]>([]);
  const numDays = range ? range[1].diff(range[0], "day") : null;

  const deviceType = useAppSelector((state) => state.trafficAdmin.deviceType);
  const pageType = useAppSelector((state) => state.trafficAdmin.pageType);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const device = params.get("device");
    const page = params.get("page");

    dispatch(setDeviceType(device));
    dispatch(setPageType(page));

    if (device === null || device === undefined) {
      syncToURL({ device: "all" });
    }

    if (page === null || page === undefined) {
      syncToURL({ page: "all" });
    }
  }, [dispatch, location.search, syncToURL]);

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

  // const getQRsExport = (done: any) => {
  //   const result = [];
  //   if (ExportExcelData && ExportExcelData.length > 0) {
  //     result.push([
  //       t("admin_shop.dev_center.traffic_website.common.total_views"),
  //       t("admin_shop.dev_center.traffic_website.common.conversion_rate"),
  //       t("admin_shop.dev_center.traffic_website.common.total_viewers"),
  //       t("admin_shop.dev_center.traffic_website.common.total_buyers"),
  //     ]);
  //     ExportExcelData.map((item) => {
  //       const arr = [];
  //       arr[0] = formatNumber(item.total_views);
  //       arr[1] = formatNumber(item.conversion_rate);
  //       arr[2] = formatNumber(item.total_viewers);
  //       arr[3] = formatNumber(item.total_buyers);
  //       result.push(arr);
  //     });

  //     setDataExport(result);
  //     done();
  //   }
  // };

  const handleChangePage = (value: string) => {
    dispatch(setPageType(value));
    syncToURL({ page: value });
  };

  const handleChangeDevice = (value: string) => {
    dispatch(setDeviceType(value));
    syncToURL({ device: value });
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
              value={pageType || "all"}
              onChange={handleChangePage}
              options={[
                { value: "all", label: t("admin_shop.dev_center.traffic_website.select.all") },
                { value: "product", label: t("admin_shop.dev_center.traffic_website.select.products") },
                { value: "shop", label: t("admin_shop.dev_center.traffic_website.select.shop") },
              ]}
            />
          </div>

          <div className="select_item">
            <Text strong>{t("admin_shop.dev_center.traffic_website.select.devices")}</Text>
            <Select
              className="select_style"
              value={deviceType || "all"}
              onChange={handleChangeDevice}
              options={[
                { value: "all", label: t("admin_shop.dev_center.traffic_website.select.all") },
                { value: "mobile", label: t("admin_shop.dev_center.traffic_website.select.phone") },
                { value: "tablet", label: t("admin_shop.dev_center.traffic_website.select.tablet") },
                { value: "desktop", label: t("admin_shop.dev_center.traffic_website.select.computer") },
              ]}
            />
          </div>
        </div>

        {/* <div className="export_excel">
          <CSVLink data={dataExport} filename={"Traffic-website.csv"} asyncOnClick={true} onClick={getQRsExport}>
            <Button className="button_export">
              {t("admin_shop.dev_center.biz_efficiency.common.download")}
              <FontAwesomeIcon icon={faDownload} />
            </Button>
          </CSVLink>
        </div> */}
      </div>
    </S.PrimaryIndex>
  );
};

export default PrimaryIndex;
