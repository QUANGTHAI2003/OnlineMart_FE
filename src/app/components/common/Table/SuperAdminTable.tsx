import { TableProps } from "antd";
import { GetRowKey } from "antd/es/table/interface";

import * as S from "./Table.styles";

type SuperAdminTableProps<T> = TableProps<T> & {
  rowKey: string | GetRowKey<T> | undefined;
};

export const SuperAdminTable: React.FC<SuperAdminTableProps<any>> = (props) => {
  return <S.SuperAdminTable {...props} />;
};
