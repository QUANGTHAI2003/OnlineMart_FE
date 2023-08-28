import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Checkbox } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import CheckboxSortSkeleton from "../skeletons/CheckboxSortSkeleton";

interface ICheckboxSortItem {
  sortData: any;
}

const CheckboxSortItem: React.FC<ICheckboxSortItem> = ({ sortData }) => {
  const { t } = useTranslation();
  const [loadingSkeletonCount, setLoadingSkeletonCount] = useState(false);

  useEffect(() => {
    setLoadingSkeletonCount(true);
    setTimeout(() => {
      setLoadingSkeletonCount(false);
    }, 3000);
  }, []);

  const onChange = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
  };

  const [visible] = useState(false);
  const [showLess, setShowLess] = useState<boolean>(true);
  useEffect(() => {
    setShowLess(true);
  }, [visible]);

  const { title, values } = sortData;
  const numberOfCheckboxes = 4;
  const show_hide = showLess ? numberOfCheckboxes : values.length;

  return (
    <div className="checkbox_sort">
      {loadingSkeletonCount ? (
        <CheckboxSortSkeleton count={1} />
      ) : (
        <div>
          <h3 className="title">{title}</h3>
          {values.slice(0, show_hide).map((item: any) => {
            return (
              <div key={item.id} className="content">
                <Checkbox onChange={onChange} className="name">
                  {item.name}
                </Checkbox>
              </div>
            );
          })}

          <button
            onClick={() => setShowLess(!showLess)}
            aria-label={showLess ? "See more" : "Collapse"}
            className="button"
          >
            {showLess ? (
              <>
                {t("user.product_category_sidebar.see_more")}
                <FontAwesomeIcon className="ml-2 text-xs" icon={faChevronDown} />
              </>
            ) : (
              <>
                {t("user.product_category_sidebar.collapse")}
                <FontAwesomeIcon className="ml-2 text-xs" icon={faChevronUp} />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default CheckboxSortItem;
