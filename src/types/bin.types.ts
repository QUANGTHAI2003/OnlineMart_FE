export interface IBin {
  id: number;
  name: string;
  product_media: string | null;
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
