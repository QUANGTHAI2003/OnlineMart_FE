import { useResponsive } from "@app/hooks";
import { faChevronRight, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";

const ShippingAddress = () => {
  const { isTablet, isDesktop } = useResponsive();
  const { t } = useTranslation();

  return (
    <div className="xl:mt-0">
      <div className="bg-white rounded mb-3 text-sm leading-5 p-4">
        <div className="hidden xl:flex items-center justify-between mb-3">
          <h3 className="text-[#808089] font-normal m-0">{t("user.shopping_cart_page.deliver")}</h3>
          <a href="/#" className="text-[#0b74e5]">
            {t("user.shopping_cart_page.change_address")}
          </a>
        </div>
        <div className="flex items-center font-semibold mb-[2px] text-black">
          {(!isTablet || !isDesktop) && (
            <FontAwesomeIcon icon={faLocationDot} className="text-[#0B74E5] text-base inline-block mr-2" />
          )}
          <p className="break-normal line-clamp-1">Phạm Trường Xuân</p>
          <i className="block w-[1px] h-5 bg-gray-200 mx-2"></i>
          <p className="break-normal shrink-0">961548256</p>
        </div>
        <div className="text-[#808089] font-normal">
          <div className="flex items-center justify-between">
            <div className="block">
              <span className="bg-[#effff4] text-[#00ab56] inline-flex font-medium text-xs leading-4 px-2 rounded-4xl h-4 items-center">
                {t("user.shopping_cart_page.home_address")}
              </span>
              Toà án nhân dân thị xã long mỹ khu vực bình thạnh b, Phường Bình Thạnh, Thị xã Long Mỹ, Hậu Giang
              <p className="mt-2 text-sm text"></p>
            </div>
            {(!isTablet || !isDesktop) && (
              <FontAwesomeIcon icon={faChevronRight} className="text-[#595959] text-sm inline-block" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingAddress;
