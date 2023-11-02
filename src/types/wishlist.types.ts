export interface IWishlist {
  id: number;
  product_id: number;
  name: string;
  slug: string;
  thumbnail_url: string;
  current_price: number;
  is_sale: boolean;
  regular_price: number;
  discount_rate: number;
  rating: number;
}
