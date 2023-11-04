export interface IProductDetail {
  id: number;
  name: string;
  slug: string;
  current_price: number;
  is_sale: boolean;
  regular_price: number;
  sale_price: number;
  discount_rate: number;
  discount_price: number;
  sku: string;
  status: "enabled" | "disabled";
  rating: number;
  stock_qty: number;
  view_count: number;
  sold_count: number;
  thumbnail_url: string | null;
  gallery: {
    id: number;
    image: string;
  }[];
  description: string;
  meta_title: string | null;
  meta_keyword: string | null;
  meta_description: string | null;
  supplier_name: string;
  shop: {
    id: number;
    name: string;
    avatar: string;
    rating: number;
    followed: "0" | "1";
  };
  is_variant: boolean;
  variants: {
    id: number;
    name: string;
    values: {
      id: number;
      label: string;
      image?: string | null;
      is_image: boolean;
    }[];
  }[];
  info_detail: any;
}
