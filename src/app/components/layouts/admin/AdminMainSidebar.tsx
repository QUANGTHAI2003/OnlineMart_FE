import { adminShopRoutes } from "@app/configs/routes/admin_shop";
import { ISidebarMenu } from "@app/interfaces/routes.interface";
import { Layout, Menu } from "antd";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

const { Sider } = Layout;

interface IMainSidebarProps {
  isCollapsed?: boolean;
}

const sidebarNavFlat = adminShopRoutes.reduce(
  (result: ISidebarMenu[], current: any) =>
    result.concat(current.children && current.children.length > 0 ? current.children : current),
  []
);

const MainSidebar: React.FC<IMainSidebarProps> = ({ isCollapsed }) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const { t } = useTranslation();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const location = useLocation();

  const currentMenuItem = sidebarNavFlat.find(({ url }) => url === location.pathname);
  const defaultSelectedKeys = currentMenuItem ? [currentMenuItem.key] : [];

  const openedSubmenu = adminShopRoutes.find(
    ({ children }) => children?.some(({ url }: any) => url === location.pathname)
  );
  const defaultOpenKeys = openedSubmenu ? [openedSubmenu.key] : [];
  console.log("sidebar render");

  return (
    <Sider trigger={null} collapsible collapsed={isCollapsed}>
      <div className="demo-logo-vertical" />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={defaultSelectedKeys}
        defaultOpenKeys={defaultOpenKeys}
        items={adminShopRoutes.map((nav) => {
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

export default MainSidebar;
