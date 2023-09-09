import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { SwitchLanguage } from "@app/app/components/SwitchLanguage/SwitchLanguage";
import { Button, Layout, theme } from "antd";

interface IMainHeaderProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

const MainHeader: React.FC<IMainHeaderProps> = ({ isCollapsed, toggleSidebar }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout.Header style={{ padding: 0, background: colorBgContainer }}>
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
      <SwitchLanguage />
    </Layout.Header>
  );
};

export default MainHeader;
