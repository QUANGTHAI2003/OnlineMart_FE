import activitySlice from "./activitySlice";
import { activityApi } from "./api/activityApi";
import { inventoryAdminApi } from "./api/admin/inventoryApi";
import { orderApi } from "./api/admin/orderApi";
import { productAdminApi } from "./api/admin/productApi";
import { reviewAdminApi } from "./api/admin/reviewApi";
import { roleApi } from "./api/admin/roleApi";
import { sellerApi } from "./api/admin/sellerApi";
import { voucherApi } from "./api/admin/voucherApi";
import { authApi } from "./api/authApi";
import { categoryApi } from "./api/categoryApi";
import { productCategoryApi } from "./api/producCategoryApi";
import { shopApi } from "./api/shopApi";
import { supplierApi } from "./api/supplierApi";
import { addressApi } from "./api/user/addressApi";
import { notificationApi } from "./api/user/notificationApi";
import { productApi } from "./api/user/productApi";
import { voucherUserApi } from "./api/user/voucherApi";
import { wishlistApi } from "./api/user/wishlistApi";
import { userApi } from "./api/userApi";
import authSlice from "./authSlice";
import inventoryAdminSlice from "./redux/admin/inventoryAdminSlice";
import orderAdminSlice from "./redux/admin/orderAdminSlice";
import productAdminSlice from "./redux/admin/productAdminSlice";
import reviewAdminSlice from "./redux/admin/reviewAdminSlice";
import sellerAdminSlice from "./redux/admin/sellerAdminSlice";
import productDetailSlice from "./redux/productDetailSlice";
import showNotificationSlice from "./redux/showNotificationSlice";
import shopSlice from "./shopSlice";
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
  [reviewAdminApi.reducerPath]: reviewAdminApi.reducer,
  [voucherApi.reducerPath]: voucherApi.reducer,
  [voucherUserApi.reducerPath]: voucherUserApi.reducer,
  [sellerApi.reducerPath]: sellerApi.reducer,
  [inventoryAdminApi.reducerPath]: inventoryAdminApi.reducer,
  [shopApi.reducerPath]: shopApi.reducer,
  [activityApi.reducerPath]: activityApi.reducer,
  [orderApi.reducerPath]: orderApi.reducer,
  userState: authSlice,
  sortSidebar: sortSidebarSlice,
  productDetail: productDetailSlice,
  productAdmin: productAdminSlice,
  reviewAdmin: reviewAdminSlice,
  orderAdmin: orderAdminSlice,
  isNotify: showNotificationSlice,
  sellerAdmin: sellerAdminSlice,
  inventoryAdmin: inventoryAdminSlice,
  shopInformation: shopSlice,
  activitiesLogs: activitySlice,
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
    reviewAdminApi.middleware,
    voucherApi.middleware,
    orderApi.middleware,
    sellerApi.middleware,
    voucherUserApi.middleware,
    inventoryAdminApi.middleware,
    shopApi.middleware,
    activityApi.middleware
  );
