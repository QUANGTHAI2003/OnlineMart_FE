import { AdminTabs } from "@app/app/components/common/Tabs/Tabs.styles";
import { useSyncUrlWithTab } from "@app/hooks";
import { Alert, TabsProps } from "antd";
import { useTranslation } from "react-i18next";

import { ProductListTab } from "../data";

const TabComponent = () => {
  const { t } = useTranslation();

  const itemData = ProductListTab(t).map((productTabData: any) => ({
    key: productTabData.tab,
    label: productTabData.name + " (0)",
    children: (
      <Alert
        message={
          <>
            <b>{`${productTabData.name}: `}</b>
            {productTabData.alert}
          </>
        }
        type="info"
        showIcon
        closable
      />
    ),
  }));

  const items: TabsProps["items"] = itemData;

  const inititalTab = ProductListTab(t)[0].tab;
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
