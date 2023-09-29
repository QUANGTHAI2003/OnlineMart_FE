export interface ICategory {
  id: number;
  name: string;
  slug: string;
  thumbnail_url: string;
  parent_id: number | null;
  status: number;
  shop_id: number | null;
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  created_at: string;
  updated_at: string;
}
