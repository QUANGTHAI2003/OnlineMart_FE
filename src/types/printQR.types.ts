export interface IPrintQR {
  id: number;
  variant_id: number;
  product_id: number;
  thumbnail_url: string;
  name: string;
  variant: string;
  isVariant: boolean;
  category: string;
  brand: string;
  stock_qty: number;
  created_at: string;
  regular_price: number;
  sale_price: number;
  qr_link: string;
  supllier_name: string;
  status: string;
}
