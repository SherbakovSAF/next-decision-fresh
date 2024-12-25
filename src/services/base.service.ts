import { CookiesName } from "@/types/cookies-name.type";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
interface BaseParamsApi_I<T> {
  method: HttpMethod;
  url: string;
  data?: T | null;
  params?: { [key: string]: string | number } | null;
  customConfig?: AxiosRequestConfig | null;
}

const isServer = typeof window === "undefined";

const baseConfigAxios = {
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
  },
};

const defaultApi: AxiosInstance = axios.create(baseConfigAxios);
const detailApi: AxiosInstance = axios.create(baseConfigAxios);

defaultApi.interceptors.request.use(
  async (config) => {
    if (isServer) {
      const { cookies } = await import("next/headers"),
        token = (await cookies()).get(CookiesName.AccessToken)?.value;

      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    } else {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
      );

      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

defaultApi.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error) => Promise.reject(error)
);

detailApi.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

detailApi.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => Promise.reject(error)
);

const getConfigForRequest = <T>({
  method,
  url,
  data = null,
  params = null,
  customConfig = null,
}: BaseParamsApi_I<T>) => {
  let config: AxiosRequestConfig = { method, url };

  if (data) config = { ...config, data };
  if (params) config = { ...config, params };
  if (customConfig) config = { ...config, ...customConfig };
  return config;
};

export const callApi = <T>(
  method: HttpMethod,
  url: string,
  data?: T | null,
  params?: { [key: string]: string | number } | null,
  customConfig?: AxiosRequestConfig | null
): Promise<T> =>
  defaultApi(getConfigForRequest({ url, data, params, customConfig, method }));

export const callDetailsApi = <T>(
  method: HttpMethod,
  url: string,
  data?: T | null,
  params?: { [key: string]: string | number } | null,
  customConfig?: AxiosRequestConfig | null
): Promise<AxiosResponse> =>
  detailApi(getConfigForRequest({ url, data, params, customConfig, method }));
