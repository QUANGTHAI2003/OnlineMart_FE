import { AdminTabs } from "@app/app/components/common/Tabs/Tabs.styles";
import { useSyncUrlWithTab } from "@app/hooks";
import { TabsProps } from "antd";
import { useTranslation } from "react-i18next";

import { OrderListTab } from "../data";

const TabComponent = () => {
  const { t } = useTranslation();

  const itemData = OrderListTab(t).map((OrderTab: any) => ({
    key: OrderTab.tab,
    label: OrderTab.name + " (0)",
  }));

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
