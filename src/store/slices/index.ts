import appReducer from "./appSlice";
import counterSlice from "./counterSlice";

const exportData = {
  app: appReducer,
  counter: counterSlice,
};

export default exportData;
