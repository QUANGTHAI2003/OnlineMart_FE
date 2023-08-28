import logo from "@app/app/assets/images/Logo.svg";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";

import Notification from "./Nofitication/Notification";
import AccountMenu from "./Popups/Account/AccountMenu";
import Cart from "./Popups/Cart/PopupCart";
import PopupLanguage from "./Popups/Language/PopupLanguage";
import Search from "./SearchBar/Search";

const UserHeader = () => {
  const isAuthenticated = true;
  const { t } = useTranslation();

  return (
    <header className="h-[120px] bg-white">
      <div className="w-[1200px] max-w-full mx-auto my-0">
        <nav className="flex justify-between items-center h-[35px]">
          <ul className="mt-[5px]">
            <li className="inline-block mx-1 relative after:content-[''] after:block after:absolute after:w-[1px] after:h-[15px] after:bg-black after:right-[-5px] after:top-[50%] after:transform after:translate-y-[-50%]">
              <a href="/#" className="text-black">
                {t("user.header.seller_home")}
              </a>
            </li>
            <li className="inline-block mx-2 relative after:content-[''] after:block after:absolute after:w-[1px] after:h-[15px] after:bg-black after:right-[-5px] after:top-[50%] after:transform after:translate-y-[-50%]">
              <a href="/#" className="text-black">
                {t("user.header.seller")}
              </a>
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
              <a href="/#">
                <Notification />
              </a>
            </li>
            <li className="inline-block">
              <div>
                <PopupLanguage />
              </div>
            </li>
            <li className="inline-block">
              {!isAuthenticated ? (
                <>
                  <a
                    href="/#"
                    className="text-base text-black mr-1 inline-block relative after:content-[''] after:block after:absolute after:w-[1px] after:h-[15px] after:bg-black after:right-[-5px] after:top-[50%] after:transform after:translate-y-[-40%]"
                  >
                    {t("user.header.register")}
                  </a>
                  <a href="/#" className="text-base text-black ml-2">
                    {t("user.header.login")}
                  </a>
                </>
              ) : (
                <a href="/#" className="text-black">
                  <AccountMenu name="Pham Truong Xuan" avatar="https://source.unsplash.com/random" />
                </a>
              )}
            </li>
          </ul>
        </nav>

        <div className="flex items-center justify-between h-[calc(120px_-_35px)]">
          <div className="w-[200px] flex items-center">
            <img src={logo} alt="logo-svg" className="w-[150px]" />
          </div>
          <div className="flex-1">
            <Search />
          </div>
          <div className="w-[150px] text-center">
            <Cart
              items={[
                {
                  id: 1,
                  name: "Sách Đắc Nhân Tâm",
                  price: 25000,
                  urlImage: "https://source.unsplash.com/random",
                },
              ]}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default UserHeader;
