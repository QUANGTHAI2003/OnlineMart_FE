import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface ICheckboxSortItem {
  sortData: any;
}

const CheckboxSortItem: React.FC<ICheckboxSortItem> = ({ sortData }) => {
  const { t } = useTranslation();

  const [visible] = useState(false);
  const [showLess, setShowLess] = useState<boolean>(true);
  useEffect(() => {
    setShowLess(true);
  }, [visible]);

  const { title, values } = sortData;
  const numberOfCheckboxes = 5;
  const show_hide = showLess ? numberOfCheckboxes : values.length;

  return (
    <div className="checkbox_sort">
      <h3 className="title">{title}</h3>
      <div className="flex flex-wrap gap-2 w-full button_div">
        {values.slice(0, show_hide).map((item: any) => {
          return (
            <Button key={item.id} className="button">
              {item.name}
            </Button>
          );
        })}

        <Button
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
        </Button>
      </div>
    </div>
  );
};
export default CheckboxSortItem;
