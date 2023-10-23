import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useSyncToURL } from "@app/hooks";
import { formatNumber, formatPercentage } from "@app/utils/helper";
import { Radio, RadioChangeEvent, Tooltip, Typography } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FreeMode, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { v4 as uuidv4 } from "uuid";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { TrafficWebsiteData } from "../data";
import * as S from "../TrafficWebsite.styles";

const { Title } = Typography;

const SlickList = () => {
  const { t } = useTranslation();
  const syncToURL = useSyncToURL();
  const [value, setValue] = useState<number>(TrafficWebsiteData(t)[0].id);

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
      const selectedItem = TrafficWebsiteData(t).find((item) => item.id === value);
      if (selectedItem) {
        carouselItem.style.setProperty("--fill-color", selectedItem.fill_color);
      }
    }
  }, [t, value]);

  useEffect(() => {
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === "childList") {
          const carouselItems = document.querySelectorAll(".carousel_item");
          carouselItems.forEach((carouselItem) => {
            if (carouselItem && carouselItem instanceof HTMLElement && value !== null) {
              const selectedItem = TrafficWebsiteData(t).find((item) => item.id === value);
              if (selectedItem) {
                carouselItem.style.setProperty("--fill-color", selectedItem.fill_color);
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
  }, [t, value]);

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
          {TrafficWebsiteData(t).map((item) => {
            const IconComponent = item.arrow_icon;

            return (
              <SwiperSlide
                key={uuidv4()}
                className={`carousel_item ${value === item.id ? "selected" : ""}`}
                style={
                  {
                    "--fill-color": value === item.id ? item.fill_color : "initial",
                    borderColor: value === item.id ? item.fill_color : "rgb(217, 217, 217)",
                  } as any
                }
              >
                <Radio.Button
                  value={item.id}
                  onClick={() => handleClick(item.id)}
                  onKeyDown={() => handleClick(item.id)}
                  className="radio_button"
                >
                  <div className="site_header" style={{ color: value === item.id ? item.fill_color : "initial" }}>
                    <p>{item.title}</p>
                    <Tooltip title={item.tooltip}>
                      <ExclamationCircleOutlined
                        className="icon_tooltip"
                        style={{ color: value === item.id ? item.fill_color : "initial" }}
                      />
                    </Tooltip>
                  </div>

                  <div className="content">
                    <Title level={3} className="m-0">
                      {formatNumber(item.value)}
                    </Title>
                  </div>

                  <div className="percent" style={{ color: item.percent_color }}>
                    <IconComponent />
                    <span className="value">{formatPercentage(item.percent)}</span>
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
