// import { CookiesName } from "@/types/cookies-name.type";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
// interface BaseParamsApi_I {
//   method: HttpMethod;
//   url: string;
//   data?: unknown | null;
//   params?: { [key: string]: string | number } | null;
//   customConfig?: AxiosRequestConfig | null;
// }

const isServer = typeof window === "undefined";

const baseConfig = {
  baseURL: `${process.env.NEXT_PUBLIC_URL_PATH}/api`,
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
  },
};

const defaultApi: AxiosInstance = axios.create(baseConfig);

defaultApi.interceptors.request.use(
  async (config) => {
    if (isServer) {
      const { cookies } = await import("next/headers");
      config.headers.set("Cookie", (await cookies()).toString());
    }
    return config;
  },
  (error) => Promise.reject(error)
);

defaultApi.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  // TODO: Возможно стоит убрать .response.data, но ведь там есть константы и default ошибки, поэтому надо удедиться
  (error) => Promise.reject(error.response.data.constError)
);

export const callApi = async <T>(
  method: HttpMethod,
  url: string,
  data?: unknown | null,
  params?: { [key: string]: string | number } | null,
  customConfig?: AxiosRequestConfig | null
): Promise<T> => {
  let config: AxiosRequestConfig = { method, url };

  if (data) config = { ...config, data };
  if (params) config = { ...config, params };
  if (customConfig) config = { ...config, ...customConfig };

  return defaultApi(config);
};

// TODO: Провести рефакторинг функции. Т.к она написана с помощью ИИ
export const callApiFetch = async (
  method: HttpMethod,
  url: string,
  data?: unknown | null,
  params?: { [key: string]: string | number } | null,
  customHeaders?: HeadersInit | null
): Promise<Response> => {
  const queryString = params
    ? "?" +
      new URLSearchParams(
        Object.entries(params).reduce((acc, [key, value]) => {
          acc[key] = value.toString();
          return acc;
        }, {} as Record<string, string>)
      ).toString()
    : "";

  const fullUrl = `${baseConfig.baseURL}${url}${queryString}`;

  const headers: HeadersInit = {
    ...baseConfig.headers,
    ...customHeaders,
  };

  // Добавление серверных cookies (если выполняется на сервере)
  if (isServer) {
    const { cookies } = await import("next/headers");
    const cookieHeader = (await cookies()).toString();
    if (cookieHeader)
      (headers as Record<string, string>)["Cookie"] = cookieHeader;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), baseConfig.timeout);

  try {
    const response = await fetch(fullUrl, {
      method,
      headers,
      body: data ? JSON.stringify(data) : undefined,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    // Обработка ошибок HTTP
    if (!response.ok) {
      const errorData = await response.json();
      throw errorData.constError || response.statusText;
    }

    // Парсинг ответа
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error; // Передача ошибки дальше
  }
};
