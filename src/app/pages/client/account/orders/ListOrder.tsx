import { useDebounce } from "@app/hooks";
import useSyncUrlWithTab from "@app/hooks/useSyncUrlWithTab";
import { useGetOrderQueryRootQuery } from "@app/store/slices/api/user/orderApi";
import { useAppSelector } from "@app/store/store";
import { IOrder } from "@app/types/order.types";
import { removeDiacritics } from "@app/utils/helper";
import { Pagination, Spin } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

import SearchBar from "./components/SearchBar";
import { OrderDataTab } from "./DataOrder";
import EmptyOrder from "./EmptyOrder";
import * as S from "./ListOrder.style";
import OrderItem from "./OrderItem";
const ListOrder = () => {
  const { t } = useTranslation();
  const user_id = useAppSelector((state) => state.userState.user)?.id;
  const initialTab = OrderDataTab(t)[0].tab;
  const location = useLocation();
  const { tabFiltered, handleChangeTab } = useSyncUrlWithTab(initialTab, "tab");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 2;
  const { data: orderData, isLoading } = useGetOrderQueryRootQuery(user_id);
  useEffect(() => {
    setCurrentPage(1); // Reset currentPage when the tab changes
  }, [tabFiltered]);
  useEffect(() => {
    window.scrollTo(120, 120);
  }, [location.pathname]);

  const queryParams = new URLSearchParams(location.search);
  const tabParam = queryParams.get("tab");
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const searchValue = useAppSelector((state) => state.orderAdmin.searchValue);
  const debouncedValue = useDebounce(searchValue, 300);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  let filteredOrders: IOrder[] = orderData || [];
  filteredOrders =
    tabParam === "all" ? orderData || [] : (orderData || []).filter((record) => record.status === tabParam);
  if (debouncedValue) {
    filteredOrders = filteredOrders?.filter((record: any) => {
      const searchRecordString = debouncedValue.toLowerCase();
      const products = record?.order_item?.map((item: any) => item?.product?.product_name?.toLowerCase());
      const matchFound = products?.some((productName: string) =>
        removeDiacritics(productName).includes(removeDiacritics(searchRecordString))
      );

      return matchFound;
    });
  }
  const visibleOrders = filteredOrders
    .slice(startIndex, endIndex)
    .map((order: IOrder) => (
      <OrderItem
        key={order.id}
        id={order.id}
        status={order.status}
        grand_total={order.grand_total}
        item={order.order_item}
        shipping_address={order.city}
        shipping={22000}
      />
    ));

  const OrderDataTabs = OrderDataTab(t).map((item: any) => ({
    key: item.tab,
    label: item.label,
    children: (
      <>
        <SearchBar />
        {visibleOrders.length > 0 ? visibleOrders : <EmptyOrder />}
      </>
    ),
  }));

  const items = OrderDataTabs;

  return (
    <Spin spinning={isLoading}>
      <div className="text-xl mb-3">{t("user.orders.order.my_order")}</div>
      <div className="w-full">
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
    </Spin>
  );
};

export default ListOrder;
