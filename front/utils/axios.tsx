import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
  // headers: {
  //   "Accept-Language": "fa",
  // },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  async (request) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      request.headers = {
        Authorization: `Bearer ${accessToken}`,
      };
    }
    return request;
  },
  (error) => {
    console.log("error in axiosInstance.interceptors.request.use :", error);
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status.includes([401, 403])) {
      // here we must get new accessToken with refreshToken
      const refreshToken = localStorage.getItem("refreshToken");
      // get new accessToken
      const res = await axiosInstance.post("/refresh_token", {
        refresh_token: refreshToken,
      });

      if (res.status === 201) {
        localStorage.setItem("accessToken", res.data.accessToken);
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${res.data.accessToken}`;
      }

      return axiosInstance(originalRequest);
    }
    console.log("error in axiosInstance.interceptors.response.use :", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
