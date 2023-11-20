import { StarIcon } from "@app/app/assets/icons";
import { AdminTabs } from "@app/app/components/common/Tabs/Tabs.styles";
import { useSyncUrlWithTab } from "@app/hooks";
import { TabsProps } from "antd";
import { useTranslation } from "react-i18next";

import { RatingListTab } from "../data";
import { IReview } from "@app/types/review.types";

const TabRating: React.FC<any> = ({ reviewList }) => {
  const { t } = useTranslation();

  const itemData = RatingListTab(t).map((ratingTabData: any) => {
    const tabKey = ratingTabData.tab;
    let reviewCount;

    if (tabKey === "all") {
      reviewCount = reviewList?.length;
    } else {
      reviewCount = reviewList?.filter((review: IReview) => review?.rating == tabKey)?.length || 0;
    }
    return {
      key: tabKey,
      label: (
        <div className="flex gap-2 items-center">
          <span>{ratingTabData.name}</span>
          {ratingTabData.tab !== "all" && <StarIcon filled={true} />}
          <span>{`(${reviewCount})`}</span>
        </div>
      ),
    };
  });

  const items: TabsProps["items"] = itemData;

  const inititalTab = RatingListTab(t)[0].tab;
  const { tabFiltered, handleChangeTab } = useSyncUrlWithTab(inititalTab, "tab");

  return (
    <div className="navbarRating">
      <AdminTabs
        className="bg-white px-6"
        items={items}
        type="card"
        size="large"
        activeKey={tabFiltered}
        onChange={handleChangeTab}
      />
    </div>
  );
};

export default TabRating;
