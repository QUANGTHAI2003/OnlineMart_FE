import { faHeart, faListAlt, faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { faAngleLeft, faEllipsis, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Popover } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import Cart from "../Popups/Cart/PopupCart";

const PageDetail = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [changeStyleHeader, setChangeStyleHeader] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setChangeStyleHeader(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const content = (
    <div className="w-[186px] rounded max-h-[220px] z-[500]">
      <div
        onClick={() => {
          navigate("/");
        }}
        aria-hidden="true"
        className="flex items-center py-3 cursor-pointer"
      >
        <FontAwesomeIcon icon={faHome} className="text-xl font-light" />
        <span className="pl-3 text-[13px]">{t("user.header.popover_come_home")}</span>
      </div>
      <div
        onClick={() => {
          navigate("/category");
        }}
        aria-hidden="true"
        className="flex items-center py-3 cursor-pointer"
      >
        <FontAwesomeIcon icon={faListAlt} className="text-xl" />
        <span className="pl-3 text-[13px]">{t("user.header.navigation_category")}</span>
      </div>
      <div
        onClick={() => {
          navigate("/account");
        }}
        aria-hidden="true"
        className="flex items-center py-3 cursor-pointer"
      >
        <FontAwesomeIcon icon={faUserCircle} className="text-xl" />
        <span className="pl-3 text-[13px]">{t("user.account_menu.profile")}</span>
      </div>
      <div
        onClick={() => {
          navigate("/account/wishlist");
        }}
        aria-hidden="true"
        className="flex items-center py-3 cursor-pointer"
      >
        <FontAwesomeIcon icon={faHeart} className="text-xl" />
        <span className="pl-3 text-[13px]">{t("user.account_user.account_like")}</span>
      </div>
    </div>
  );

  return (
    <div
      className={`h-[56px] px-4 flex items-center justify-between bg-transparent ${
        changeStyleHeader &&
        `border-solid border-b border-t-0 border-l-0 border-r-0 border-gray-200 transition-all ease-in-out`
      }`}
    >
      <div className="flex items-center justify-center">
        <div className="w-8 h-8 rounded-[20px] bg-transparent flex items-center justify-center">
          <FontAwesomeIcon
            onClick={() => {
              navigate(-1);
            }}
            icon={faAngleLeft}
            className={`text-xl ${changeStyleHeader && `transition ease-in-out text-[#0060FF]`}`}
          />
        </div>
      </div>
      <div className="flex items-center">
        <div>
          {changeStyleHeader ? (
            <Cart
              items={[
                {
                  id: 1,
                  name: "Sách Đắc Nhân Tâm",
                  price: 25000,
                  urlImage: "https://source.unsplash.com/random",
                },
              ]}
              isBlue={true}
            />
          ) : (
            <Cart
              items={[
                {
                  id: 1,
                  name: "Sách Đắc Nhân Tâm",
                  price: 25000,
                  urlImage: "https://source.unsplash.com/random",
                },
              ]}
              isBlue={false}
            />
          )}
        </div>
        <div className="ml-[6px]">
          <Popover placement="top" content={content} trigger="click">
            <div className="w-8 h-8 rounded-[20px] bg-transparent flex items-center justify-center">
              <FontAwesomeIcon
                icon={faEllipsis}
                className={`text-xl ${changeStyleHeader && `transition ease-in-out text-[#0060FF]`}`}
              />
            </div>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default PageDetail;
