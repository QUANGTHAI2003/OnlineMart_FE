import { setShowSidebar } from "@app/store/slices/redux/user/responsiveSidebar";
import { useAppDispatch, useAppSelector } from "@app/store/store";
import { faBell, faFaceSmile } from "@fortawesome/free-regular-svg-icons";
import { faHouseFire, faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TFunction } from "i18next";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

const navigationTab: any = (t: TFunction<"translation", undefined>) => {
  return [
    {
      icon: faHouseFire,
      label: t("user.header.navigation_home"),
      url: "/",
      code: "home",
    },
    {
      icon: faList,
      label: t("user.header.navigation_category"),
      url: "/category",
      code: "category",
    },
    {
      icon: faBell,
      label: t("user.header.navigation_notifications"),
      url: "/account/notifications",
      code: "notification",
    },
    {
      icon: faFaceSmile,
      label: t("user.header.navigation_user"),
      url: "/account",
      code: "account",
    },
  ];
};

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [activeTab, setActiveTab] = useState<string>("");
  const activeTabColor = "text-[#0B74E5]";
  const normalTabColor = "text-[#242424]";

  const user = useAppSelector((state) => state.userState.user);

  const handleTabClick = (tab: string, path: string) => {
    setActiveTab(tab);
    navigate(path);

    if (tab === "notification") {
      dispatch(setShowSidebar(false));
    }
    dispatch(setShowSidebar(true));

    if (tab === "account" && !user) {
      navigate("/auth");
    }
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
  }, [dispatch, location]);

  return (
    <div className="w-full flex justify-between fixed bottom-0 bg-white border-t border-solid border-[#f1f1f1] border-l-0 border-r-0 border-b-0 z-50 shadow-[0_1px_4px_rgba(0,0,0,0.16)]">
      {navigationTab(t).map((item: any) => {
        return (
          <div
            key={item.code}
            className={`w-full relative z-[1] flex items-center justify-center p-3 flex-col ${normalTabColor} text-[10px] no-underline cursor-pointer transition-all ease-linear ${
              activeTab === item.code ? activeTabColor : ""
            }`}
            onClick={() => handleTabClick(item.code, item.url)}
            onKeyDown={() => handleTabClick(item.code, item.url)}
            role="button"
            tabIndex={0}
            aria-hidden={activeTab === item.code ? true : false}
          >
            <div className="w-5 pb-1">
              <div className="pt-[100%] relative bg-white">
                <FontAwesomeIcon
                  icon={item.icon}
                  className={`w-6 h-6 object-contain absolute top-0 left-0 z-[2]  ${
                    activeTab === item.code ? activeTabColor : normalTabColor
                  }`}
                />
              </div>
            </div>
            <span className={`text-base mt-1 ${activeTab === item.code ? activeTabColor : normalTabColor}`}>
              {item.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default Navigation;
