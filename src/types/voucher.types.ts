export interface IVoucher {
  data: any;
  id: number;
  shop_id: number;
  code: string;
  usage_limit: number;
  min_discount_amount: number;
  max_discount_amount: number;
  discount: number;
  unit: "0" | "1";
  status: "0" | "1" | "2";
  date: string;
  start_date: string;
  expired_date: string;
  created_at: string;
  updated_at: string;
}

export interface IUserVoucher {
  id: number;
  discount: number;
  min_discount_amount: number;
  max_discount_amount: number;
  code: string;
  expired_date: string;
}
