import Axios,{AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig} from "axios";
import CookieProvider from "@providers/CookieProvider";

const api = Axios.create({
  baseURL: "http://localhost:3000",
})

api.interceptors.request.use(async (config) => {
  const token = CookieProvider.getCookie({cookieName: "token", ctx: null})
  const cloneConfig = {...config} as InternalAxiosRequestConfig

  if (token) {
    cloneConfig.headers.Authorization = `Bearer ${token}`
  }
  return cloneConfig
})

export default class OnBookApi {

  static get<T=any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return api.get<T>(url, config)
  }

  static post<T=any, R=any>(url: string, data?: T, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return api.post<R>(url, data, config)
  }

  static put<T=any, R=any>(url: string, data?: T, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return api.put<R>(url, data, config)
  }
}
