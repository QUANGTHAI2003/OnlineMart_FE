export interface IReviewProduct {
  id: number;
  content: string;
  rating: number;
  agree: string;
  product_id: number;
  user_id: number;
  disagree: string;
  media?: [media: string];
}
