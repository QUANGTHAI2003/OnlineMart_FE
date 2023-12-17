import { SearchOutlined } from "@ant-design/icons";
import { RatingStar } from "@app/app/assets/icons";
import FollowIcon from "@app/app/assets/images/store/follow.png";
import { useSyncUrlWithTab } from "@app/hooks";
import { useGetShopQuery } from "@app/store/slices/api/shopApi";
import { setInformation } from "@app/store/slices/shopSlice";
import { useAppDispatch } from "@app/store/store";
import { formatShortenNumber } from "@app/utils/helper";
import { getAccessToken } from "@app/utils/localstorage";
import { notificationController } from "@app/utils/notification";
import { faCheck, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Input } from "antd";
import { TFunction } from "i18next";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { dataSeller } from "./data";
import Products from "./product/Product";
import Profile from "./profile/Profile";
import * as S from "./StoreHeader.styles";
import Store from "./widget/Store";

const StoreIndex = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const baseImage = import.meta.env.VITE_BASE_IMAGE_URL as string;

  const { data: shopData } = useGetShopQuery(id);

  useEffect(() => {
    if (shopData) {
      dispatch(setInformation(shopData));
    }
  }, [shopData, dispatch]);

  const items = (shopData: any, t: TFunction<"translation", undefined>) => [
    {
      label: t("user.seller.store"),
      key: "store",
      children: <Store shopData={shopData} />,
    },
    {
      label: t("user.seller.all_product"),
      key: "product",
      children: <Products />,
    },
    {
      label: t("user.seller.store_profile"),
      key: "storeInfo",
      children: <Profile shopData={shopData} />,
    },
  ];

  const initialTab = items(shopData, t)[0].key;
  const { tabFiltered, handleChangeTab } = useSyncUrlWithTab(initialTab, "t");

  const [isSave, setIsSave] = useState(false);
  const token = getAccessToken();

  const handleSave = () => {
    if (token) {
      if (!isSave) {
        setIsSave(true);
        notificationController.success({
          message: t("user.seller.follower_success"),
        });
      } else {
        setIsSave(false);
      }
    } else {
      notificationController.info({
        message: "Đăng nhập để theo dõi",
      });
    }
  };

  return (
    <S.StoreContainer className="relative">
      <S.StoreHeader $background={dataSeller.background_url} className="relative">
        <div className="overlay-header absolute"></div>
        <div className="header-wrapper flex items-center">
          <div className="flex items-center">
            <div className="seller-logo">
              <img src={`${baseImage}/${shopData?.avatar}`} alt={shopData?.name} className="object-cover" />
            </div>
            <S.StoreInfo className="store-info flex flex-col justify-center">
              <h1 className="store-name mb-1">{shopData?.name}</h1>
              <div className="store-badge mb-1 flex flex-row items-center">
                <img src={dataSeller.certification} alt="certification" />
              </div>
              <div className="store-info flex flex-row items-center">
                <div className="flex items-center flex-row mr-1">
                  <div className="mr-1 mt-1">
                    <RatingStar />
                  </div>
                  <S.TextInfo>{`${shopData?.rating || 0} / 5`}</S.TextInfo>
                </div>
                <div className="line"></div>
                <div className="flex items-center flex-row mr-1">
                  <div className="mr-1 mt-1">
                    <img src={FollowIcon} alt="start" className="w-4 h-4 object-cover" />
                  </div>
                  <S.TextInfo>
                    <span className="text-res">{`${t("user.seller.followers")}:`}</span>
                    {formatShortenNumber(dataSeller.total_follower)}
                  </S.TextInfo>
                </div>
              </div>
            </S.StoreInfo>
          </div>
          <S.StoreAction className="flex items-center">
            <Button type={isSave ? "dashed" : "primary"} onClick={handleSave} className="flex items-center">
              <div className="mr-1 w-4">
                <FontAwesomeIcon icon={isSave ? faCheck : faPlus} />
              </div>
              {isSave ? t("user.seller.following_btn") : t("user.seller.follower_btn")}
            </Button>
          </S.StoreAction>
        </div>
      </S.StoreHeader>
      <div className="flex items-center justify-between">
        <S.StoreTabs
          activeKey={tabFiltered}
          onChange={handleChangeTab}
          tabBarGutter={60}
          items={items(shopData, t)}
          defaultActiveKey={initialTab}
          animated={false}
          tabBarExtraContent={
            <div className="mr-14 xl:block hidden">
              <Input placeholder={t("user.seller.input_search")} prefix={<SearchOutlined />} />
            </div>
          }
        />
      </div>
    </S.StoreContainer>
  );
};

export default StoreIndex;
