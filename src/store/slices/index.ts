import { productAdminApi } from "./api/admin/productApi";
import { roleApi } from "./api/admin/roleApi";
import { sellerApi } from "./api/admin/sellerApi";
import { voucherApi } from "./api/admin/voucherApi";
import { authApi } from "./api/authApi";
import { categoryApi } from "./api/categoryApi";
import { productCategoryApi } from "./api/producCategoryApi";
import { supplierApi } from "./api/supplierApi";
import { addressApi } from "./api/user/addressApi";
import { notificationApi } from "./api/user/notificationApi";
import { productApi } from "./api/user/productApi";
import { voucherUserApi } from "./api/user/voucherApi";
import { wishlistApi } from "./api/user/wishlistApi";
import { userApi } from "./api/userApi";
import authSlice from "./authSlice";
import productAdminSlice from "./redux/admin/productAdminSlice";
import sellerAdminSlice from "./redux/admin/sellerAdminSlice";
import productDetailSlice from "./redux/productDetailSlice";
import showNotificationSlice from "./redux/showNotificationSlice";
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
  [notificationApi.reducerPath]: notificationApi.reducer,
  [voucherApi.reducerPath]: voucherApi.reducer,
  [voucherUserApi.reducerPath]: voucherUserApi.reducer,
  [sellerApi.reducerPath]: sellerApi.reducer,
  userState: authSlice,
  sortSidebar: sortSidebarSlice,
  productDetail: productDetailSlice,
  productAdmin: productAdminSlice,
  isNotify: showNotificationSlice,
  sellerAdmin: sellerAdminSlice,
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
    productAdminApi.middleware,
    roleApi.middleware,
    notificationApi.middleware,
    voucherApi.middleware,
    sellerApi.middleware,
    voucherUserApi.middleware
  );
