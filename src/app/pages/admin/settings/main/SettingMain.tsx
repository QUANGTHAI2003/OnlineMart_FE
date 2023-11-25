import { AdminBreadcrumb } from "@app/app/components/common/Breadcrumb/Breadcrumb";
import { useResponsive } from "@app/hooks";
import {
  faClockRotateLeft,
  faFolderOpen,
  faGears,
  faStore,
  faTrashCan,
  faUserGear,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";

import SearchBar from "./components/SearchBar";

const SettingMain = () => {
  const { t } = useTranslation();
  const { isTablet } = useResponsive();

  return (
    <div>
      <AdminBreadcrumb className="bg-white px-6" />
      <SearchBar />
      <div className="flex mx-8 flex-col justify-center">
        <div className="mb-6 bg-white">
          <h5 className="py-3 pr-0 pl-6 text-xl border-b border-t-0 border-l-0 border-r-0 border-solid border-[#E8EAEB]">
            {t("admin_shop.settings.setup_shop.title")}
          </h5>
          <div className={`flex ${isTablet ? `flex-wrap` : "flex-col"} p-6 mr-[-12px] w-[calc(100%_+_24px)]`}>
            <div className="relative flex-grow-0 p-3 max-w-[70%] basis-1/4 ">
              <a href="/admin/shop/settings" className="text-[#0088FF] no-underline mb-1">
                <div className="h-28 flex flex-row rounded-[3px] xl:h-24 p-4 bg-[#F2F9FF] border border-solid border-[#F2F9FF]">
                  <div className="w-8 h-8 mr-3">
                    <FontAwesomeIcon icon={faStore} className="text-xl text-[#08F]" />
                  </div>
                  <div className="flex flex-col">
                    <h6 className="text-sm text-[#182537]">
                      {t("admin_shop.settings.setup_shop.item.information_shop")}
                    </h6>
                    <p className="leading-5 md:line-clamp-1 xs:line-clamp-1 xl:line-clamp-none text-sm text-[#747C87] ">
                      {t("admin_shop.settings.setup_shop.item.description_shop")}
                    </p>
                  </div>
                </div>
              </a>
            </div>
            <div className="relative flex-grow-0 p-3 max-w-[70%] basis-1/4 ">
              <a href="/admin/shop/settings" className="text-[#0088FF] no-underline">
                <div className="h-28 flex flex-row rounded-[3px] xl:h-24 p-4 bg-[#F2F9FF] border border-solid border-[#F2F9FF]">
                  <div className="w-8 h-8 mr-3">
                    <FontAwesomeIcon icon={faUserGear} className="text-xl text-[#08F]" />
                  </div>
                  <div className="flex flex-col">
                    <h6 className="text-sm text-[#182537] ">{t("admin_shop.settings.setup_shop.item.staff")}</h6>
                    <p className="leading-5 md:line-clamp-1 xs:line-clamp-1 xl:line-clamp-none text-sm text-[#747C87] ">
                      {t("admin_shop.settings.setup_shop.item.description_staff")}
                    </p>
                  </div>
                </div>
              </a>
            </div>
            <div className="relative flex-grow-0 p-3 max-w-[70%] basis-1/4 ">
              <a href="/admin/shop/settings" className="text-[#0088FF] no-underline">
                <div className="h-28 flex flex-row rounded-[3px] xl:h-24 p-4 bg-[#F2F9FF] border border-solid border-[#F2F9FF]">
                  <div className="w-8 h-8 mr-3">
                    <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg" fontSize="24">
                      <path
                        d="M22 6.77V.75a.75.75 0 0 0-.75-.75h-2.5a.75.75 0 0 0-.75.75v2.34a12.1 12.1 0 0 0-6-1.59C5.375 1.5-.013 6.784 0 13.273c.002.403.347.725.75.725H2v9a1 1 0 0 0 1 1h2V12h14v12h2a1 1 0 0 0 1-1v-9h1.25c.403 0 .748-.322.75-.726a11.506 11.506 0 0 0-2-6.504Z"
                        fill="#08F"
                      ></path>
                      <path
                        d="M7.747 21.499h8.5a1.25 1.25 0 1 1 0 2.501h-8.5a1.25 1.25 0 1 1 0-2.501ZM7.747 17.5h8.5a1.25 1.25 0 1 1 0 2.5h-8.5a1.25 1.25 0 1 1 0-2.5ZM7.747 13.5h8.5a1.25 1.25 0 1 1 0 2.5h-8.5a1.25 1.25 0 1 1 0-2.5Z"
                        fill="#08F"
                      ></path>
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <h6 className="text-sm text-[#182537] ">
                      {t("admin_shop.settings.setup_sale.item.managers_product")}
                    </h6>
                    <p className="md:line-clamp-1 xs:line-clamp-1 xl:line-clamp-none text-sm text-[#747C87] leading-5">
                      {t("admin_shop.settings.setup_sale.item.description_product")}
                    </p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div className="mb-6 bg-white">
          <h5 className="py-3 pr-0 pl-6 text-xl border-b border-t-0 border-l-0 border-r-0 border-solid border-[#E8EAEB]">
            {t("admin_shop.settings.setup_sale.title")}
          </h5>
          <div className={`flex ${isTablet ? `flex-wrap` : "flex-col"} p-6 mr-[-12px] w-[calc(100%_+_24px)]`}>
            <div className="relative flex-grow-0 p-3 max-w-[70%] basis-1/4 ">
              <a href="/admin/shop/settings" className="text-[#0088FF] no-underline">
                <div className="h-28 flex flex-row rounded-[3px] xl:h-24 p-4 bg-[#F2F9FF] border border-solid border-[#F2F9FF]">
                  <div className="w-8 h-8 mr-3">
                    <FontAwesomeIcon icon={faGears} className="text-xl text-[#08F]" />
                  </div>
                  <div className="flex flex-col">
                    <h6 className="text-sm text-[#182537] ">{t("admin_shop.settings.setup_sale.item.sale")}</h6>
                    <p className="md:line-clamp-1 xs:line-clamp-1 xl:line-clamp-none text-sm text-[#747C87] ">
                      {t("admin_shop.settings.setup_sale.item.description_sale")}
                    </p>
                  </div>
                </div>
              </a>
            </div>
            <div className="relative flex-grow-0 p-3 max-w-[70%] basis-1/4">
              <a href="/admin/shop/settings" className="text-[#0088FF] no-underline">
                <div className="h-28 flex flex-row rounded-[3px] xl:h-24 p-4 bg-[#F2F9FF] border border-solid border-[#F2F9FF]">
                  <div className="w-8 h-8 mr-3">
                    <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg" fontSize="24">
                      <path
                        d="m8.796 1.02-4.631.018c-.6 0-1.162.334-1.448.858L.297 6.279l8.032-.018.466-5.241ZM18.764 6.24l-2.449-4.382A1.674 1.674 0 0 0 14.857 1l-4.63.019.486 5.24 8.05-.018ZM8.807 16.136c.002-.558.232-1.1.631-1.49l4.398-4.244c.39-.376.904-.584 1.448-.584a2.082 2.082 0 0 1 2.082 2.09l-.002.677c.58.12 1.144.298 1.685.529l.009-2.4.01.004-.005-1.464.006-1.546h-.012v-.047l-8.814.029H8.826L.012 7.662v.047H0l.005 1.545L0 10.719l.01-.004.028 7.885c0 .83.678 1.505 1.497 1.505h.01l7.989-.021 2.419.006-2.518-2.457a2.1 2.1 0 0 1-.628-1.497Z"
                        fill="#08F"
                      ></path>
                      <path
                        d="m16.012 14.14.007-2.425a.43.43 0 0 0-.727-.31l-4.876 4.693a.427.427 0 0 0 0 .614l4.848 4.718a.427.427 0 0 0 .729-.305L16 18.703l.812.002a7.301 7.301 0 0 1 6.37 3.765l.012.022a.429.429 0 0 0 .805-.203c.012-4.434-3.557-8.06-7.987-8.148Z"
                        fill="#08F"
                      ></path>
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <h6 className="text-sm text-[#182537] ">{t("admin_shop.settings.setup_sale.item.return")}</h6>
                    <p className="md:line-clamp-1 xs:line-clamp-1 xl:line-clamp-none text-sm text-[#747C87] ">
                      {t("admin_shop.settings.setup_sale.item.description_return")}
                    </p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div className="mb-6 bg-white">
          <h5 className="py-3 pr-0 pl-6 text-xl border-b border-t-0 border-l-0 border-r-0 border-solid border-[#E8EAEB]">
            {t("admin_shop.settings.diary.title")}
          </h5>
          <div className={`flex ${isTablet ? `flex-wrap` : "flex-col"} p-6 mr-[-12px] w-[calc(100%_+_24px)]`}>
            <div className="relative flex-grow-0 p-3 max-w-[70%] basis-1/4 ">
              <a href="/admin/shop/settings" className="text-[#0088FF] no-underline">
                <div className="h-28 flex flex-row rounded-[3px] xl:h-24 p-4 bg-[#F2F9FF] border border-solid border-[#F2F9FF]">
                  <div className="w-8 h-8 mr-3">
                    <FontAwesomeIcon icon={faFolderOpen} className="text-xl text-[#08F]" />
                  </div>
                  <div className="flex flex-col">
                    <h6 className="text-sm text-[#182537] ">{t("admin_shop.settings.diary.item.managers_file")}</h6>
                    <p className="md:line-clamp-1 xs:line-clamp-1 xl:line-clamp-none text-sm text-[#747C87] leading-5">
                      {t("admin_shop.settings.diary.item.description_file")}
                    </p>
                  </div>
                </div>
              </a>
            </div>
            <div className="relative flex-grow-0 p-3 max-w-[70%] basis-1/4 ">
              <a href="/admin/shop/settings/logs" className="text-[#0088FF] no-underline">
                <div className="h-28 flex flex-row rounded-[3px] xl:h-24 p-4 bg-[#F2F9FF] border border-solid border-[#F2F9FF]">
                  <div className="w-8 h-8 mr-3">
                    <FontAwesomeIcon icon={faClockRotateLeft} className="text-xl text-[#08F]" />
                  </div>
                  <div className="flex flex-col">
                    <h6 className="text-sm text-[#182537] ">{t("admin_shop.settings.diary.item.activity_log")}</h6>
                    <p className="md:line-clamp-1 xs:line-clamp-1 xl:line-clamp-none text-sm text-[#747C87] leading-5">
                      {t("admin_shop.settings.diary.item.description_log")}
                    </p>
                  </div>
                </div>
              </a>
            </div>
            <div className="relative flex-grow-0 p-3 max-w-[70%] basis-1/4 ">
              <a href="/admin/shop/settings/bin" className="text-[#0088FF] no-underline">
                <div className="h-28 flex flex-row rounded-[3px] xl:h-24 p-4 bg-[#F2F9FF] border border-solid border-[#F2F9FF]">
                  <div className="w-8 h-8 mr-3">
                    <FontAwesomeIcon icon={faTrashCan} className="text-xl text-[#08F]" />
                  </div>
                  <div className="flex flex-col">
                    <h6 className="text-sm text-[#182537] mb-2">{t("admin_shop.settings.bin.title")}</h6>
                    <p className="md:line-clamp-1 xs:line-clamp-1 xl:line-clamp-none text-sm text-[#747C87] leading-5">
                      {t("admin_shop.settings.bin.description_bin")}
                    </p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingMain;
