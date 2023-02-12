interface Pagination {
  page: number
  pageSize: number
  pageCount: number
  total: number
}

interface CommonData<T> {
  id: number
  attributes: T
}

interface CommResponse<T = unknown> {
  data: CommonData<T>[]
  meta: Pagination
}

interface CommonImage {
  name: string
  height: number
  width: number
  url: string
}

// 图片的公共属性
interface WrapperImage {
  data: {
    id: number
    attributes: CommonImage
  }
}

declare namespace NodeJS {
  export interface ProcessEnv {
    NEXT_PUBLIC_API_URL: string
  }
}
