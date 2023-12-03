import { CaretDownOutlined, CaretUpOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { useSyncToURL } from "@app/hooks";
import { formatNumber, formatPercentage } from "@app/utils/helper";
import { Radio, RadioChangeEvent, Tooltip, Typography } from "antd";
import { TFunction } from "i18next";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FreeMode, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { v4 as uuidv4 } from "uuid";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { green_percent, jade_green_box, orange_box, primary_box, purple_box, red_percent } from "../data";
import * as S from "../TrafficWebsite.styles";

const getTitleAndToolTip = (title: string, t: TFunction<"translation", undefined>) => {
  switch (title) {
    case "totalView":
      return [
        t("admin_shop.dev_center.traffic_website.common.total_views"),
        t("admin_shop.dev_center.traffic_website.common.tooltip.total_views"),
      ];
    case "conversionRate":
      return [
        t("admin_shop.dev_center.traffic_website.common.conversion_rate"),
        t("admin_shop.dev_center.traffic_website.common.tooltip.conversion_rate"),
      ];
    case "buyer":
      return [
        t("admin_shop.dev_center.traffic_website.common.total_buyers"),
        t("admin_shop.dev_center.traffic_website.common.tooltip.total_buyers"),
      ];
    case "userId":
      return [
        t("admin_shop.dev_center.traffic_website.common.total_viewers"),
        t("admin_shop.dev_center.traffic_website.common.tooltip.total_viewers"),
      ];
    default:
      return title;
  }
};

const getFillColor = (fill: string) => {
  switch (fill) {
    case "primary_box":
      return primary_box;
    case "orange_box":
      return orange_box;
    case "jade_green_box":
      return jade_green_box;
    case "purple_box":
      return purple_box;

    default:
      return fill;
  }
};

const { Title } = Typography;

const SlickList: React.FC<any> = ({ trafficData }) => {
  const { t } = useTranslation();
  const syncToURL = useSyncToURL();
  const [value, setValue] = useState<number>(1);

  useEffect(() => {
    if (trafficData && trafficData[0]) {
      setValue(trafficData[0].id || 0);
    }
  }, [trafficData]);

  const handleClick = (id: number) => {
    setValue(id);
    syncToURL({ slick_id: id.toString() });
  };

  useEffect(() => {
    syncToURL({ slick_id: value?.toString() });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const carouselItem = document.querySelector(".carousel_item");
    if (carouselItem && carouselItem instanceof HTMLElement && value !== null) {
      const selectedItem = trafficData?.find((item: any) => item.id === value);
      if (selectedItem) {
        carouselItem.style.setProperty("--fill-color", getFillColor(selectedItem.fill_color));
      }
    }
  }, [t, trafficData, value]);

  useEffect(() => {
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === "childList") {
          const carouselItems = document.querySelectorAll(".carousel_item");
          carouselItems.forEach((carouselItem) => {
            if (carouselItem && carouselItem instanceof HTMLElement && value !== null) {
              const selectedItem = trafficData?.find((item: any) => item.id === value);
              if (selectedItem) {
                carouselItem.style.setProperty("--fill-color", getFillColor(selectedItem.fill_color));
              }
            }
          });
        }
      }
    });

    const targetNode = document.querySelector(".mySwiper");
    if (targetNode) {
      observer.observe(targetNode, { childList: true });
    }

    return () => observer.disconnect();
  }, [t, trafficData, value]);

  return (
    <S.SlickList>
      <Swiper
        slidesPerView={4}
        spaceBetween={10}
        navigation={true}
        modules={[FreeMode, Pagination, Navigation]}
        className="mySwiper"
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          576: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          992: {
            slidesPerView: 4,
          },
          1200: {
            slidesPerView: 4,
          },
          1400: {
            slidesPerView: 4,
          },
        }}
      >
        <Radio.Group onChange={(e: RadioChangeEvent) => setValue(e.target.value)}>
          {trafficData?.map((item: any) => {
            const [title, tooltip] = getTitleAndToolTip(item.title, t);

            return (
              <SwiperSlide
                key={uuidv4()}
                className={`carousel_item ${value === item.id ? "selected" : ""}`}
                style={
                  {
                    "--fill-color": value === item.id ? getFillColor(item.fill_color) : "initial",
                    borderColor: value === item.id ? getFillColor(item.fill_color) : "rgb(217, 217, 217)",
                  } as any
                }
              >
                <Radio.Button
                  value={item.id}
                  onClick={() => handleClick(item.id)}
                  onKeyDown={() => handleClick(item.id)}
                  className="radio_button"
                >
                  <div
                    className="site_header"
                    style={{ color: value === item.id ? getFillColor(item.fill_color) : "initial" }}
                  >
                    <p>{title}</p>
                    <Tooltip title={tooltip}>
                      <ExclamationCircleOutlined
                        className="icon_tooltip"
                        style={{ color: value === item.id ? getFillColor(item.fill_color) : "initial" }}
                      />
                    </Tooltip>
                  </div>

                  <div className="content">
                    <Title level={3} className="m-0">
                      {item.title !== "conversionRate" ? formatNumber(item.value) : formatPercentage(item.value)}
                    </Title>
                  </div>

                  <div className="percent" style={{ color: item.gap >= 0 ? green_percent : red_percent }}>
                    {item.gap >= 0 ? <CaretUpOutlined /> : <CaretDownOutlined />}
                    <span className="value">{formatPercentage(item.gap)}</span>
                  </div>
                </Radio.Button>
              </SwiperSlide>
            );
          })}
        </Radio.Group>
      </Swiper>
    </S.SlickList>
  );
};

export default SlickList;
