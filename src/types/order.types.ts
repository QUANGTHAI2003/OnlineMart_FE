export interface IOrder {
  id: number;
  full_name: string;
  shipping_unit: string;
  status: "awaiting" | "processing" | "shipping" | "canceled" | "delivered";
  street: string;
  district: string;
  city: string;
  delivery_date: string;
  created_at: string;
  grand_total: number;
  user: {
    id: number;
    name: string;
    phone: string;
  };
  order_item: {
    shop_id: number;
    shop_name: string;
    products: {
      id: number;
      product_name: string;
      product_image: string;
      product_price: number;
      product_quantity: number;
      product_sale: number;
      product_sku: string;
    };
  };
}
[];
