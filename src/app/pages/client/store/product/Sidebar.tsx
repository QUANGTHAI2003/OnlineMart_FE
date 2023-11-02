import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { dataCategories } from "@app/app/pages/client/store/data";
import { Button } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";

import * as S from "./Sidebar.styles";

const Sidebar = () => {
  const { t } = useTranslation();
  const [showAll, setShowAll] = useState(false);
  const toggleShowAll = () => {
    setShowAll(!showAll);
  };
  const renderToggleIcon = () => {
    return showAll ? <UpOutlined /> : <DownOutlined />;
  };
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const maxCategoriesToShow = windowWidth > 1024 ? 5 : 4;
  const renderedCategories = showAll ? dataCategories : dataCategories.slice(0, maxCategoriesToShow);
  return (
    <S.SidebarCategories>
      <h4 className="title block">{t("user.seller.all_products.sidebar_text")}</h4>
      <S.Categories>
        {windowWidth > 1024 ? (
          <>
            {renderedCategories.map((category) => (
              <div className="item-row" key={uuidv4()}>
                <a href="#/" className="item" key={category.cate_id}>
                  {category.name}
                </a>
              </div>
            ))}
            {dataCategories.length > maxCategoriesToShow && (
              <Button onClick={toggleShowAll} type="link">
                {showAll ? t("user.seller.all_products.Collapse") : t("user.seller.all_products.see_also")}
                {renderToggleIcon()}
              </Button>
            )}
          </>
        ) : (
          <>
            {renderedCategories.map((category) => (
              <a href="#/" target="_blank" className="item-inner" key={category.cate_id}>
                <div className="thumbnail-item">
                  <img src={category.thumbnail_url} alt="thumbnail" className="object-cover" />
                  <div></div>
                </div>
                <div className="name-item">{category.name}</div>
              </a>
            ))}
            <div className="flex justify-center w-full">
              {dataCategories.length > maxCategoriesToShow && (
                <Button onClick={toggleShowAll} type="link">
                  {showAll ? t("user.seller.all_products.Collapse") : t("user.seller.all_products.see_also")}
                  {renderToggleIcon()}
                </Button>
              )}
            </div>
          </>
        )}
      </S.Categories>
    </S.SidebarCategories>
  );
};

export default Sidebar;
