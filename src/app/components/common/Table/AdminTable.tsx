import { TableProps } from "antd";
import { GetRowKey } from "antd/es/table/interface";

import * as S from "./Table.styles";

type AdminTableProps<T> = TableProps<T> & {
  rowKey: string | GetRowKey<T> | undefined;
};

export const AdminTable: React.FC<AdminTableProps<any>> = (props) => {
  return <S.AdminTable {...props} />;
};
