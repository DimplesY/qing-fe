// eslint-disable-next-line unused-imports/no-unused-imports
import { InternalAxiosRequestConfig } from 'axios'

declare module 'axios' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface InternalAxiosRequestConfig {}
}
