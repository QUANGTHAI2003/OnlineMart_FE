import { SuperAdminBreadcrumb } from "@app/app/components/common/Breadcrumb/BreadcrumbSuperAdmin";
import { useDebounce } from "@app/hooks";
import { Typography } from "antd";
import { TFunction } from "i18next";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import FilterComponent from "./components/FilterComponent";
import TableComponent from "./components/TableComponent";

const searchType = (t: TFunction<"translation", undefined>) => {
  return [
    { value: "code", label: t("admin_super.shop_list.filter.code") },
    { value: "name", label: t("admin_super.shop_list.filter.name") },
    { value: "phone", label: t("admin_super.shop_list.filter.phone") },
    { value: "email", label: t("admin_super.shop_list.filter.email") },
  ];
};

const statusType = (t: TFunction<"translation", undefined>) => {
  return [
    { value: "enabled", label: t("admin_super.shop_list.filter.enabled") },
    { value: "disabled", label: t("admin_super.shop_list.filter.disabled") },
  ];
};

const Shops = () => {
  const { t } = useTranslation();

  const [searchValue, setSearchValue] = useState<string>("");
  const [selectValue, setSelectValue] = useState<string>("");
  const [selectSearchType, setSelectSearchType] = useState<string>(searchType(t)[0].value);
  const [selectType, setSelectType] = useState<string>(statusType(t)[0].value);
  const debouncedSearchValue = useDebounce(searchValue, 300);
  const debouncedSelectValue = useDebounce(selectValue, 300);

  return (
    <div>
      <main className="p-5 bg-white">
        <SuperAdminBreadcrumb />
        <section className="header mt-3">
          <Typography.Title level={3}>{t("admin_super.sidebar.shop_list")}</Typography.Title>
          <FilterComponent
            setSearchValue={setSearchValue}
            setSelectSearchType={setSelectSearchType}
            searchTypeData={searchType(t)}
            setSelectType={setSelectType}
            setSelectValue={setSelectValue}
            selectTypeData={statusType(t)}
          />
        </section>
      </main>
      <div className="p-5 bg-[#f5f5f5]">
        <TableComponent
          selectType={selectType}
          selectValue={debouncedSelectValue}
          searchValue={debouncedSearchValue}
          searchType={selectSearchType}
        />
      </div>
    </div>
  );
};

export default Shops;
