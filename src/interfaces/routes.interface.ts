export interface ISidebarMenu {
  title: string;
  key: string;
  url?: string;
  children?: ISidebarMenu[];
  icon?: React.ReactNode;
}
