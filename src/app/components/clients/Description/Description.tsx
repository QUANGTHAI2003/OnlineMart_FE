import { Button } from "antd";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import * as S from "./Description.styles";
import DescriptionSkeleton from "./DescriptionSkeleton";

interface IDescriptionProps {
  description: string;
  title?: string;
  scrollToBottom?: boolean;
  isFetching?: boolean;
}

const Description = ({
  description,
  title = "user.product_detail.description",
  scrollToBottom = false,
  isFetching = false,
}: IDescriptionProps) => {
  const [lower, setLower] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [desc, setDesc] = useState<string>(description);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const { t } = useTranslation();

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);

    if (isExpanded) {
      contentRef.current?.classList.add("expanded");
    } else {
      contentRef.current?.classList.remove("expanded");
    }
  };

  useEffect(() => {
    if ((contentRef?.current?.clientHeight as number) < 500) {
      setLower(false);
      setDesc(description);
    } else {
      setLower(true);
      const newDesc = description + `<div id="gradient"></div>`;
      setDesc(newDesc);
    }
  }, [desc, description]);

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

  return (
    <S.DescriptionStyles>
      {isFetching ? (
        <DescriptionSkeleton />
      ) : (
        <div className="group" id="desc-top">
          <h2>{t(title)}</h2>
          <div className="content">
            <div className="toggle-content-wrapper">
              <div
                className={`toggle-content-view relative ${isExpanded ? "expanded" : "less"}`}
                ref={contentRef}
                dangerouslySetInnerHTML={{ __html: desc }}
              ></div>
              {lower && (
                <Button className="btn-more" onClick={toggleDescription}>
                  {`${isExpanded ? "Thu gọn" : "Xem thêm"}`}
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </S.DescriptionStyles>
  );
};

export default Description;
