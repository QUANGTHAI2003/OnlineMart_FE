export interface IShop {
  id: number;
  name: string;
  avatar: string;
  email: string;
  phone: string;
  address: string;
  description: string;
  rating: number;
  status: "0" | "1";
  created_at: string;
}
