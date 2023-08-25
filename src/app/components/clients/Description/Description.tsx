import { Button } from "antd";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import * as S from "./Description.styles";
import DescriptionSkeleton from "./DescriptionSkeleton";

interface IDescriptionProps {
  description: string;
  title?: string;
  scrollToBottom?: boolean;
}

const Description = ({
  description,
  title = "user.product_detail.description",
  scrollToBottom = false,
}: IDescriptionProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const contentRef = useRef<HTMLDivElement | null>(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const { t } = useTranslation();

  const newDesc = description + '<div id="gradient"></div>';

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);

    if (isExpanded) {
      contentRef.current?.classList.add("expanded");
    } else {
      contentRef.current?.classList.remove("expanded");
    }
  };

  useEffect(() => {
    const gradient = document.getElementById("gradient");
    const descTop = document.getElementById("desc-top");
    if (scrollToBottom) {
      if (isExpanded) {
        gradient?.scrollIntoView({ behavior: "smooth" });
      } else {
        descTop?.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [isExpanded, scrollToBottom]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  });

  return (
    <S.DescriptionStyles>
      {isLoading ? (
        <DescriptionSkeleton />
      ) : (
        <div className="group" id="desc-top">
          <h2>{t(title)}</h2>
          <div className="content">
            <div className="toggle-content-wrapper">
              <div
                className={`toggle-content-view relative ${isExpanded ? "expanded" : "less"}`}
                ref={contentRef}
                dangerouslySetInnerHTML={{ __html: newDesc }}
              ></div>
              <Button className="btn-more" onClick={toggleDescription}>
                {`${isExpanded ? "Thu gọn" : "Xem thêm"}`}
              </Button>
            </div>
          </div>
        </div>
      )}
    </S.DescriptionStyles>
  );
};

export default Description;
