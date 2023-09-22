import useSyncUrlWithTab from "@app/hooks/useSyncUrlWithTab";
import { Pagination } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import SearchBar from "./components/SearchBar";
import { OrderData, OrderDataTab } from "./DataOrder";
import EmptyOrder from "./EmptyOrder";
import { IOrder } from "./ListOrder.interface";
import * as S from "./ListOrder.style";
import OrderItem from "./OrderItem";

const ListOrder = () => {
  const { t } = useTranslation();

  const initialTab = OrderDataTab(t)[0].tab;
  const { tabFiltered, handleChangeTab } = useSyncUrlWithTab(initialTab, "tab");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 2;

  useEffect(() => {
    setCurrentPage(1); // Reset currentPage when the tab changes
  }, [tabFiltered]);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const filteredOrders =
    tabFiltered === "all" ? OrderData : OrderData.filter((order: IOrder) => order.status_slug === tabFiltered);

  const visibleOrders = filteredOrders
    .slice(startIndex, endIndex)
    .map((order: IOrder) => (
      <OrderItem
        key={order.id}
        id={order.id}
        status={order.status_slug}
        grand_total={order.grand_total}
        item={order.items}
        shipping_address={order.shipping_address}
        shipping={order.shipping}
      />
    ));

  const OrderDataTabs = OrderDataTab(t).map((item: any) => ({
    key: item.tab,
    label: item.label,
    children: visibleOrders.length > 0 ? visibleOrders : <EmptyOrder />,
  }));

  const items = OrderDataTabs;

  return (
    <>
      <div className="text-xl mb-3">{t("user.orders.order.my_order")}</div>
      <div className="w-full">
        <SearchBar />
        <S.CustomTabs activeKey={tabFiltered} items={items} onChange={handleChangeTab} />
      </div>
      {filteredOrders.length > 0 && (
        <div className="p-4 flex justify-end">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={filteredOrders.length}
            onChange={handlePageChange}
          />
        </div>
      )}
    </>
  );
};

export default ListOrder;
