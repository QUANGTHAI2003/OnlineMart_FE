import { Radio } from "antd";
import { useEffect, useState } from "react";

import { product_detail } from "../data";
import * as S from "../ProductDetail.styles";

import { VariantSkeleton } from ".";

interface IVariantOption {
  code: string;
  name: string;
  show_preview_image: boolean;
  values: IValue[];
}

interface IValue {
  label: string;
  image?: string;
}

const ConfigureOptionData: IVariantOption[] = product_detail.configurable_options;

const VariantComponent = ({ variantThumbnail }: any) => {
  const [selectedVariants, setSelectedVariants] = useState<{ [code: string]: string }>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const defaultSelectedVariants = ConfigureOptionData.reduce((acc, { code, values }) => {
      const defaultValue = values.length > 0 ? values[0].label : "";
      return { ...acc, [code]: defaultValue };
    }, {});

    setSelectedVariants(defaultSelectedVariants);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  });

  const handleShowCurrentVariant = (optionCode: string, value: string) => {
    setSelectedVariants((prevSelectedVariants) => ({
      ...prevSelectedVariants,
      [optionCode]: value,
    }));
  };

  const handleGetImageVariant = (isHaveImage: any, image: any) => {
    variantThumbnail(isHaveImage, image);
  };

  return (
    <S.VariantStyle>
      {isLoading ? (
        <VariantSkeleton />
      ) : (
        <>
          {ConfigureOptionData.map(({ code, name, values, show_preview_image }: IVariantOption) => {
            const selectedVariant = selectedVariants[code] || "";
            const defaultLabel = values.length > 0 ? values[0].label : "";
            return (
              <div key={code}>
                <p className="option-text">
                  {name}
                  :&nbsp;
                  <span>{selectedVariant}</span>
                </p>
                <Radio.Group
                  defaultValue={defaultLabel}
                  className="flex items-center flex-wrap gap-3"
                  onChange={(e) => handleShowCurrentVariant(code, e.target.value)}
                >
                  {values.map(({ label, image }: IValue) => {
                    const checked = selectedVariant === label;
                    return (
                      <Radio.Button
                        key={label}
                        value={label}
                        checked={checked}
                        onClick={() => handleGetImageVariant(show_preview_image, image)}
                      >
                        {show_preview_image && (
                          <div className="option-figure">
                            <img src={image} alt="" />
                          </div>
                        )}
                        <span className="option-label line-clamp-3">{label}</span>
                        <img
                          className="selected-indicator"
                          src="https://frontend.tikicdn.com/_desktop-next/static/img/pdp_revamp_v2/selected-variant-indicator.svg"
                          alt="Selected"
                        />
                      </Radio.Button>
                    );
                  })}
                </Radio.Group>
              </div>
            );
          })}
        </>
      )}
    </S.VariantStyle>
  );
};

export default VariantComponent;
