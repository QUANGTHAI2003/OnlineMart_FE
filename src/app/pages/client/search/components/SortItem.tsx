import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { MenuProps } from "antd";
import { Button, Dropdown, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import SortSkeleton from "../skeletons/SortSkeleton";
import * as S from "../UserSearch.styles";

interface ISortItem {
  sortData: any;
}

const items: MenuProps["items"] = [
  {
    key: "1",
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        1st menu item
      </a>
    ),
  },
  {
    key: "2",
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        2nd menu item (disabled)
      </a>
    ),
    disabled: true,
  },
  {
    key: "3",
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
        3rd menu item (disabled)
      </a>
    ),
    disabled: true,
  },
];

const SortItem: React.FC<ISortItem> = ({ sortData }) => {
  const { t } = useTranslation();

  const [loadingSkeletonCount, setLoadingSkeletonCount] = useState<boolean>(false);

  useEffect(() => {
    setLoadingSkeletonCount(true);
    setTimeout(() => {
      setLoadingSkeletonCount(false);
    }, 3000);
  }, []);

  const [visible] = useState(false);
  const [showLess, setShowLess] = useState<boolean>(true);
  useEffect(() => {
    setShowLess(true);
  }, [visible]);

  const { title, values } = sortData;
  const numberOfCheckboxes = 4;
  const slide_show = showLess ? numberOfCheckboxes : values.length;

  const [, setOpen] = useState<boolean>(false);
  const onClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {loadingSkeletonCount ? (
        <SortSkeleton count={1} />
      ) : (
        <S.SortItem className="sortItem">
          <div className="right_brand">
            <p className="title">{title}</p>
            <div className="value">
              {values.slice(0, slide_show).map((item: any) => {
                return (
                  <div key={item.id} className="item_value">
                    <Space wrap>
                      <Button className="name">{item.name}</Button>
                    </Space>
                  </div>
                );
              })}

              <Dropdown
                className="dropdown"
                menu={{ items }}
                trigger={["click"]}
                dropdownRender={() => (
                  <div className="dropdown_div w-1/2 shadow-[50px_25px_80px_20px_rgba(0,0,0,0.3)] bg-white rounded-md">
                    <div className="p-5 flex flex-wrap max-h-[300px] overflow-y-auto">
                      {values.map((item: any) => {
                        return (
                          <div key={item.id} className="bg-white mr-2 mb-2">
                            <Space wrap>
                              <Button className="name rounded-2xl">{item.name}</Button>
                            </Space>
                          </div>
                        );
                      })}
                    </div>

                    <S.FeatureBtn className="feature_btn w-full justify-center py-3 sticky bottom-0 bg-white rounded-b-md">
                      <div className="w-full flex px-3">
                        <div className="w-full">
                          <Button onClick={onClose} className="w-full h-9">
                            {t("user.product_category_page.reset")}
                          </Button>
                        </div>
                        <div className="ml-2.5 w-full">
                          <Button type="primary" onClick={onClose} className="w-full h-9">
                            {t("user.product_category_page.apply")}
                          </Button>
                        </div>
                      </div>
                    </S.FeatureBtn>
                  </div>
                )}
              >
                <button onClick={(e) => e.preventDefault()} className="arrow_down">
                  <Space>
                    <FontAwesomeIcon icon={faChevronDown} />
                  </Space>
                </button>
              </Dropdown>
            </div>
          </div>
        </S.SortItem>
      )}
    </div>
  );
};

export default SortItem;
