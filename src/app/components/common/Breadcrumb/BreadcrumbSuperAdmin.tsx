import { BreadcrumbProps } from "antd";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

import * as S from "./Breadcrumb.styles";
import breadcrumbNameMapSuperAdmin from "./breadcrumbSuperAdmin.map";

export const BreadcrumbItem = S.BreadcrumbItem;

export const SuperAdminBreadcrumb: React.FC<BreadcrumbProps> = ({ children, ...props }) => {
  const superAdminRoute = "/admin/super";
  const { t } = useTranslation();

  const location = useLocation();
  const pathSnippets = location.pathname.split("/").filter((i) => i);

  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    const translationKey = breadcrumbNameMapSuperAdmin[url];
    const title = t(translationKey);

    return {
      key: url,
      title: <Link to={url}>{title}</Link>,
    };
  });

  const breadcrumbItems = [
    {
      title: <Link to={superAdminRoute}>{t("admin_super.sidebar.dashboard")}</Link>,
      key: "dashboard",
    },
    ...extraBreadcrumbItems.slice(2),
  ];

  const lastItem = extraBreadcrumbItems[extraBreadcrumbItems.length - 1];
  if (lastItem) {
    breadcrumbItems[breadcrumbItems.length - 1] = {
      ...lastItem,
      title: lastItem.title.props.children,
    };
  }

  return (
    <S.Breadcrumb items={breadcrumbItems} {...props}>
      {children}
    </S.Breadcrumb>
  );
};
