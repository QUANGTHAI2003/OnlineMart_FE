import { formatNumber } from "@app/utils/helper";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Dropdown, MenuProps } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import * as S from "../Dashboard.styles";
import { BusinessResultsData } from "../data";

const BusinessResults = () => {
  const { t } = useTranslation();
  const [today, setToday] = useState<string | null>(dayjs().format("MMMM D, YYYY"));

  const items: MenuProps["items"] = [
    {
      label: t("admin_shop.dashboard.today"),
      key: "0",
    },
    {
      label: t("admin_shop.dashboard.this_month"),
      key: "1",
    },
    {
      label: t("admin_shop.dashboard.this_year"),
      key: "3",
    },
  ];

  const handleMenuClick = (e: any) => {
    let todayValue;
    switch (e.key) {
      case "0":
        todayValue = dayjs().format("MMMM D, YYYY");
        break;
      case "1":
        todayValue = `${dayjs().format("MMM D")} - ${dayjs().format("MMM D, YY")}`;
        break;
      case "3":
        todayValue = `${dayjs().subtract(1, "year").add(1, "day").format("MMM D, YY")} - ${dayjs().format(
          "MMM D, YY"
        )}`;
        break;
      default:
        todayValue = null;
    }
    setToday(todayValue);
  };

  return (
    <S.BusinessResults>
      {BusinessResultsData(t).map((item) => {
        return (
          <div className="biz_result_box" key={item.id} style={{ backgroundImage: item.background }}>
            <div className="top_box">
              <div className="title">{`${item.title}`}</div>
              <Dropdown menu={{ items, onClick: handleMenuClick }} trigger={["click"]}>
                <Button ghost className="ellipsis">
                  <FontAwesomeIcon icon={faEllipsisVertical} className="ellipsis_icon" />
                </Button>
              </Dropdown>
            </div>

            <div className="bottom_box">
              <div className="icon_box">
                <FontAwesomeIcon icon={item.icon} className="icon" />
              </div>

              <div className="content">
                <div className="value">{formatNumber(item.value)}</div>
                <div className="today">{today}</div>
              </div>
            </div>
          </div>
        );
      })}
    </S.BusinessResults>
  );
};

export default BusinessResults;
