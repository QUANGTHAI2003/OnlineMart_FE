import { BreadcrumbProps } from "antd";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

import breadcrumbNameMap from "./breadcrumb.map";
import * as S from "./Breadcrumb.styles";

export const BreadcrumbItem = S.BreadcrumbItem;

export const AdminBreadcrumb: React.FC<BreadcrumbProps> = ({ children, ...props }) => {
  const shopRoute = "/admin/shop";
  const { t } = useTranslation();

  const location = useLocation();
  const pathSnippets = location.pathname.split("/").filter((i) => i);

  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    const translationKey = breadcrumbNameMap[url];
    const title = t(translationKey);

    return {
      key: url,
      title: <Link to={url}>{title}</Link>,
    };
  });

  const breadcrumbItems = [
    {
      title: <Link to={shopRoute}>{t("admin_shop.sidebar.dashboard")}</Link>,
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
