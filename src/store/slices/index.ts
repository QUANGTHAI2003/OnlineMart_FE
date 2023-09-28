import { authApi } from "./api/authApi";
import { userApi } from "./api/userApi";
import authSlice from "./authSlice";

const exportData: any = {
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  userState: authSlice,
};

export { exportData as rootReducer };

