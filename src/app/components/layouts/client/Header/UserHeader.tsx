import logo from "@app/app/assets/images/Logo.svg";
import { useResponsive } from "@app/hooks";
import { useAppSelector } from "@app/store/store";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";

import PageAccount from "./HeaderResponsive/PageAccount";
import PageDetail from "./HeaderResponsive/PageDetail";
import Notification from "./Nofitication/Notification";
import AccountMenu from "./Popups/Account/AccountMenu";
import Cart from "./Popups/Cart/PopupCart";
import PopupLanguage from "./Popups/Language/PopupLanguage";
import Search from "./SearchBar/Search";

const UserHeader = () => {
  const user = useAppSelector((state) => state.userState.user);

  let isAuthenticated = false;
  if (user) {
    isAuthenticated = true;
  } else {
    isAuthenticated = false;
  }
  const { t } = useTranslation();
  const location = useLocation();
  const history = useNavigate();
  const { isDesktop } = useResponsive();

  const haveMainHeader = location.pathname === "/category" || location.pathname === "/";
  const haveBtnCallback = location.pathname === "/category" || location.pathname === "search";
  const haveHeaderPageAccount = location.pathname.startsWith("/account/") || location.pathname.startsWith("/checkout");
  const haveHeaderPageDetail = location.pathname === "/product";

  return (
    <header
      className={`${
        !isDesktop &&
        `sticky top-0 left-0 right-0 z-[150] border-solid border-b border-t-0 border-l-0 border-r-0 border-gray-200 shadow-inner`
      } h-auto xl:h-[120px] bg-white`}
    >
      <div className="xl:w-[1200px] max-w-full mx-auto my-0">
        <nav className="hidden xl:flex justify-between items-center h-[35px]">
          <ul className="mt-[5px]">
            <li className="inline-block mx-1 relative after:content-[''] after:block after:absolute after:w-[1px] after:h-[15px] after:bg-black after:right-[-5px] after:top-[50%] after:transform after:translate-y-[-50%]">
              <Link to="/admin/shop" className="text-black">
                {t("user.header.seller_home")}
              </Link>
            </li>
            <li className="inline-block mx-2 relative after:content-[''] after:block after:absolute after:w-[1px] after:h-[15px] after:bg-black after:right-[-5px] after:top-[50%] after:transform after:translate-y-[-50%]">
              <Link to="/admin/shop" className="text-black">
                {t("user.header.seller")}
              </Link>
            </li>
            <li className="inline-block mx-1">
              <div className="text-black inline-flex items-center">
                <span className="cursor-text">{t("user.header.contact")}</span>
                <a href="/#">
                  <FontAwesomeIcon icon={faFacebook} className="text-base mx-1 text-black" />
                </a>
                <a href="/#">
                  <FontAwesomeIcon icon={faInstagram} className="text-base mx-1 text-black" />
                </a>
              </div>
            </li>
          </ul>

          <ul className="flex items-center mt-[5px]">
            <li className="inline-block">
              <Notification />
            </li>
            <li className="inline-block">
              <div>
                <PopupLanguage />
              </div>
            </li>
            <li className="inline-block">
              {!isAuthenticated ? (
                <>
                  <Link
                    to="/auth?tab=signup"
                    className="text-base text-black mr-1 inline-block relative after:content-[''] after:block after:absolute after:w-[1px] after:h-[15px] after:bg-black after:right-[-5px] after:top-[50%] after:transform after:translate-y-[-40%]"
                  >
                    {t("user.header.register")}
                  </Link>
                  <Link to="/auth?tab=login" className="text-base text-black ml-2">
                    {t("user.header.login")}
                  </Link>
                </>
              ) : (
                <AccountMenu />
              )}
            </li>
          </ul>
        </nav>

        {isDesktop && (
          <div className="px-3 flex xl:flex items-center justify-between h-[calc(120px_-_35px)]">
            <Link to="/" className="hidden xl:w-[200px] xl:flex items-center">
              <img src={logo} alt="logo-svg" className="w-[150px]" />
            </Link>
            {haveBtnCallback && (
              <div className="xl:hidden h-10 min-w-10 w-10 flex items-center justify-center">
                <FontAwesomeIcon
                  onClick={() => {
                    history(-1);
                  }}
                  aria-hidden="true"
                  icon={faAngleLeft}
                  className="text-lg text-[#000] cursor-pointer"
                />
              </div>
            )}
            <div className="flex-1">
              <Search />
            </div>
            <div className="w-10 h-10 ml-2 flex items-center justify-center xl:w-[150px] text-center">
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
            </div>
          </div>
        )}
        {!isDesktop && haveMainHeader && (
          <div className="px-3 flex xl:flex items-center justify-between h-[calc(120px_-_35px)]">
            <div className="hidden xl:w-[200px] xl:flex items-center">
              <img src={logo} alt="logo-svg" className="w-[150px]" />
            </div>
            {haveBtnCallback && (
              <div className="xl:hidden h-10 min-w-10 w-10 flex items-center justify-center">
                <FontAwesomeIcon
                  onClick={() => {
                    history(-1);
                  }}
                  aria-hidden="true"
                  icon={faAngleLeft}
                  className="text-lg text-[#000] cursor-pointer"
                />
              </div>
            )}
            <div className="flex-1">
              <Search />
            </div>
            <div className="w-10 h-10 ml-2 flex items-center justify-center xl:w-[150px] text-center">
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
            </div>
          </div>
        )}
        {!isDesktop && haveHeaderPageAccount && <PageAccount />}
        {!isDesktop && haveHeaderPageDetail && <PageDetail />}
      </div>
    </header>
  );
};

export default UserHeader;
