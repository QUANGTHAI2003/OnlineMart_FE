export interface IAddress {
  id: number;
  name: string;
  phone: string;
  address_home: string;
  city: string;
  district: string;
  ward: string;
  full_address: string;
  is_default: "0" | "1";
  is_select: "0" | "1";
  user_id: number;
  created_at: string;
  updated_at: string;
}
