import { AdminBreadcrumb } from "@app/app/components/common/Breadcrumb/Breadcrumb";
import { useDebounce } from "@app/hooks";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import FilterComponent from "./components/FilterComponent";
import TableComponent from "./components/TableComponent";

const searchType = (t: any) => {
  return [
    { value: "author", label: t("admin_shop.settings.logs.table.author") },
    { value: "action", label: t("admin_shop.settings.logs.table.action") },
  ];
};

const Logs = () => {
  const { t } = useTranslation();

  const [searchValue, setSearchValue] = useState<string>("");
  const [selectSearchType, setSelectSearchType] = useState<string>(searchType(t)[0].value);
  const debouncedSearchValue = useDebounce(searchValue, 300);

  return (
    <main>
      <AdminBreadcrumb className="bg-white px-6" />
      <div className="m-4 bg-white">
        <div className="">
          <FilterComponent
            setSearchValue={setSearchValue}
            setSelectSearchType={setSelectSearchType}
            searchTypeData={searchType(t)}
          />
        </div>
        <div className="">
          <TableComponent searchValue={debouncedSearchValue} searchType={selectSearchType} />
        </div>
      </div>
    </main>
  );
};

export default Logs;
