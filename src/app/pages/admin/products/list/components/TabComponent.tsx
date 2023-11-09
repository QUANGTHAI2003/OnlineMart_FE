import { AdminTabs } from "@app/app/components/common/Tabs/Tabs.styles";
import { useSyncUrlWithTab } from "@app/hooks";
import { IProduct } from "@app/types/product.types";
import { Alert, TabsProps } from "antd";
import { useTranslation } from "react-i18next";

import { ProductListTab } from "../data";

const TabComponent: React.FC<any> = ({ productList }) => {
  const { t } = useTranslation();

  const itemData = ProductListTab(t).map((productTabData: any) => {
    const tabKey = productTabData.tab;
    let productCount;

    if (tabKey === "all") {
      productCount = productList?.length || 0;
    } else {
      productCount = productList?.filter((product: IProduct) => product?.status === tabKey)?.length || 0;
    }

    return {
      key: tabKey,
      label: productTabData.name + ` (${productCount})`,
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
    };
  });

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
