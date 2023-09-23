import { RatingStar } from "@app/app/assets/icons";
import OfficialIcon from "@app/app/assets/images/official.png";
import { dataWidget } from "@app/app/pages/client/store/data";
import * as S from "@app/app/pages/client/store/widget/component/WidgetList.styles";
import { formatCurrency } from "@app/utils/helper";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const WidgetList = () => {
  const { t } = useTranslation();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showSecondWidget, setShowSecondWidget] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (windowWidth < 1025) {
      setShowSecondWidget(false);
    } else {
      setShowSecondWidget(true);
    }
  }, [windowWidth]);
  return (
    <div>
      {dataWidget?.map((widget: any, index: number) => (
        <React.Fragment key={uuidv4()}>
          {index !== 1 || showSecondWidget || windowWidth > 1024 ? (
            <S.Widget className={`bg-white mt-4 ${widget.code === "categories" ? "" : "pb-0 "}`} key={uuidv4()}>
              <div className="title">
                <div>{widget.title}</div>
                {windowWidth > 1024 ? (
                  <Link className="text-sm" title="Xem tất cả Deal Hot" to={`?t=${widget.tab}`}>
                    {t("user.seller.see_all")}
                  </Link>
                ) : null}
              </div>
              <S.WidgetContainer className={widget.code === "categories" ? "" : "flex-nowrap ml-[-16px]"}>
                {widget.code === "categories" ? (
                  <>
                    <div className="widget">
                      {widget.items.slice(0, widget.data_collapsed).map((item: any) => (
                        <a href="/#" target="_blink" className="widget-item block" key={uuidv4()}>
                          <S.WidgetItem>
                            <div className="thumbnail-item">
                              <img src={item.thumbnail_url} alt="thumbnail" className="w-full h-full object-cover" />
                              <div></div>
                            </div>
                            <div className="name-item">{item.name}</div>
                          </S.WidgetItem>
                        </a>
                      ))}
                    </div>
                    {windowWidth < 1024 ? (
                      <div className="flex justify-center w-full mt-3">
                        <Link title="Xem tất cả Deal Hot" to="?t=product">
                          Xem tất cả
                          <FontAwesomeIcon className="ml-2" icon={faAngleRight} />
                        </Link>
                      </div>
                    ) : null}
                  </>
                ) : (
                  <>
                    {widget.items.slice(0, widget.data_collapsed).map((item: any) => (
                      <a href="#a" className="widget-item" key={uuidv4()}>
                        <div className="selling">
                          <div className="thumbnail-item">
                            <div className="text-center relative w-full flex ">
                              <img src={item.thumbnail_url} alt="" width="124" height="124" className="object-cover" />
                              <div className="absolute z-10">
                                <img src={OfficialIcon} alt="bagde icon" width="72" height="20" />
                              </div>
                            </div>
                          </div>
                          <div className="pt-2 flex flex-col justify-between">
                            <div>
                              <div className="name-item">
                                <h3 className="mb-1">{item.name}</h3>
                              </div>
                              <div className="rating mb-1">
                                <div className="text-rating">4.6</div>
                                <RatingStar />
                                <div className="line"></div>
                                <span className="percent">Đã bán 9k</span>
                              </div>
                              <div className="flex items-center">
                                <div className="discount has-discount">{formatCurrency(250000)}</div>
                                <div className="percent-discount">15%</div>
                              </div>
                            </div>
                            <div>
                              <div className="line-badge"></div>
                              <div className="ship-text">Giao chủ nhật, ngày 03/09</div>
                            </div>
                          </div>
                        </div>
                      </a>
                    ))}
                  </>
                )}
              </S.WidgetContainer>
            </S.Widget>
          ) : null}
        </React.Fragment>
      ))}
    </div>
  );
};

export default WidgetList;
