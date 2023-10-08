import { authApi } from "./api/authApi";
import { categoryApi } from "./api/categoryApi";
import { productCategoryApi } from "./api/producCategoryApi";
import { userApi } from "./api/userApi";
import authSlice from "./authSlice";
import sortSidebarSlice from "./sortSidebarSlice";

export const rootReducer: any = {
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
  [productCategoryApi.reducerPath]: productCategoryApi.reducer,
  userState: authSlice,
  sortSidebar: sortSidebarSlice,
};

export const apiMiddleware = (getDefaultMiddleware: any) =>
  getDefaultMiddleware().concat(
    authApi.middleware,
    userApi.middleware,
    categoryApi.middleware,
    productCategoryApi.middleware
  );
