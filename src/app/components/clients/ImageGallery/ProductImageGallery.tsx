/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import * as S from "@app/app/components/clients/ImageGallery/ProductImageGallery.style";
import "lightgallery/css/lg-fullscreen.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lightgallery.css";
import lgFullScreen from "lightgallery/plugins/fullscreen";
import lgVideo from "lightgallery/plugins/video";
import lgZoom from "lightgallery/plugins/zoom";
import LightGalleryImg from "lightgallery/react";
import "lightgallery/scss/lg-zoom.scss";
import "lightgallery/scss/lightgallery.scss";
import { useEffect, useRef, useState } from "react";

const ProductImageGallery = () => {
  const [active, setActive] = useState<number>(0);
  const data = [
    {
      id: 1,
      type: "image/webp",
      title: "Đồ Chơi - Mẹ & Bé",
      src: [
        "https://tse1.mm.bing.net/th?id=OIP.88WuL2nATbZnyPM8HAOG2AHaDv&pid=Api&P=0&h=180",
        "https://media.istockphoto.com/id/1464561797/photo/artificial-intelligence-processor-unit-powerful-quantum-ai-component-on-pcb-motherboard-with.webp?b=1&s=170667a&w=0&k=20&c=AeBEFdsaJZmhbPHGocUkCutsQuR2rt828Aa8bDHyiOo=",
        "https://media.istockphoto.com/id/1452604857/photo/businessman-touching-the-brain-working-of-artificial-intelligence-automation-predictive.webp?b=1&s=170667a&w=0&k=20&c=iJp6e2C-l2lRmyG3ColHMpXe0QYrPnrfQQc2O6PsYC4=",
        "https://media.istockphoto.com/id/1347540778/photo/leaves-of-different-sizes-and-colors-close-up.webp?b=1&s=170667a&w=0&k=20&c=-dto-2w3V3v_CZZuErUSHwAHr2QS_CEVq2VN3jm341k=",
        "https://tse1.mm.bing.net/th?id=OIP.88WuL2nATbZnyPM8HAOG2AHaDv&pid=Api&P=0&h=180",
        "https://media.istockphoto.com/id/1464561797/photo/artificial-intelligence-processor-unit-powerful-quantum-ai-component-on-pcb-motherboard-with.webp?b=1&s=170667a&w=0&k=20&c=AeBEFdsaJZmhbPHGocUkCutsQuR2rt828Aa8bDHyiOo=",
        "https://media.istockphoto.com/id/1452604857/photo/businessman-touching-the-brain-working-of-artificial-intelligence-automation-predictive.webp?b=1&s=170667a&w=0&k=20&c=iJp6e2C-l2lRmyG3ColHMpXe0QYrPnrfQQc2O6PsYC4=",
        "https://media.istockphoto.com/id/1347540778/photo/leaves-of-different-sizes-and-colors-close-up.webp?b=1&s=170667a&w=0&k=20&c=-dto-2w3V3v_CZZuErUSHwAHr2QS_CEVq2VN3jm341k=",
      ],
    },
  ];
  // const imageGallery = [
  //   "https://tse1.mm.bing.net/th?id=OIP.88WuL2nATbZnyPM8HAOG2AHaDv&pid=Api&P=0&h=180",
  //   "https://media.istockphoto.com/id/1464561797/photo/artificial-intelligence-processor-unit-powerful-quantum-ai-component-on-pcb-motherboard-with.webp?b=1&s=170667a&w=0&k=20&c=AeBEFdsaJZmhbPHGocUkCutsQuR2rt828Aa8bDHyiOo=",
  //   "https://media.istockphoto.com/id/1452604857/photo/businessman-touching-the-brain-working-of-artificial-intelligence-automation-predictive.webp?b=1&s=170667a&w=0&k=20&c=iJp6e2C-l2lRmyG3ColHMpXe0QYrPnrfQQc2O6PsYC4=",
  // ];
  const myActive = useRef<HTMLDivElement>(null);
  const handleTab = (active: number) => {
    setActive(active);
    if (myActive.current) {
      const images = myActive.current.children;
      const imageLength = images.length;
      for (let i = 0; i < imageLength; i++) {
        images[i].classList.remove("active");
      }
      images[active].classList.add("active");
    }
  };
  useEffect(() => {
    handleTab(0);
  }, []);
  const lightGallery = useRef<any>(null);
  const openGallery = () => {
    lightGallery.current.openGallery();
  };
  const onInit = (detail: any) => {
    if (detail) {
      lightGallery.current = detail.instance;
    }
  };
  return (
    <>
      <div className="w-full">
        {data.map((item) => {
          const remainingCount = item.src.length - 6;
          const remaining = item.src.slice(0, 6);
          return (
            <div key={item.id}>
              <div className="relative text-center">
                <div className="cursor-pointer" onClick={openGallery}>
                  <img src={item.src[active]} alt={item.title} className="object-cover w-full" />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-start gap-x-2" ref={myActive}>
                  {remaining.map((img, active) => (
                    <S.ImageGallery key={img}>
                      <img
                        src={img}
                        alt={item.title}
                        onClick={() => handleTab(active)}
                        className="object-cover w-full h-full"
                      />
                      {active === 5 && item.src.length > 6 && (
                        <div className="mr-0 overlay" role="button" onClick={openGallery}>
                          <span>{`Xem thêm ${remainingCount} hình`}</span>
                        </div>
                      )}
                    </S.ImageGallery>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <LightGalleryImg
        loop={false}
        hideBarsDelay={0}
        counter={false}
        closeOnTap={false}
        enableDrag={false}
        hideControlOnEnd={true}
        dynamic
        dynamicEl={data[0].src.map((img) => ({
          src: img,
          thumb: img,
        }))}
        onInit={onInit}
        getCaptionFromTitleOrAlt={false}
        defaultCaptionHeight={50}
        download={false}
        speed={500}
        plugins={[lgZoom, lgVideo, lgFullScreen]}
      ></LightGalleryImg>
    </>
  );
};

export default ProductImageGallery;
