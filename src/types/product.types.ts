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
