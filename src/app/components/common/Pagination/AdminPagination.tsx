import { PaginationProps } from "antd";

import * as S from "./AdminPagination.styles";

export const AdminPagination: React.FC<PaginationProps> = (props) => {
  return <S.PaginationStyle {...props} />;
};
