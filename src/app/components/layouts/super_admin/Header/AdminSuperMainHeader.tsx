import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, theme } from "antd";

import PopupLanguage from "../../client/Header/Popups/Language/PopupLanguage";

import * as S from "./AdminSuperMainHeader.styles";
import { AccountItem, NotificationItem } from "./components";

interface IMainHeaderProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

const AdminSuperMainHeader: React.FC<IMainHeaderProps> = ({ isCollapsed, toggleSidebar }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout.Header style={{ padding: 0, background: colorBgContainer }}>
      <S.Header className="header">
        <Button
          type="text"
          icon={isCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={toggleSidebar}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
          }}
        />

        <S.HeaderRight className="header_right">
          <NotificationItem />
          <AccountItem />
          <PopupLanguage />
        </S.HeaderRight>
      </S.Header>
    </Layout.Header>
  );
};

export default AdminSuperMainHeader;
