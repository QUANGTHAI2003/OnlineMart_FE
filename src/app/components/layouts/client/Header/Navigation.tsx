import { faBell, faFaceSmile } from "@fortawesome/free-regular-svg-icons";
import { faHouseFire, faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<string>("");

  const handleTabClick = (tab: string, path: string) => {
    setActiveTab(tab);
    navigate(path);
  };

  useEffect(() => {
    if (location.pathname === "/") {
      setActiveTab("home");
    } else if (location.pathname === "/account") {
      setActiveTab("account");
    } else if (location.pathname === "/category") {
      setActiveTab("category");
    } else if (location.pathname === "/notifications") {
      setActiveTab("notifications");
    }
  }, [location]);

  return (
    <div className="w-full flex justify-between fixed bottom-0 bg-white border-t border-solid border-[#f1f1f1] border-l-0 border-r-0 border-b-0 z-50">
      <div
        className={`w-16 relative z-[1] flex items-center justify-center pt-[5px] pb-[6px] flex-col text-[#242424] text-[10px] no-underline cursor-pointer transition-all ease-linear ${
          activeTab === "home" ? "text-[#0B74E5]" : ""
        }`}
        onClick={() => handleTabClick("home", "/")}
        aria-hidden="true"
      >
        <div className="w-5 pb-1">
          <div className="pt-[100%] relative bg-white">
            <FontAwesomeIcon
              icon={faHouseFire}
              className={`w-4 h-4 object-contain absolute top-0 left-0 z-[2]  ${
                activeTab === "home" ? "text-[#0B74E5]" : "text-[#242424]"
              }`}
            />
          </div>
        </div>
        <span className={`${activeTab === "home" ? "text-[#0B74E5]" : "text-[#242424]"}`}>
          {t("user.header.navigation_home")}
        </span>
      </div>
      <div
        className={`w-16 relative z-[1] flex items-center justify-center pt-[5px] pb-[6px] flex-col text-[#242424] text-[10px] no-underline cursor-pointer transition-all ease-linear ${
          activeTab === "category" ? "text-[#0B74E5]" : ""
        }`}
        onClick={() => handleTabClick("category", "category")}
        aria-hidden="true"
      >
        <div className="w-5 pb-1">
          <div className="pt-[100%] relative bg-white">
            <FontAwesomeIcon
              icon={faList}
              className={`w-4 h-4 object-contain absolute top-0 left-0 z-[2] ${
                activeTab === "category" ? "text-[#0B74E5]" : "text-[#242424]"
              }`}
            />
          </div>
        </div>
        <span className={`${activeTab === "category" ? "text-[#0B74E5]" : "text-[#242424]"}`}>
          {t("user.header.navigation_category")}
        </span>
      </div>
      <div
        className={`w-16 relative z-[1] flex items-center justify-center pt-[5px] pb-[6px] flex-col text-[#242424] text-[10px] no-underline cursor-pointer transition-all ease-linear ${
          activeTab === "notification" ? "text-[#0B74E5]" : ""
        }`}
        onClick={() => handleTabClick("notification", "/account/notifications")}
        aria-hidden="true"
      >
        <div className="w-5 pb-1">
          <div className="pt-[100%] relative bg-white">
            <FontAwesomeIcon
              icon={faBell}
              className={`w-4 h-4 object-contain absolute top-0 left-0 z-[2] ${
                activeTab === "notification" ? "text-[#0B74E5]" : "text-[#242424]"
              }`}
            />
          </div>
        </div>
        <span className={`${activeTab === "chat" ? "text-[#0B74E5]" : "text-[#242424]"}`}>
          {t("user.header.navigation_notifications")}
        </span>
      </div>
      <div
        className={`w-16 relative z-[1] flex items-center justify-center pt-[5px] pb-[6px] flex-col text-[#242424] text-[10px] no-underline cursor-pointer transition-all ease-linear ${
          activeTab === "account" ? "text-[#0B74E5]" : ""
        }`}
        onClick={() => handleTabClick("account", "account")}
        aria-hidden="true"
      >
        <div className="w-5 pb-1">
          <div className="pt-[100%] relative bg-white">
            <FontAwesomeIcon
              icon={faFaceSmile}
              className={`w-4 h-4 object-contain absolute top-0 left-0 z-[2] ${
                activeTab === "account" ? "text-[#0B74E5]" : "text-[#242424]"
              }`}
            />
          </div>
        </div>
        <span className={`${activeTab === "account" ? "text-[#0B74E5]" : "text-[#242424]"}`}>
          {t("user.header.navigation_user")}
        </span>
      </div>
    </div>
  );
};

export default Navigation;
