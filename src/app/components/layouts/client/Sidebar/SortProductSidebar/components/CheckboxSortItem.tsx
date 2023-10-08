import { useSyncToURL } from "@app/hooks";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Checkbox } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

interface ICheckboxSortItem {
  sortData: any;
}

const CheckboxSortItem: React.FC<ICheckboxSortItem> = ({ sortData }) => {
  const location = useLocation();
  const syncToURL = useSyncToURL();
  const { t } = useTranslation();

  const [showLess, setShowLess] = useState<boolean>(true);
  const [checkboxState, setCheckboxState] = useState<{ [key: string]: boolean }>({});

  const { title, values } = sortData;
  const numberOfCheckboxes = 4;

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const slug = sortData.slug;

    // Initialize the state of checkboxes based on the IDs in the URL
    const initialCheckboxState: { [key: string]: boolean } = {};

    sortData.values.forEach((item: any) => {
      initialCheckboxState[item.id] = searchParams.get(slug)?.includes(item.id.toString()) || false;
    });

    setCheckboxState(initialCheckboxState);
  }, [location.search, sortData.slug, sortData.values]);

  const onChange = (value: string, checked: boolean) => {
    // Update the state of the checkbox
    const updatedCheckboxState = { ...checkboxState, [value]: checked };
    setCheckboxState(updatedCheckboxState);

    const searchParams = new URLSearchParams(location.search);
    const slug = sortData.slug;

    // Get the existing values from the URL for this title
    const existingValues = searchParams.get(slug);

    const existingValuesArray = existingValues ? existingValues.trim().split(",") : [];

    if (checked) {
      // Add the value to the array if it's not already there
      if (!existingValuesArray.includes(value.toString())) {
        existingValuesArray.push(value.toString());
      }
    } else {
      const index = existingValuesArray.indexOf(value.toString());
      if (index !== -1) {
        existingValuesArray.splice(index, 1);
      }
    }

    // Update the URL with the new values
    if (existingValuesArray.length > 0) {
      searchParams.set(slug, existingValuesArray.join(","));
    } else {
      // If no values are selected, remove the parameter from the URL and reset the state
      searchParams.delete(slug);
      delete updatedCheckboxState[value];
    }

    // Update the URL with the new query parameters
    syncToURL(Object.fromEntries(searchParams.entries()));

    // Update the state of the checkboxes
    setCheckboxState(updatedCheckboxState);
  };
  const show_hide = showLess ? numberOfCheckboxes : values.length;

  return (
    <div className="checkbox_sort">
      <h3 className="title">{title}</h3>
      {values.slice(0, show_hide).map((item: any) => {
        return (
          <div key={item.id} className="content">
            <Checkbox
              onChange={(e: CheckboxChangeEvent) => onChange(item.id, e.target.checked)}
              value={item.id}
              className="name"
              checked={checkboxState[item.id]}
            >
              {item.name}
            </Checkbox>
          </div>
        );
      })}

      <button onClick={() => setShowLess(!showLess)} aria-label={showLess ? "See more" : "Collapse"} className="button">
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
  );
};

export default CheckboxSortItem;
