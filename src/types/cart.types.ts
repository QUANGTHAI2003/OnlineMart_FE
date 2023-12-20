export interface ICart {
  shop_id: number;
  shop_name: string;
  items: {
    id: number;
    name: string;
    thumbnail_url: string;
    price: number;
    is_checked?: string;
    created_at: string;
    sku: string;
    product_id: number;
    cart_id: number;
    quantity: number;
  }[];
}

export interface IRecentItem {
  id: number;
  name: string;
  thumbnail_url: string;
  price: number;
  sku: string;
  is_checked?: string;
  product_id: number;
  quantity: number;
  shop_id?: number;
  cart_id: number;
  create_at: string;
}
