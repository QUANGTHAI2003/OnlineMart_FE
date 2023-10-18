import { AdminBreadcrumb } from "@app/app/components/common/Breadcrumb/Breadcrumb";
import { useDebounce } from "@app/hooks";
import { Col, Row, Typography } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { AddRole, FilterComponent, TableComponent } from "./components";
import * as S from "./RoleManage.styles";
import { BreadcrumbSkeleton, FilterSkeleton, MainTitleSkeleton, TableSkeleton } from "./skeleton";

const { Title } = Typography;

const searchType = (t: any) => {
  return [
    { value: "name", label: t("admin_shop.manage_seller.search_type.name") },
    { value: "created_at", label: t("admin_shop.manage_seller.search_type.create_at") },
    { value: "updated_at", label: t("admin_shop.manage_seller.search_type.updated_at") },
  ];
};

const RoleManage = () => {
  const { t } = useTranslation();

  const [loadingSkeletonCount, setLoadingSkeletonCount] = useState<boolean>(false);
  useEffect(() => {
    setLoadingSkeletonCount(true);
    setTimeout(() => {
      setLoadingSkeletonCount(false);
    }, 100);
  }, []);

  const [searchValue, setSearchValue] = useState<string>("");
  const [selectSearchType, setSelectSearchType] = useState<string>(searchType(t)[0].value);
  const debouncedSearchValue = useDebounce(searchValue, 300);

  return (
    <S.RoleManage>
      <div className="site_header">
        {loadingSkeletonCount ? <BreadcrumbSkeleton count={1} /> : <AdminBreadcrumb />}

        {loadingSkeletonCount ? (
          <MainTitleSkeleton count={1} />
        ) : (
          <Row justify="space-between" align="middle" className="main_title">
            <Col span={16}>
              <Title level={4} className="mb-0">
                {t("admin_shop.manage_seller.site_header.list_of_roles")}
              </Title>
            </Col>
            <Col span={8} className="flex justify-end">
              <AddRole />
            </Col>
          </Row>
        )}

        <Row>
          <Col sm={15} lg={13} xl={10}>
            {loadingSkeletonCount ? (
              <FilterSkeleton count={1} />
            ) : (
              <FilterComponent
                setSearchValue={setSearchValue}
                setSelectSearchType={setSelectSearchType}
                searchTypeData={searchType(t)}
              />
            )}
          </Col>
        </Row>
      </div>

      <div className="p-4">
        {loadingSkeletonCount ? (
          <TableSkeleton count={1} />
        ) : (
          <TableComponent searchValue={debouncedSearchValue} searchType={selectSearchType} />
        )}
      </div>
    </S.RoleManage>
  );
};

export default RoleManage;
