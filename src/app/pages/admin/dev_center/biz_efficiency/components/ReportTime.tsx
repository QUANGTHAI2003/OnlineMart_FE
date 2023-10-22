import type { TimeRangePickerProps } from "antd";
import { Button, Col, DatePicker, Row, Typography } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import * as S from "../BusinessEfficiency.styles";

const { Text } = Typography;
const { RangePicker } = DatePicker;
const formatedDate = "DD/MM/YYYY";

const ReportTime = ({ setRangeInPieChart, setSelectedLabel }: any) => {
  const { t } = useTranslation();
  const [range, setRange] = useState<[Dayjs, Dayjs]>([dayjs(), dayjs()]);
  const [lastUpdated, setLastUpdated] = useState<string | null>(localStorage.getItem("lastUpdated"));
  const [selectedButton, setSelectedButton] = useState<string | null>(
    t("admin_shop.dev_center.biz_efficiency.common.today")
  );

  const rangePresets: TimeRangePickerProps["presets"] = [
    { label: t("admin_shop.dev_center.biz_efficiency.common.today"), value: [dayjs(), dayjs()] },
    {
      label: t("admin_shop.dev_center.biz_efficiency.common.yesterday"),
      value: [dayjs().subtract(1, "day"), dayjs().subtract(1, "day")],
    },
    { label: t("admin_shop.dev_center.biz_efficiency.common.past_7days"), value: [dayjs().add(-7, "day"), dayjs()] },
    { label: t("admin_shop.dev_center.biz_efficiency.common.past_30days"), value: [dayjs().add(-30, "day"), dayjs()] },
  ];

  const handleButtonClick = (value: Dayjs[], label: string) => {
    if (value[0] !== null && value[1] !== null) {
      setRange([value[0], value[1]]);
    }
    const currentTime = dayjs().format("DD/MM/YYYY, HH:mm");
    setLastUpdated(currentTime);
    localStorage.setItem("lastUpdated", currentTime);
    setRangeInPieChart(value);
    setSelectedLabel(String(label));
    setSelectedButton(String(label));
  };

  const onRangeChange = (dates: null | (Dayjs | null)[], dateStrings: string[]) => {
    const startDate = dayjs(dateStrings[0], formatedDate);
    const endDate = dayjs(dateStrings[1], formatedDate);

    if (dates) {
      setRange([startDate, endDate]);
      setLastUpdated(dayjs().format("DD/MM/YYYY, HH:mm"));
      setSelectedLabel(null);
      setRangeInPieChart([startDate, endDate]);
    }
  };

  return (
    <S.ReportTime>
      <Col xs={2} sm={24} md={5} lg={4} xl={4} className="report_title">
        <Text strong className="mt-1">
          {t("admin_shop.dev_center.biz_efficiency.common.reporting_time")}
        </Text>
      </Col>

      <Col xs={2} sm={24} md={19} lg={20} xl={11} className="range_presets">
        {rangePresets.map((preset, index) => (
          <Button
            key={index}
            onClick={() => {
              handleButtonClick(preset.value as Dayjs[], String(preset.label));
            }}
            className={`range_btn ${preset.label === selectedButton ? "selected" : ""}`}
          >
            {preset?.label}
          </Button>
        ))}
      </Col>

      <Col xs={2} sm={0} md={5} lg={4} xl={0}></Col>

      <Col xs={2} sm={24} md={11} lg={10} xl={9} className="custom_picker">
        <RangePicker value={range} format={formatedDate} onChange={onRangeChange} className="range_picker" />
      </Col>

      <Row className="w-full">
        <Col xs={2} sm={0} md={5} lg={4} xl={4}></Col>
        <Col xs={2} sm={24} md={19} lg={20} xl={20} className="last_updated">
          {lastUpdated
            ? `( ${t("admin_shop.dev_center.biz_efficiency.common.last_updated")}: ${lastUpdated} )`
            : `${t("admin_shop.dev_center.biz_efficiency.common.select_time_report")}`}
        </Col>
      </Row>
    </S.ReportTime>
  );
};

export default ReportTime;
