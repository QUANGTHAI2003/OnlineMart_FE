import { Empty, Select } from "antd";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import customParseFormat from "dayjs/plugin/localizedFormat";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { data } from "./data";
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(customParseFormat);

const option = (t: any) => {
  return [
    { value: "today", label: t("admin_shop.ship.selected.today") },
    { value: "yesterday", label: t("admin_shop.ship.selected.yesterday") },
    { value: "sevenDaysAgo", label: t("admin_shop.ship.selected.sevenDaysAgo") },
    { value: "thirtyDaysAgo", label: t("admin_shop.ship.selected.thirtyDaysAgo") },
    { value: "thisMonth", label: t("admin_shop.ship.selected.thisMonth") },
  ];
};
const isSameDate = (date1: any, date2: any) => {
  return dayjs(date1).isSame(date2, "day");
};
const isAfterDate = (date1: any, date2: any) => {
  return dayjs(date1).isAfter(date2);
};
const isBeforeDate = (date1: any, date2: any) => {
  return dayjs(date1).isBefore(date2);
};

const isSameMonth = (date1: any, date2: any) => {
  return dayjs(date1).isSame(date2, "month");
};
interface IShipOverviewChartProps {
  date: string;
  shipment: number;
  fee: number;
}
const ShipOverviewChart = () => {
  const { t } = useTranslation();
  const [selectedOption, setSelectedOption] = useState("sevenDaysAgo");
  const [chartData, setChartData] = useState<IShipOverviewChartProps[]>([]);
  const [hasData, setHasData] = useState(true);

  const today = dayjs();
  const yesterday = today.subtract(1, "day");
  const sevenDaysAgo = today.subtract(7, "day");
  const thisMonth = dayjs().startOf("month");
  const thirtyDaysAgo = today.subtract(30, "day");

  const filterDataByOption = useCallback(
    (option: any) => {
      switch (option) {
        case "today":
          return data.filter((item) => isSameDate(item.date, today));
        case "yesterday":
          return data.filter((item) => isSameDate(item.date, yesterday));
        case "sevenDaysAgo":
          return data.filter((item) => isAfterDate(item.date, sevenDaysAgo) && isBeforeDate(item.date, today));
        case "thirtyDaysAgo":
          return data.filter((item) => isAfterDate(item.date, thirtyDaysAgo) && isBeforeDate(item.date, today));
        case "thisMonth":
          return data.filter((item) => isSameMonth(item.date, thisMonth));
        default:
          return [];
      }
    },
    [sevenDaysAgo, thirtyDaysAgo, thisMonth, today, yesterday]
  );

  useEffect(() => {
    const filteredData = filterDataByOption(selectedOption);
    // setOriginalData(filteredData);
    const dataForChart: IShipOverviewChartProps[] = filteredData
      .sort((a, b) => dayjs(a.date).diff(dayjs(b.date)))
      .map((item) => ({
        date: dayjs(item.date).format("DD / MM"),
        shipment: item.shipment,
        fee: item.fee,
      }));
    if (dataForChart.length === 0) {
      setHasData(false);
    } else {
      setHasData(true);
      setChartData(dataForChart);
    }
  }, [filterDataByOption, selectedOption]);

  const handleOptionChange = (value: any) => {
    setSelectedOption(value);
    const filteredData = filterDataByOption(value);
    const dataForChart: IShipOverviewChartProps[] = filteredData
      .sort((a, b) => dayjs(a.date).diff(dayjs(b.date)))
      .map((item) => ({
        date: dayjs(item.date).format("DD / MM"),
        shipment: item.shipment,
        fee: item.fee,
      }));
    if (dataForChart.length === 0) {
      setHasData(false);
    } else {
      setHasData(true);
      setChartData(dataForChart);
    }
  };

  const options = {
    title: {
      text: null,
    },
    legend: { align: "center", verticalAlign: "top" },
    yAxis: [
      {
        title: {
          text: null,
        },
        labels: {
          format: "{value} " + t("admin_shop.ship.poetry"),
        },
        opposite: false,
      },
      {
        title: {
          text: null,
        },
        labels: {
          format: "{value} " + t("admin_shop.ship.orders"),
        },
        opposite: true,
      },
    ],
    credits: {
      enabled: false,
    },
    tooltip: {
      shared: true,
    },
    xAxis: {
      categories: chartData.map((item) => item.date),
    },
    series: [
      {
        name: t("admin_shop.ship.order_number"),
        data: chartData.map((item) => item.shipment),
        yAxis: 1,
      },
      {
        name: t("admin_shop.ship.shipping_fee"),
        data: chartData.map((item) => item.fee),
        yAxis: 0,
      },
    ],
  };
  return (
    <>
      <div className="mt-3 px-4">
        <span>{t("admin_shop.ship.show_by")}</span>
        <Select
          size="middle"
          placement="bottomRight"
          defaultValue={selectedOption}
          className="ml-3 w-36"
          onChange={handleOptionChange}
          options={option(t)}
        />
      </div>
      {hasData ? (
        <HighchartsReact highcharts={Highcharts} options={options} />
      ) : (
        <Empty className="py-16" description={<span>{t("admin_shop.ship.no_data")}</span>} />
      )}
    </>
  );
};

export default ShipOverviewChart;
