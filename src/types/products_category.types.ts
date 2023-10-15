export interface IProductCategory {
  category_name: string;
  category_slug: string;
  products: IProductCategoryData[];
  paging: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
  filters: ISortSidebar;
}

export interface IProductCategoryData {
  id: number;
  name: string;
  slug: string;
  thumbnail_url: string;
  current_price: number;
  regular_price: number;
  sale_price: number;
  discount_rate: number;
  discount_price: number;
  sku: string;
  rating: number;
  view_count: number;
  sold_count: number;
  short_description: string;
  long_description: string;
  status: "0" | "1";
  type: "configurable" | "simple";
  variant_name: string[] | [];
  shop_id: number;
  supplier_id: number;
  created_at: string;
  updated_at: string;
}

export interface ISortSidebar {
  category: [string, number | string | null];
  sort_price: {
    average_price: number;
    max_price: number;
    min_price: number;
  };
  shop: [];
  supplier: [];
}
