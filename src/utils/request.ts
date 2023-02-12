import axios, { AxiosRequestConfig } from 'axios'
import type { InternalAxiosRequestConfig, AxiosError, AxiosResponse } from 'axios'

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config
  },
  (err: AxiosError) => {
    return Promise.reject(err)
  },
)

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data
  },
  (err: AxiosError) => {
    return Promise.reject(err)
  },
)

export function request<T>(config: AxiosRequestConfig): Promise<T> {
  return instance(config)
}
