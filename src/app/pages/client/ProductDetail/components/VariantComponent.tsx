import { useSyncToURL } from "@app/hooks";
import { Radio } from "antd";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import * as S from "../ProductDetail.styles";

import { VariantSkeleton } from ".";

interface IVariantOption {
  id: number;
  name: string;
  values: IValue[];
}

interface IValue {
  id: any;
  label: string;
  image?: string;
  is_image: boolean;
}

interface IVariantComponentProps {
  variant: IVariantOption[];
  variantThumbnail: (isHaveImage: any, image: any) => void;
  isFetching: boolean;
}

const VariantComponent: React.FC<IVariantComponentProps> = ({ variant, variantThumbnail, isFetching }) => {
  const location = useLocation();
  const syncToURL = useSyncToURL();

  const [selectedVariants, setSelectedVariants] = useState<{ [id: number]: string }>({});

  useEffect(() => {
    const firstSpid = variant[0]?.values[0]?.id?.toString();
    if (firstSpid) {
      syncToURL({ spid: firstSpid });
    }
  }, [syncToURL, variant]);

  useEffect(() => {
    const spids = new URLSearchParams(location.search).get("spid");

    if (spids) {
      const defaultSelectedVariants = variant?.reduce((acc, { id, values }) => {
        const defaultValue = values.find((value) => value.id === parseInt(spids))?.label;
        return { ...acc, [id]: defaultValue };
      }, {});

      setSelectedVariants(defaultSelectedVariants);
    }

    const defaultSelectedVariants = variant?.reduce((acc, { id, values }) => {
      const defaultValue = values.length > 0 ? values[0]?.label : "";
      return { ...acc, [id]: defaultValue };
    }, {});

    setSelectedVariants(defaultSelectedVariants);
  }, [location.search, variant]);

  const handleShowCurrentVariant = (optionCode: number, value: string) => {
    setSelectedVariants((prevSelectedVariants) => ({
      ...prevSelectedVariants,
      [optionCode]: value,
    }));
  };

  const handleSyncVariantValue = (id: string, isHaveImage: boolean, image?: string): void => {
    variantThumbnail(isHaveImage, image);
    syncToURL({ spid: id });
  };

  return (
    <S.VariantStyle>
      {isFetching ? (
        <VariantSkeleton />
      ) : (
        <>
          {variant.map(({ id: variantId, name, values }: IVariantOption) => {
            const selectedVariant = selectedVariants && selectedVariants[variantId] ? selectedVariants[variantId] : 0;
            const spids = new URLSearchParams(location.search).get("spid");
            const defaultLabel =
              (spids?.length && values.find((value) => spids?.includes(value.id))?.label) || values[0].label;

            return (
              <div key={variantId}>
                <p className="option-text">
                  {name}
                  :&nbsp;
                  <span>{selectedVariant}</span>
                </p>
                <Radio.Group
                  name={name}
                  defaultValue={defaultLabel}
                  className="flex items-center flex-wrap gap-3"
                  onChange={(e) => handleShowCurrentVariant(variantId, e.target?.value)}
                >
                  {values.map(({ id, label, image, is_image }: IValue) => {
                    return (
                      <Radio.Button key={id} value={label} onClick={() => handleSyncVariantValue(id, is_image, image)}>
                        {is_image && (
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
