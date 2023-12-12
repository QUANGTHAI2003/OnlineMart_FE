export interface IReview {
  id: number;
  user_id: number;
  product_id: number;
  shop_id: number;
  content: string;
  rating: number;
  like_count: number;
  parent_id: number;
  created_at: string;
  updated_at: string;
}
