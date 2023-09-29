import { authApi } from "./api/authApi";
import { categoryApi } from "./api/categoryApi";
import { userApi } from "./api/userApi";
import authSlice from "./authSlice";

const exportData: any = {
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
  userState: authSlice,
};

export { exportData as rootReducer };

