import { AdminBreadcrumb } from "@app/app/components/common/Breadcrumb/Breadcrumb";
import { useGetBinQuery } from "@app/store/slices/api/admin/binApi";
import { Typography } from "antd";
import { useTranslation } from "react-i18next";

import { FilterComponent, TableComponent } from "./components";
const { Title } = Typography;

export const searchType = (t: any) => {
  return [
    { value: "name", label: t("admin_shop.inventory.filter.name") },
    { value: "category", label: t("admin_shop.inventory.filter.categories") },
    { value: "supplier", label: t("admin_shop.inventory.filter.supplier") },
    { value: "sku", label: t("admin_shop.inventory.filter.sku") },
  ];
};

const Bin = () => {
  const { t } = useTranslation();
  const { data: productList, isFetching } = useGetBinQuery();

  return (
    <div className="flex flex-col gap-4">
      <div className="p-6 flex flex-col gap-4 bg-white">
        <AdminBreadcrumb />

        <Title level={4} className="m-0">
          {t("admin_shop.bin.recycle_bin")}
        </Title>
      </div>

      <div className="mx-4">
        <FilterComponent searchTypeData={searchType(t)} />
      </div>

      <div className="mx-4">
        <TableComponent productList={productList} isFetching={isFetching} />
      </div>
    </div>
  );
};

export default Bin;
