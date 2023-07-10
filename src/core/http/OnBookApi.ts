import Axios, { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import CookieProvider from '@providers/CookieProvider'
import { COOKIE_APP } from '@data/constants'

const api = Axios.create({
  baseURL: 'http://localhost:3000',
})

api.interceptors.request.use(async (config) => {
  const token = CookieProvider.getCookie({ cookieName: COOKIE_APP, ctx: null })
  const cloneConfig = { ...config } as InternalAxiosRequestConfig

  if (token) {
    cloneConfig.headers.Authorization = `Bearer ${token}`
  }
  return cloneConfig
})

export default class OnBookApi {
  static get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return api.get<T>(url, config)
  }

  static post<T = any, R = any>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<R>> {
    return api.post<R>(url, data, config)
  }

  static put<T = any, R = any>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<R>> {
    return api.put<R>(url, data, config)
  }
}
