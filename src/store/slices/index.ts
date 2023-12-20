import activitySlice from "./activitySlice";
import { activityApi } from "./api/activityApi";
import { adminShopApi } from "./api/admin/adminShopApi";
import { binAdminApi } from "./api/admin/binApi";
import { dashboardApi } from "./api/admin/dashboardApi";
import { inventoryAdminApi } from "./api/admin/inventoryApi";
import { orderApi } from "./api/admin/orderApi";
import { printQRAdminApi } from "./api/admin/printQRApi";
import { productAdminApi } from "./api/admin/productApi";
import { reasonCancelApi } from "./api/admin/reasoncancelApi";
import { reviewAdminApi } from "./api/admin/reviewApi";
import { roleApi } from "./api/admin/roleApi";
import { sellerApi } from "./api/admin/sellerApi";
import { trafficAdminApi } from "./api/admin/trafficApi";
import { voucherApi } from "./api/admin/voucherApi";
import { forgotPasswordApi } from "./api/auth/forgotPasswordApi";
import { authApi } from "./api/authApi";
import { categoryApi } from "./api/categoryApi";
import { productCategoryApi } from "./api/producCategoryApi";
import { shopApi } from "./api/shopApi";
import { managerShopApi } from "./api/superadmin/managerShopApi";
import { supplierApi } from "./api/supplierApi";
import { addressApi } from "./api/user/addressApi";
import { cartApi } from "./api/user/cartApi";
import { checkoutApi } from "./api/user/checkoutApi";
import { notificationApi } from "./api/user/notificationApi";
import { orderUserApi } from "./api/user/orderApi";
import { productApi } from "./api/user/productApi";
import { productFlashsaleApi } from "./api/user/productFlashsaleApi";
import { reviewApi } from "./api/user/reviewApi";
import { shippingApi } from "./api/user/shippingApi";
import { voucherUserApi } from "./api/user/voucherApi";
import { wishlistApi } from "./api/user/wishlistApi";
import { userApi } from "./api/userApi";
import authSlice from "./authSlice";
import activityAdminSlice from "./redux/admin/activityAdminSlice";
import binAdminSlice from "./redux/admin/binAdminSlice";
import inventoryAdminSlice from "./redux/admin/inventoryAdminSlice";
import orderAdminSlice from "./redux/admin/orderAdminSlice";
import productAdminSlice from "./redux/admin/productAdminSlice";
import reviewAdminSlice from "./redux/admin/reviewAdminSlice";
import sellerAdminSlice from "./redux/admin/sellerAdminSlice";
import trafficAdminSlice from "./redux/admin/trafficAdminSlice";
import cartCheckoutSlice from "./redux/cartCheckoutSlice";
import productDetailSlice from "./redux/productDetailSlice";
import showNotificationSlice from "./redux/showNotificationSlice";
import managerShopSlice from "./redux/superadmin/managerShopSlice";
import apiGHNSlice from "./redux/user/apiGHNSlice";
import responsiveSidebar from "./redux/user/responsiveSidebar";
import shippingAddressSlice from "./redux/user/shippingAddressSlice";
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
  [adminShopApi.reducerPath]: adminShopApi.reducer,
  [managerShopApi.reducerPath]: managerShopApi.reducer,
  [voucherUserApi.reducerPath]: voucherUserApi.reducer,
  [productFlashsaleApi.reducerPath]: productFlashsaleApi.reducer,
  [sellerApi.reducerPath]: sellerApi.reducer,
  [inventoryAdminApi.reducerPath]: inventoryAdminApi.reducer,
  [binAdminApi.reducerPath]: binAdminApi.reducer,
  [shopApi.reducerPath]: shopApi.reducer,
  [activityApi.reducerPath]: activityApi.reducer,
  [orderApi.reducerPath]: orderApi.reducer,
  [trafficAdminApi.reducerPath]: trafficAdminApi.reducer,
  [forgotPasswordApi.reducerPath]: forgotPasswordApi.reducer,
  [reviewApi.reducerPath]: reviewApi.reducer,
  [orderUserApi.reducerPath]: orderUserApi.reducer,
  [printQRAdminApi.reducerPath]: printQRAdminApi.reducer,
  [reasonCancelApi.reducerPath]: reasonCancelApi.reducer,
  [cartApi.reducerPath]: cartApi.reducer,
  [checkoutApi.reducerPath]: checkoutApi.reducer,
  [shippingApi.reducerPath]: shippingApi.reducer,
  [dashboardApi.reducerPath]: dashboardApi.reducer,
  userState: authSlice,
  sortSidebar: sortSidebarSlice,
  productDetail: productDetailSlice,
  productAdmin: productAdminSlice,
  reviewAdmin: reviewAdminSlice,
  orderAdmin: orderAdminSlice,
  isNotify: showNotificationSlice,
  sellerAdmin: sellerAdminSlice,
  inventoryAdmin: inventoryAdminSlice,
  binAdmin: binAdminSlice,
  shopInformation: shopSlice,
  activitiesLogs: activitySlice,
  activityAdmin: activityAdminSlice,
  showSidebar: responsiveSidebar,
  trafficAdmin: trafficAdminSlice,
  managerShopSupperAdmin: managerShopSlice,
  cartCheckout: cartCheckoutSlice,
  shippingAddress: shippingAddressSlice,
  shippingFee: apiGHNSlice,
};

export const apiMiddleware = (getDefaultMiddleware: any) =>
  getDefaultMiddleware().concat(
    authApi.middleware,
    userApi.middleware,
    addressApi.middleware,
    categoryApi.middleware,
    productApi.middleware,
    productFlashsaleApi.middleware,
    productCategoryApi.middleware,
    supplierApi.middleware,
    wishlistApi.middleware,
    roleApi.middleware,
    productAdminApi.middleware,
    roleApi.middleware,
    notificationApi.middleware,
    reviewAdminApi.middleware,
    voucherApi.middleware,
    adminShopApi.middleware,
    orderApi.middleware,
    sellerApi.middleware,
    voucherUserApi.middleware,
    inventoryAdminApi.middleware,
    binAdminApi.middleware,
    shopApi.middleware,
    activityApi.middleware,
    cartApi.middleware,
    checkoutApi.middleware,
    shippingApi.middleware,
    dashboardApi.middleware,
    printQRAdminApi.middleware,
    activityApi.middleware,
    orderUserApi.middleware,
    reasonCancelApi.middleware,
    trafficAdminApi.middleware,
    forgotPasswordApi.middleware,
    reviewApi.middleware,
    managerShopApi.middleware
  );
