import { AdminTabs } from "@app/app/components/common/Tabs/Tabs.styles";
import { useSyncUrlWithTab } from "@app/hooks";
import { IOrder } from "@app/types/order.types";
import { TabsProps } from "antd";
import { useTranslation } from "react-i18next";

import { OrderListTab } from "../data";

const TabComponent: React.FC<any> = ({ orderList }) => {
  const { t } = useTranslation();

  const itemData = OrderListTab(t).map((OrderTabData: any) => {
    const tabKey = OrderTabData.tab;
    let orderCount;

    if (tabKey === "all") {
      orderCount = orderList?.length;
    } else {
      orderCount = orderList?.filter((order: IOrder) => order?.status === tabKey)?.length || 0;
    }

    return {
      key: tabKey,
      label: OrderTabData.name + ` (${orderCount})`,
    };
  });

  const items: TabsProps["items"] = itemData;

  const inititalTab = OrderListTab(t)[0].tab;
  const { tabFiltered, handleChangeTab } = useSyncUrlWithTab(inititalTab, "tab");

  return (
    <AdminTabs
      className="bg-white px-6"
      items={items}
      type="card"
      size="large"
      activeKey={tabFiltered}
      onChange={handleChangeTab}
    />
  );
};

export default TabComponent;
