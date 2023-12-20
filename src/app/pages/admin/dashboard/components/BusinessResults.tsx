import { useGetBusinessResultQuery } from "@app/store/slices/api/admin/dashboardApi";
import { formatCurrency } from "@app/utils/helper";
import {
  faEllipsisVertical,
  faHandHoldingDollar,
  faPeopleCarryBox,
  faSackXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Dropdown, MenuProps } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import * as S from "../Dashboard.styles";

const BusinessResults = () => {
  const { t } = useTranslation();
  const [today, setToday] = useState<string | null>(dayjs().format("MMMM D, YYYY"));
  const [queryParamater, setQueryParamater] = useState<string>("today");

  const handleMenuClick = (e: any) => {
    let todayValue;
    switch (e.key) {
      case "0":
        todayValue = dayjs().format("MMMM D, YYYY");
        setQueryParamater("today");
        break;
      case "1":
        todayValue = `${dayjs().format("MMM D")} - ${dayjs().format("MMM D, YY")}`;
        setQueryParamater("this_month");
        break;
      case "3":
        todayValue = `${dayjs().subtract(1, "year").add(1, "day").format("MMM D, YY")} - ${dayjs().format(
          "MMM D, YY"
        )}`;
        setQueryParamater("this_year");
        break;
      default:
        todayValue = null;
    }
    setToday(todayValue);
  };

  const { data: result } = useGetBusinessResultQuery(queryParamater);

  const renderIcon = (icon: any) => {
    switch (icon) {
      case "faHandHoldingDollar":
        return <FontAwesomeIcon icon={faHandHoldingDollar} className="icon" />;
      case "faPeopleCarryBox":
        return <FontAwesomeIcon icon={faPeopleCarryBox} className="icon" />;
      case "faSackXmark":
        return <FontAwesomeIcon icon={faSackXmark} className="icon" />;
      default:
        return null;
    }
  };

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

  return (
    <S.BusinessResults>
      {result &&
        result.map((item: any) => {
          return (
            <div className="biz_result_box" key={item?.id} style={{ backgroundImage: item?.background }}>
              <div className="top_box">
                <div className="title">{t(`${item?.title}`)}</div>
                <Dropdown menu={{ items, onClick: handleMenuClick }} trigger={["click"]}>
                  <Button ghost className="ellipsis">
                    <FontAwesomeIcon icon={faEllipsisVertical} className="ellipsis_icon" />
                  </Button>
                </Dropdown>
              </div>

              <div className="bottom_box">
                <div className="icon_box">{renderIcon(item?.icon)}</div>

                <div className="content">
                  <div className="value">{item?.type === "currency" ? formatCurrency(item?.value) : item?.value}</div>
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
