import { TabsProps } from "antd";

import * as S from "./Tabs.styles";

export const AdminTabs: React.FC<TabsProps> = ({ children, ...props }) => {
  return <S.AdminTabs {...props}>{children}</S.AdminTabs>;
};
