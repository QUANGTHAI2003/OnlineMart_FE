import { productAdminApi } from "./api/admin/productApi";
import { roleApi } from "./api/admin/roleApi";
import { authApi } from "./api/authApi";
import { categoryApi } from "./api/categoryApi";
import { productCategoryApi } from "./api/producCategoryApi";
import { supplierApi } from "./api/supplierApi";
import { addressApi } from "./api/user/addressApi";
import { productApi } from "./api/user/productApi";
import { wishlistApi } from "./api/user/wishlistApi";
import { userApi } from "./api/userApi";
import authSlice from "./authSlice";
import productAdminSlice from "./redux/admin/productAdminSlice";
import productDetailSlice from "./redux/productDetailSlice";
import sortSidebarSlice from "./sortSidebarSlice";

export const rootReducer: any = {
  [authApi.reducerPath]: authApi.reducer,
  [addressApi.reducerPath]: addressApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
  [productApi.reducerPath]: productApi.reducer,
  [productCategoryApi.reducerPath]: productCategoryApi.reducer,
  [supplierApi.reducerPath]: supplierApi.reducer,
  [roleApi.reducerPath]: roleApi.reducer,
  [wishlistApi.reducerPath]: wishlistApi.reducer,
  [productAdminApi.reducerPath]: productAdminApi.reducer,
  userState: authSlice,
  sortSidebar: sortSidebarSlice,
  productDetail: productDetailSlice,
  productAdmin: productAdminSlice,
};

export const apiMiddleware = (getDefaultMiddleware: any) =>
  getDefaultMiddleware().concat(
    authApi.middleware,
    userApi.middleware,
    addressApi.middleware,
    categoryApi.middleware,
    productApi.middleware,
    productCategoryApi.middleware,
    supplierApi.middleware,
    wishlistApi.middleware,
    roleApi.middleware,
    productAdminApi.middleware
  );
