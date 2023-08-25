import { ImageLoadingSkeleton } from "@app/app/assets/icons";

import * as S from "./ProductImageGallery.style";

const ProductImageGallerySkeleton = () => {
  const count = 6;
  return (
    <div className="w-full ps-4 pt-4 animate-pulse">
      <div className="relative text-center">
        <div className="inline-flex items-center justify-center w-full h-80 bg-gray-300 rounded dark:bg-gray-700">
          <ImageLoadingSkeleton />
        </div>
      </div>
      <div className="mt-4 hidden lg:block">
        <div className="flex items-center justify-start gap-x-2">
          {[...Array(count)].map((_, index: any) => (
            <S.ImageGallery key={index}>
              <div className="inline-flex items-center justify-center w-full h-full bg-gray-300 rounded dark:bg-gray-700">
                <ImageLoadingSkeleton />
              </div>
            </S.ImageGallery>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductImageGallerySkeleton;
