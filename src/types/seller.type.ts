export interface ISeller {
  shop_id: number;
  id: number;
  name: string;
  email: string;
  phone: string;
  shop_name: string;
  shop_owner: any;
  is_owner: boolean;
  roles: { id: number; name: string };
  permissions: { id: number; name: string };
  status: "active" | "inactive";
}
