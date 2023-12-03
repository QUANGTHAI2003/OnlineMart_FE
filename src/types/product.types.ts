export interface IProduct {
  id: number;
  name: string;
  thumbnail_url: string | null;
  sku: string;
  parent_category: string;
  category: string;
  brand: string;
  status: string;
  stock: number;
  price: number;
  isVariant: boolean;
  num_of_variant: number;
  updated_at: string;
}

export interface IProductUser {
  id: number;
  slug: string;
  thumbnail_url: string | null;
  name: string;
  sale_price: number;
  discount_rate: number;
  rating: number;
  sold_count: number;
  type: string;
  variant_name: string[];
}

export interface IProductFlashSale {
  id: number;
  slug: string;
  name: string;
  thumbnail_url: string;
  current_price: number;
}
