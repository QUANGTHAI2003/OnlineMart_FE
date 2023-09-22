export interface IOrder {
  id: number;
  status: string;
  status_slug: string;
  grand_total: number;
  items: IOrderItem[];
  shipping_address: IShippingAddress[];
  shipping: IShippingMethod[];
}
export interface IOrderItem {
  id: number;
  category_name: string;
  product_id: number;
  product_sku: number;
  product_name: string;
  sale_price: number;
  qty: number;
  price: number;
  subtotal: number;
  discount: number;
  grand_total: number;
  thumbnail_url: string;
  current_seller: ICurrentSeller[];
}
export interface ICurrentSeller {
  id: number;
  name: string;
  link: string | null;
  store_id: number;
}
export interface IShippingAddress {
  id: number;
  name: string;
  road: string;
  ward: string;
  district: string;
  city: string;
  country: string;
  telephone: string;
}
export interface IShippingMethod {
  method_fee_text: string;
  method_text: string;
  method_name: string;
  delivery_name: string;
}
