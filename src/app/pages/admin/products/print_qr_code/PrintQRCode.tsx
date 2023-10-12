import { AdminBreadcrumb } from "@app/app/components/common/Breadcrumb/Breadcrumb";
import { Typography } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { InventoryListData } from "../inventory/data";

import { FilterComponent, SettingUpQRPrint, TableComponentQRCode } from "./components";
import * as S from "./PrintQRCode.styles";
import { BreadcrumbSkeleton, FilterSkeleton, SettingUpSkeleton, TableSkeleton } from "./skeletons";

const { Title } = Typography;

const PrintQRCode = () => {
  const { t } = useTranslation();

  const [loadingSkeleton, setLoadingSkeleton] = useState<boolean>(false);
  useEffect(() => {
    setLoadingSkeleton(true);
    setTimeout(() => {
      setLoadingSkeleton(false);
    }, 1000);
  }, []);

  return (
    <div>
      {loadingSkeleton ? (
        <BreadcrumbSkeleton count={1} />
      ) : (
        <S.SiteHeader>
          <AdminBreadcrumb />

          <Title level={4}>{t("admin_shop.print_qrcode.site_header.print_qr_code")}</Title>
        </S.SiteHeader>
      )}

      {loadingSkeleton ? <FilterSkeleton count={1} /> : <FilterComponent inventoryData={InventoryListData} />}

      {loadingSkeleton ? <TableSkeleton count={1} /> : <TableComponentQRCode />}

      {loadingSkeleton ? <SettingUpSkeleton count={1} /> : <SettingUpQRPrint />}
    </div>
  );
};
export default PrintQRCode;
