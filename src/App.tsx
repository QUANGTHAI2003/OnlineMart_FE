import { ConfigProvider } from "antd";
import enUS from "antd/lib/locale/en_US";
import viVN from "antd/lib/locale/vi_VN";
import { HelmetProvider } from "react-helmet-async";

import AppRouter from "./AppRouter";
import { useLanguage } from "./hooks";
const App = () => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const { language } = useLanguage();

  const defaultTheme = {
    borderRadius: 4,
    colorPrimary: "#0a68ff",
  };

  // const a = 0;
  // notificationController.error({
  //   message: "Thành công",
  //   description: "Đăng nhập thành công",
  // });

  // const metaTitle = document.querySelector('meta[name="title"]');
  // console.log(metaTitle);
  // const metaKeywords = document.querySelector('meta[name="keywords"]');
  // console.log(metaKeywords);
  // const metaDescription = document.querySelector('meta[name="description"]');
  // console.log(metaDescription);

  return (
    <HelmetProvider>
      <ConfigProvider
        prefixCls="om"
        iconPrefixCls="om"
        theme={{ token: { colorPrimary: defaultTheme.colorPrimary, borderRadius: defaultTheme.borderRadius } }}
        locale={language === "en" ? enUS : viVN}
      >
        <AppRouter />
      </ConfigProvider>
    </HelmetProvider>
  );
};

export default App;
