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

export interface IShopInformation {
  id: number;
  name: string;
  avatar: string;
  status: "0" | "1";
  email: string;
  phone: string;
  address: string;
  description: string;
  url: string;
  profile_number: "1" | "2" | "3" | "4";
  type: "0" | "1" | "2";
  name_bank: string;
  user_name_bank: string;
  number_bank: string;
  bank_account_number: string;
  front_side: string;
  back_side: string;
  portrait_photo: string;
  national_id: string;
  reason_accpect: string;
  users: {
    email: string;
    full_name: string;
    phone: string;
  }[];
}

export interface IManagerShop {
  id: number;
  name: string;
  code: string;
  type: "0" | "1" | "2";
  avatar: string;
  status: "0" | "1";
  email: string;
  phone: string;
}
[];
