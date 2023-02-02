import axios from 'axios'
import type { InternalAxiosRequestConfig, AxiosError, AxiosResponse } from 'axios'

const request = axios.create({
  baseURL: process.env.API_URL,
})

request.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config
  },
  (err: AxiosError) => {
    return Promise.reject(err)
  },
)

request.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data
  },
  (err: AxiosError) => {
    return Promise.reject(err)
  },
)

export default request
