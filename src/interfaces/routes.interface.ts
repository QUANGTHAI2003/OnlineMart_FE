export interface ISidebarMenu {
  title: string;
  key: string;
  url?: string;
  permission: string | string[];
  children?: ISidebarMenu[];
  icon?: React.ReactNode;
}
