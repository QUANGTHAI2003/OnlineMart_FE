import { AdminBreadcrumb } from "@app/app/components/common/Breadcrumb/Breadcrumb";
import { useGetAllPermissionsQuery } from "@app/store/slices/api/admin/roleApi";
import { Card } from "antd";
import { useTranslation } from "react-i18next";

import FilterComponent from "./components/FilterComponent";
import TableComponent from "./components/TableComponent";
import RegisterEmployess from "./RegisterEmployess";
import * as S from "./SellerInfo.styles";

export const searchType = (t: any) => {
  return [
    { value: "name", label: t("admin_shop.seller.filter.type.info_seller") },
    { value: "id", label: t("admin_shop.seller.filter.type.code") },
  ];
};
export const statusType = (t: any) => {
  return [
    { value: "all", label: t("admin_shop.seller.filter.type.all") },
    { value: "active", label: t("admin_shop.seller.filter.type.activity") },
    { value: "inactive", label: t("admin_shop.seller.filter.type.inactive") },
  ];
};

const SellerInfo = () => {
  const { t } = useTranslation();
  const { data: permissionList } = useGetAllPermissionsQuery();

  return (
    <>
      <S.SellerInfoHeader>
        <AdminBreadcrumb className="mb-3" />
        <div className="flex justify-between items-center">
          <div className="title">{t("admin_shop.seller.list")}</div>
          <RegisterEmployess permissionList={permissionList} />
        </div>
      </S.SellerInfoHeader>
      <S.SellerInfoBody>
        <Card bordered={false}>
          <FilterComponent
            permissionList={permissionList}
            searchTypeData={searchType(t)}
            statusTypeData={statusType(t)}
          />
        </Card>
        <TableComponent permissionList={permissionList} />
      </S.SellerInfoBody>
    </>
  );
};

export default SellerInfo;
