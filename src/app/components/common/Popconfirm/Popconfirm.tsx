import { PopconfirmProps } from "antd";

import * as S from "./Popconfirm.styles";

export const AdminPopconfirm: React.FC<PopconfirmProps> = ({ children, ...props }) => {
  return <S.PopconfirmStyle {...props}>{children}</S.PopconfirmStyle>;
};
