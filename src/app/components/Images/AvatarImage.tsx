import { Avatar as AntdAvatar } from "antd";
import React, { ReactNode, useState } from "react";

interface IAvatarImageProps {
  src: string | null | undefined;
  alt: string | undefined;
  [key: string]: any;
}

const AvatarImage: React.FC<IAvatarImageProps> = ({ src, alt = "User Avatar", ...rest }) => {
  const [imageSrc, setImageSrc] = useState<string | ReactNode>(src);

  const fallbackSrc = "https://ui-avatars.com/api/";
  const postFix = "&background=random&rounded=true&size=120";

  const handleImageError = (): any => {
    setImageSrc(`${fallbackSrc}?name=${encodeURIComponent(alt)}${postFix}`);
  };

  return <AntdAvatar src={imageSrc} alt={alt} onError={handleImageError} {...rest} />;
};

export default AvatarImage;
