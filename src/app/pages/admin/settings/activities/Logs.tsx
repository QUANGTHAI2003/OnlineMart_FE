import { AdminBreadcrumb } from "@app/app/components/common/Breadcrumb/Breadcrumb";
import { useTranslation } from "react-i18next";

import FilterComponent from "./components/FilterComponent";
import TableComponent from "./components/TableComponent";

export const searchType = (t: any) => {
  return [
    { value: "author", label: t("admin_shop.settings.logs.table.author") },
    { value: "action", label: t("admin_shop.settings.logs.table.action") },
  ];
};

const Logs = () => {
  const { t } = useTranslation();

  return (
    <main className="bg-white">
      <AdminBreadcrumb className="bg-white px-6" />
      <div className="m-4 bg-white">
        <div className="">
          <FilterComponent searchTypeData={searchType(t)} />
        </div>
        <div className="">
          <TableComponent />
        </div>
      </div>
    </main>
  );
};

export default Logs;
