import { useResponsive } from "@app/hooks";
import { useGetAddressRootQuery, useSelectShippingAddressMutation } from "@app/store/slices/api/user/addressApi";
import { setShippingAddress } from "@app/store/slices/redux/user/shippingAddressSlice";
import { useAppDispatch, useAppSelector } from "@app/store/store";
import { handleApiError, notifySuccess } from "@app/utils/helper";
import { faChevronRight, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal, Radio, RadioChangeEvent, Tag } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const ShippingAddress = () => {
  const { isTablet, isDesktop } = useResponsive();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [selectShippingAddress] = useSelectShippingAddressMutation();

  const userId = useAppSelector((state) => state.userState.user)?.id;
  const { data: shippingAddress } = useGetAddressRootQuery(userId);

  const defaultAddress = shippingAddress?.find((address) => address.is_default === "1");
  const selectAddress = shippingAddress?.find((address) => address.is_select === "1");
  useEffect(() => {
    if (selectAddress) {
      dispatch(setShippingAddress(selectAddress));
    }
  }, [selectAddress, dispatch]);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
    handleSelectShippingAddress(e.target.value);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSelectShippingAddress = async (id: number) => {
    try {
      await selectShippingAddress(id).unwrap();
      notifySuccess(
        t("admin_shop.product.evouncher.successfully"),
        t("user.shopping_cart_page.success_select_shipping_address")
      );
    } catch (err) {
      handleApiError(err);
    }
  };

  return (
    <div className="xl:mt-0">
      <Modal
        title={t("user.shopping_cart_page.select_shipping_address")}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Radio.Group className="w-full h-auto flex flex-col" onChange={onChange} value={value}>
          {shippingAddress?.map((address, index) => (
            <Radio key={index} value={address?.id} checked={address.is_default === "1"}>
              <div className="mb-3">
                <div className="flex items-center font-semibold mb-[2px] text-black">
                  <p className="break-normal line-clamp-1">{address?.name}</p>
                  <i className="block w-[1px] h-5 bg-gray-200 mx-2"></i>
                  <p className="break-normal shrink-0">{address?.phone}</p>
                  {address.is_default === "1" && (
                    <Tag className="ml-1" color="success">
                      {t("user.shopping_cart_page.default_shipping_address")}
                    </Tag>
                  )}
                </div>
                <div className="text-[#4a4a80] font-normal">
                  <div className="flex items-center justify-between">
                    <div className="block">
                      {`${address?.address_home}, ${address?.ward}, ${address?.district}, ${address?.city}`}
                    </div>
                  </div>
                </div>
              </div>
            </Radio>
          ))}
        </Radio.Group>
      </Modal>
      <div className="bg-white rounded mb-3 text-sm leading-5 p-4">
        <div className="hidden xl:flex items-center justify-between mb-3">
          <h3 className="text-[#808089] font-normal m-0">{t("user.shopping_cart_page.deliver")}</h3>
          <p aria-hidden="true" onClick={showModal} className="text-[#0b74e5] cursor-pointer">
            {t("user.shopping_cart_page.change_address")}
          </p>
        </div>
        <div className="flex items-center font-semibold mb-[2px] text-black">
          {(!isTablet || !isDesktop) && (
            <FontAwesomeIcon icon={faLocationDot} className="text-[#0B74E5] text-base inline-block mr-2" />
          )}
          <p className="break-normal line-clamp-1">{selectAddress ? selectAddress?.name : defaultAddress?.name}</p>
          <i className="block w-[1px] h-5 bg-gray-200 mx-2"></i>
          <p className="break-normal shrink-0">{selectAddress ? selectAddress?.phone : defaultAddress?.phone}</p>
          {selectAddress
            ? selectAddress?.is_default === "1" && (
                // eslint-disable-next-line react/jsx-indent
                <Tag className="ml-1" color="success">
                  {t("user.shopping_cart_page.default_shipping_address")}
                </Tag>
              )
            : defaultAddress && (
                // eslint-disable-next-line react/jsx-indent
                <Tag className="ml-1" color="success">
                  {t("user.shopping_cart_page.default_shipping_address")}
                </Tag>
              )}
        </div>
        <div className="text-[#808089] font-normal">
          <div className="flex items-center justify-between">
            <div className="block">
              <span className="bg-[#effff4] text-[#00ab56] inline-flex font-medium text-xs leading-4 px-2 rounded-4xl h-4 items-center">
                {/* {t("user.shopping_cart_page.home_address")} */}
              </span>
              {selectAddress
                ? `${selectAddress?.address_home}, ${selectAddress?.ward}, ${selectAddress?.district}, ${selectAddress?.city}`
                : `${defaultAddress?.address_home}, ${defaultAddress?.ward}, ${defaultAddress?.district}, ${defaultAddress?.city}`}
            </div>
            {(!isTablet || !isDesktop) && (
              <FontAwesomeIcon
                onClick={showModal}
                icon={faChevronRight}
                className="text-[#595959] text-sm inline-block"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingAddress;
