export interface IActivity {
  id: number;
  author: string;
  avatar?: string;
  action_type: string;
  action: string;
  content: string;
  data?: object;
  action_date: string;
  ip: string;
  userAgent: string;
}

export interface IMemberShop {
  id: number;
  label: string;
  value: string;
}
