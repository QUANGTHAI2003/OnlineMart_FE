import { ConfigProvider } from "antd";
import enUS from "antd/lib/locale/en_US";
import viVN from "antd/lib/locale/vi_VN";
import { HelmetProvider } from "react-helmet-async";

import { PermissionsProvider } from "./app/components/common/Permissions";
import AppRouter from "./AppRouter";
import { useLanguage } from "./hooks";
import { useAppSelector } from "./store/store";
const App = () => {
  const { language } = useLanguage();

  const defaultTheme = {
    borderRadius: 4,
    colorPrimary: "#0a68ff",
  };

  const helmetContext = {};
  const userPermissions = useAppSelector((state) => state.userState?.user?.permissions);

  return (
    <HelmetProvider context={helmetContext}>
      <ConfigProvider
        prefixCls="om"
        iconPrefixCls="om"
        theme={{ token: { colorPrimary: defaultTheme.colorPrimary, borderRadius: defaultTheme.borderRadius } }}
        locale={language === "en" ? enUS : viVN}
      >
        <PermissionsProvider permissions={userPermissions}>
          <AppRouter />
        </PermissionsProvider>
      </ConfigProvider>
    </HelmetProvider>
  );
};

export default App;
