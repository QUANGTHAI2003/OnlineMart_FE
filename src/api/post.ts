import axiosInstance from "@app/api/apiInstance";

const postApi = {
  getAll(params?: any): Promise<any> {
    const url = "/";
    return axiosInstance.get(url, { params });
  },
};

export default postApi;
