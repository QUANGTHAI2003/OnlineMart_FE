import { StarIcon } from "@app/app/assets/icons";
import { AdminTabs } from "@app/app/components/common/Tabs/Tabs.styles";
import { useSyncUrlWithTab } from "@app/hooks";
import { TabsProps } from "antd";
import { useTranslation } from "react-i18next";

import { RatingListTab } from "../data";

const TabRating = () => {
  const { t } = useTranslation();

  const itemData = RatingListTab(t).map((ratingTabData: any) => ({
    key: ratingTabData.tab,
    label: (
      <div className="flex gap-2 items-center">
        <span>{ratingTabData.name}</span>
        {ratingTabData.tab !== "all" && <StarIcon filled={true} />}
      </div>
    ),
  }));

  const items: TabsProps["items"] = itemData;

  const inititalTab = RatingListTab(t)[0].tab;
  const { tabFiltered, handleChangeTab } = useSyncUrlWithTab(inititalTab, "tab");

  return (
    <div className="navbarRating">
      <AdminTabs
        items={items}
        type="card"
        size="large"
        activeKey={tabFiltered}
        onChange={handleChangeTab}
        className="adminTabs"
      />
    </div>
  );
};

export default TabRating;
