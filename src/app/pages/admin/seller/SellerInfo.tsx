import { AdminBreadcrumb } from "@app/app/components/common/Breadcrumb/Breadcrumb";
import { useDebounce } from "@app/hooks";
import { Card } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import * as S from "./SellerInfo.styles";
import FilterComponent from "./components/FilterComponent";
import TableComponent from "./components/TableComponent";
import RegisterEmployess from "./RegisterEmployess";
const searchType = (t: any) => {
  return [
    { value: "name", label: t("admin_shop.seller.filter.type.info_seller")},
    { value: "code", label: t("admin_shop.seller.filter.type.code") },
  ];
};
const statusType = (t: any) => {
  return [
    { value: "Tất cả", label:  t("admin_shop.seller.filter.type.all") },
    { value: "Hoạt động", label: t("admin_shop.seller.filter.type.activity") },
    { value: "Không hoạt động", label: t("admin_shop.seller.filter.type.inactive") },
  ];
};

const profileStatusType = (t: any) => {
  return [
    { value: "Tất cả", label: t("admin_shop.seller.filter.type.all") },
    { value: "Chưa hoàn thành hồ sơ", label: t("admin_shop.seller.filter.type.incomplete") },
    { value: "Chờ nhà bán bổ sung", label: t("admin_shop.seller.filter.type.waiting") },
    { value: "Đang chờ duyệt", label: t("admin_shop.seller.filter.type.peding") },
  ];
};

const SellerInfo = () => {
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectSearchType, setSelectSearchType] = useState<string>(searchType(t)[0].value);
  const debouncedSearchValue = useDebounce(searchValue, 300);
  return (
    <>
      <S.SellerInfoHeader>
        <AdminBreadcrumb className="mb-3" />
        <div className="flex justify-between items-center">
          <div className="title">{t("admin_shop.seller.list")}</div>
          <RegisterEmployess />
        </div>
      </S.SellerInfoHeader>
      <S.SellerInfoBody>
        <Card bordered={false}>
          <FilterComponent
            setSearchValue={setSearchValue}
            setSelectSearchType={setSelectSearchType}
            searchTypeData={searchType(t)}
            statusTypeData={statusType(t)}
            profileStatusTypeData={profileStatusType(t)}
          />
        </Card>
        <div className="h-3"></div>
        <TableComponent searchValue={debouncedSearchValue} searchType={selectSearchType} />
      </S.SellerInfoBody>
    </>
  );
};

export default SellerInfo;
