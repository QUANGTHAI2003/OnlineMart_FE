import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import * as S from "./ProductImageGallery.style";
import ProductImageGallerySkeleton from "./ProductImageGallerySkeleton";

const ProductImageGallery = ({ galleryData, thumbnail }: any) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [currentThumbnail, setCurrentThumbnail] = useState<string>(thumbnail);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const { t } = useTranslation();

  const mainThumbnail = useRef<any>(null);
  const galleryImage = useRef<any>(null);

  useEffect(() => {
    setCurrentThumbnail(thumbnail);
  }, [thumbnail]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  });

  const limitGalleryImage = 6;
  const showGallery = galleryData.length > limitGalleryImage ? galleryData.slice(0, limitGalleryImage) : galleryData;

  const handleChangeImage = (itemId: number) => {
    const activeIndex = galleryData.findIndex((item: any) => item.id === itemId);
    setActiveIndex(activeIndex);
    setCurrentThumbnail(galleryData[activeIndex].image);
  };

  return (
    <div className="w-full">
      {isLoading ? (
        <ProductImageGallerySkeleton />
      ) : (
        <>
          <div className="relative text-center ps-4 pt-4">
            <div className="cursor-pointer" role="button" tabIndex={0}>
              <img
                src={currentThumbnail}
                alt={thumbnail}
                className="object-cover w-full aspect-square rounded-md"
                ref={mainThumbnail}
              />
            </div>
          </div>
          <div className="mt-4 hidden lg:block">
            <div className="flex items-center justify-start gap-x-2">
              {showGallery.map((item: any, index: any) => (
                <S.ImageGallery key={item.id} ref={galleryImage} className={activeIndex === index ? "active" : ""}>
                  <div
                    onClick={() => handleChangeImage(item.id)}
                    onKeyDown={() => handleChangeImage(item.id)}
                    className="object-cover w-full h-full"
                    role="button"
                    tabIndex={0}
                  >
                    <img src={`${item.image}?${item.id}`} alt={item.image} />
                    {index === 5 && galleryData.length > limitGalleryImage && (
                      <div className="mr-0 overlay" role="button" tabIndex={0}>
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
        </>
      )}
    </div>
  );
};

export default ProductImageGallery;
