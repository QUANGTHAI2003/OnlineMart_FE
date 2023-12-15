import { SearchOutlined } from "@ant-design/icons";
import { adminSuperRoutes } from "@app/configs/routes/super_admin";
import { useDebounce, useResponsive } from "@app/hooks";
import { ISidebarMenu } from "@app/interfaces/routes.interface";
import { Input, Layout, Menu } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

import * as S from "./AdminSuperMainSidebar.styles";

const { Sider } = Layout;

interface IAdminMainSidebarProps {
  isCollapsed?: boolean;
}

const sidebarNavFlat = adminSuperRoutes.reduce(
  (result: ISidebarMenu[], current: any) =>
    result.concat(current.children && current.children.length > 0 ? current.children : current),
  []
);

const filterRoutes = (routes: ISidebarMenu[], searchTerm: string, t: (key: string) => string): ISidebarMenu[] => {
  return routes.reduce((filtered: ISidebarMenu[], route: ISidebarMenu) => {
    const { title, key, children } = route;
    const translatedTitle = t(title);
    const lowerCaseTranslatedTitle = translatedTitle.toLowerCase();

    if (lowerCaseTranslatedTitle.includes(searchTerm.toLowerCase())) {
      filtered.push({
        ...route,
        title: translatedTitle,
      });
    }

    if (children?.length) {
      const filteredChildren = filterRoutes(children, searchTerm, t);
      if (filteredChildren.length) {
        const existingItem = filtered.find((item) => item.key === key);

        if (existingItem) {
          existingItem.children = filteredChildren;
        } else {
          filtered.push({
            ...route,
            children: filteredChildren,
          });
        }
      }
    }

    return filtered;
  }, []);
};

const AdminSuperMainSidebar: React.FC<IAdminMainSidebarProps> = ({ isCollapsed }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const { isDesktop, mobileOnly, tabletOnly } = useResponsive();

  const [searchSidebar, setSearchSidebar] = useState<string>("");
  const debouncedSearchSidebar = useDebounce(searchSidebar, 200);
  const [openKeys, setOpenKeys] = useState<string[] | undefined>([""]);

  const isCollapsible = useMemo(() => mobileOnly && tabletOnly, [mobileOnly, tabletOnly]);

  const handleSearchSidebar = (value: any) => {
    setSearchSidebar(value);
  };

  const handleResetSearchSidebar = () => {
    setSearchSidebar("");
  };

  // Set default selected keys
  const currentMenuItem = sidebarNavFlat.find(({ url }: any) => url === location.pathname);
  const defaultSelectedKeys = currentMenuItem ? [currentMenuItem.key] : [];

  const openedSubmenu = adminSuperRoutes.find(
    ({ children }: any) => children?.some(({ url }: any) => url === location.pathname)
  );
  const defaultOpenKeys = openedSubmenu ? [openedSubmenu.key] : [];

  // Filter sidebar menu
  const checkSearch = debouncedSearchSidebar.trim()?.length > 0;
  const filteredRoutes = useMemo(() => {
    return checkSearch ? filterRoutes(adminSuperRoutes, debouncedSearchSidebar, t) : adminSuperRoutes;
  }, [checkSearch, debouncedSearchSidebar, t]);

  useEffect(() => {
    const openKeySearch = checkSearch ? filteredRoutes.map(({ key }: any) => key) : [];
    setOpenKeys(openKeySearch);
  }, [checkSearch, filteredRoutes]);

  // Handle open only current submenu
  const rootSubmenuKeys = adminSuperRoutes.map(({ key }: any) => key);

  const handleOpenOnyCurrenSubMenu = (keys: any) => {
    if (!checkSearch) {
      const latestOpenKey = keys.find((key: any) => openKeys?.indexOf(key) === -1);
      if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        setOpenKeys(keys);
      } else {
        setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
      }
    }
  };

  return (
    <Sider trigger={null} collapsible={isCollapsible} collapsed={isDesktop ? isCollapsed : !isCollapsed} width={250}>
      <S.LogoStyle className="logo">
        <Link to="">
          <img
            src="https://salt.tikicdn.com/cache/w32/ts/sellercenterFE/93/76/03/2a08fa4ae6a024a752fbba87d145bce8.png"
            alt="Seller Center"
            width="32"
            height="32"
          />
          <h1>Super admin</h1>
        </Link>
      </S.LogoStyle>
      {(isDesktop ? !isCollapsed : isCollapsed) && (
        <S.SearchStyle className="search">
          <Input
            addonBefore={<SearchOutlined />}
            bordered={false}
            placeholder="Tìm kiếm ..."
            onChange={(e: any) => handleSearchSidebar(e.target.value)}
          />
        </S.SearchStyle>
      )}
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={defaultSelectedKeys}
        defaultOpenKeys={defaultOpenKeys}
        openKeys={openKeys}
        onClick={handleResetSearchSidebar}
        onOpenChange={handleOpenOnyCurrenSubMenu}
        items={filteredRoutes.map((nav: any) => {
          const isSubMenu = nav.children?.length;

          return {
            key: nav.key,
            title: t(nav.title),
            label: isSubMenu ? t(nav.title) : <Link to={nav.url || ""}>{t(nav.title)}</Link>,
            icon: nav.icon,
            children:
              isSubMenu &&
              nav.children?.map((subNav: any) => ({
                key: subNav.key,
                title: t(subNav.title),
                label: <Link to={subNav.url || ""}>{t(subNav.title)}</Link>,
                icon: subNav.icon,
              })),
          };
        })}
      />
    </Sider>
  );
};

export default AdminSuperMainSidebar;
