import ProductImageGallery from "@app/app/components/clients/ImageGallery/ProductImageGallery";
import ModalSelect from "@app/app/components/clients/SelectAddress/ModalSelect";
import { useGetProductDetailQuery } from "@app/store/slices/api/user/productApi";
import { setPrice } from "@app/store/slices/redux/productDetailSlice";
import { useAppDispatch } from "@app/store/store";
import { formatCurrency } from "@app/utils/helper";
import { Rate } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";

import {
  AddToCartComponent,
  CustomerReview,
  DeliverySkeleton,
  PriceComponent,
  ProductDetailInfo,
  ProductNameSkeleton,
  ProductRelated,
  SellerComponent,
  VariantComponent,
} from "./components";
import { product_detail } from "./data";
import * as S from "./ProductDetail.styles";

const ProductDetail = () => {
  const [variantThumbnail, setVariantThumbnail] = useState<string>("");
  const dispatch = useAppDispatch();
  const location = useLocation();
  const nagigate = useNavigate();

  const { t } = useTranslation();
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(120, 120);
  }, [location.pathname]);

  const { data: productDetail, isFetching, error } = useGetProductDetailQuery(parseInt(id as string));

  const productGallery = productDetail?.gallery;
  const productQuantity = productDetail?.stock_qty || 0;

  const errorStatus = (error as any)?.status;

  useEffect(() => {
    if (errorStatus === 404) {
      nagigate("/404");
    }
  }, [errorStatus, location.pathname, nagigate]);

  useEffect(() => {
    if (productDetail) {
      const price = {
        current_price: productDetail?.current_price,
        isSale: productDetail?.is_sale,
        regular_price: productDetail?.regular_price,
        sale_price: productDetail?.sale_price,
        discount_rate: productDetail?.discount_rate,
      };
      dispatch(setPrice(price));
    }
  }, [productDetail, dispatch]);

  const handleScrollToTReview = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    const targetElement = document.getElementById("customer-reviews");
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleGetVariantImage = (isHaveImage: boolean, image: string) => {
    if (isHaveImage) {
      setVariantThumbnail(image);
    } else {
      setVariantThumbnail(productDetail?.thumbnail_url as string);
    }
  };

  return (
    <S.DetailPageStyle>
      <section className="flex flex-col gap-y-4 sm:max-w-[768px] md:max-w-full mx-auto">
        <S.ProductDetailStyle>
          <section className="main-thumbnail w-[450px]">
            <ProductImageGallery
              isLoading={isFetching}
              galleryData={productGallery}
              thumbnail={variantThumbnail || productDetail?.thumbnail_url}
            />
          </section>
          <div className="seperate"></div>
          <section className="product-content">
            <S.HeaderStyle>
              {isFetching ? (
                <ProductNameSkeleton />
              ) : (
                <>
                  <div className="brand">
                    <span className="brand-and-author flex items-baseline">
                      <h6>
                        {t("user.product_detail.brand")}
                        :&nbsp;
                        <a href="/thuong-hieu/anta.html">{productDetail?.supplier_name}</a>
                      </h6>
                    </span>
                  </div>
                  <div className="title">
                    <h1>{productDetail?.name}</h1>
                  </div>
                  <div className="below-title">
                    <div className="flex flex-wrap">
                      <div className="review flex items-center">
                        <Rate disabled allowHalf defaultValue={productDetail?.rating} className="text-sm" />
                        <div className="flex items-center">
                          <button className="number" onClick={handleScrollToTReview}>
                            {t("user.product_detail.view_review", { count: 3 })}
                          </button>
                          <div className="below-title-seperate"></div>
                        </div>
                      </div>
                      <div className="quantity-sold">
                        {t("user.product_detail.sold", { count: productDetail?.sold_count })}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </S.HeaderStyle>
            <div className="body">
              <S.ProductInfoStyle>
                <PriceComponent isHotDeal={product_detail?.deal_specs} />
                <VariantComponent
                  isFetching={isFetching}
                  variant={(productDetail?.variants || []) as any}
                  variantThumbnail={handleGetVariantImage}
                />
                <S.DeliveryStyle>
                  <ModalSelect />
                  {isFetching ? (
                    <DeliverySkeleton />
                  ) : (
                    <>
                      <div className="delivery-inner">
                        <div className="shipping-info">
                          <div className="shipping-info__inner">
                            <div className="shipping-info__item">
                              <div className="shipping-info__item__header">
                                <div className="w-5">
                                  <img
                                    src="https://salt.tikicdn.com/ts/upload/7f/30/d9/93a6fcd39c0045e628fdd5e48e7d26e5.png"
                                    alt=""
                                    height="20"
                                    width="20"
                                  />
                                </div>
                                <div className="divider"></div>
                                <div className="shipping-info__item__header__highlight">Giao Thứ Sáu, ngày 25/08</div>
                              </div>
                              <div className="shipping-info__item__fee">
                                <div className="shipping-info__item__fee_name">
                                  Vận chuyển: 12.000đ
                                  <span>
                                    &nbsp;
                                    <del>42.000đ</del>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <span className="inline-flex items-center">
                        <img
                          className="title-img"
                          src="https://salt.tikicdn.com/ts/upload/d8/20/db/7cde4ae754d50d17c6d7d4921e362a90.png"
                          alt="icon"
                          width="18"
                          height="18"
                        />
                        <span className="plus-content">
                          <span>{t("user.product_detail.discounted", { price: formatCurrency(30000) })}</span>
                        </span>
                      </span>
                    </>
                  )}
                </S.DeliveryStyle>
                <AddToCartComponent quantity={productQuantity} />
              </S.ProductInfoStyle>
              <SellerComponent sellerData={productDetail?.shop} isLoading={isFetching} />
            </div>
          </section>
        </S.ProductDetailStyle>
        <ProductRelated />
        <ProductDetailInfo
          info={productDetail?.info_detail}
          description={productDetail?.description}
          isFetching={isFetching}
        />
        <CustomerReview />
      </section>
    </S.DetailPageStyle>
  );
};

export default ProductDetail;
