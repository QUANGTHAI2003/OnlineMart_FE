export interface INotification {
  id: number;
  slug: string;
  items: INotificationItem[];
}

export interface INotificationItem {
  id: number;
  title: string;
  date: string;
}


