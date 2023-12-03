import { formatedDate } from "@app/app/pages/admin/dev_center/traffic_website/components/ReportTime";
import { RootState } from "@app/store/store";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

interface ITrafficAdminState {
  pageType: string;
  deviceType: string;
  dateFilter: {
    startDate: string;
    endDate: string;
  };
}

const initialState: ITrafficAdminState = {
  pageType: "all",
  deviceType: "all",
  dateFilter: {
    startDate: dayjs().format(formatedDate),
    endDate: dayjs().format(formatedDate),
  },
};

const trafficAdminSlice = createSlice({
  name: "trafficAdmin",
  initialState: initialState,
  reducers: {
    setDeviceType: (state: RootState, action: PayloadAction<any>) => {
      state.deviceType = action.payload;
    },
    setPageType: (state: RootState, action: PayloadAction<any>) => {
      state.pageType = action.payload;
    },
    setStartDate: (state: RootState, action: PayloadAction<any>) => {
      console.log("setStartDate", action.payload);
      state.dateFilter.startDate = action.payload;
    },
    setEndDate: (state: RootState, action: PayloadAction<any>) => {
      console.log("setEndDate", action.payload);
      state.dateFilter.endDate = action.payload;
    },
  },
});

export const { setDeviceType, setPageType, setStartDate, setEndDate } = trafficAdminSlice.actions;

export default trafficAdminSlice.reducer;
