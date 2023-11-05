export interface IRole {
  id: number;
  name: string;
  permissions: IPermission[];
  created_at: string;
  updated_at: string;
}

export interface IPermission {
  id: number;
  name: string;
}

export type Permission =
  | "View products"
  | "Create product"
  | "Update product"
  | "Delete product"
  | "View categories"
  | "View suppliers"
  | "Create categories"
  | "Update category"
  | "View vouchers"
  | "Create voucher"
  | "Update voucher"
  | "Delete voucher";
