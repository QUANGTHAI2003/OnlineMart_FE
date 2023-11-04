import { baseImageUrl } from "@app/utils/helper";
import { Image } from "antd";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import * as S from "./ProductImageGallery.style";
import ProductImageGallerySkeleton from "./ProductImageGallerySkeleton";

const ProductImageGallery = ({ galleryData, thumbnail, isLoading }: any) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [currentThumbnail, setCurrentThumbnail] = useState<string>(thumbnail);

  const { t } = useTranslation();

  const mainThumbnail = useRef<any>(null);
  const galleryImage = useRef<any>(null);

  useEffect(() => {
    setCurrentThumbnail(thumbnail);
  }, [thumbnail]);

  const limitGalleryImage = 6;
  const showGallery = galleryData?.length > limitGalleryImage ? galleryData?.slice(0, limitGalleryImage) : galleryData;

  const handleChangeImage = (itemId: number) => {
    const activeIndex = galleryData.findIndex((item: any) => item.id === itemId);
    setActiveIndex(activeIndex);
    setCurrentThumbnail(galleryData[activeIndex].image);
  };

  const [visible, setVisible] = useState(false);

  return (
    <div className="w-full">
      {isLoading ? (
        <ProductImageGallerySkeleton />
      ) : (
        <Image.PreviewGroup
          preview={{
            visible,
            onVisibleChange: (value) => {
              setVisible(value);
            },
          }}
        >
          <div className="relative text-center ps-4 pt-4">
            <div
              className="cursor-pointer"
              onClick={() => setVisible(true)}
              onKeyDown={() => setVisible(true)}
              role="button"
              tabIndex={0}
            >
              <img
                src={`${baseImageUrl}/${currentThumbnail}`}
                alt={thumbnail}
                className="object-cover w-full aspect-square rounded-md min-h-[400px]"
                ref={mainThumbnail}
              />
            </div>
          </div>
          <div className="mt-4 hidden lg:block">
            <div className="grid grid-cols-6  gap-x-2">
              {showGallery?.map((item: any, index: any) => (
                <S.ImageGallery key={item.id} ref={galleryImage} className={activeIndex === index ? "active" : ""}>
                  <div
                    onClick={() => handleChangeImage(item.id)}
                    onKeyDown={() => handleChangeImage(item.id)}
                    className="object-cover w-full h-full"
                    role="button"
                    tabIndex={0}
                  >
                    <Image
                      src={item.image}
                      preview={{
                        visible: false,
                        onVisibleChange: () => setVisible(false),
                      }}
                    />
                    {index === 5 && galleryData.length > limitGalleryImage && (
                      <div
                        className="mr-0 overlay"
                        onClick={() => setVisible(true)}
                        onKeyDown={() => setVisible(true)}
                        role="button"
                        tabIndex={0}
                      >
                        <span>
                          {t("user.product_detail.view_image", { image: galleryData.length - limitGalleryImage })}
                        </span>
                      </div>
                    )}
                  </div>
                </S.ImageGallery>
              ))}
            </div>
          </div>
        </Image.PreviewGroup>
      )}
    </div>
  );
};

export default ProductImageGallery;
