export interface IReview {
  data: any;
  id: number;
  product_id: number;
  product_name: string;
  product_thumbnail: string;
  product_sku: string;
  category: string;
  brand: string;
  user: string;
  full_name: string;
  user_avatar: string;
  content: string;
  images: string | null;
  rating: number;
  shop_id: number;
  parent_id: number;
  shop_avatar: string;
  shop_name: string;
  reply_admin: string | null;
  created_at: string;
}
