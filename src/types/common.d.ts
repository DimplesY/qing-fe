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

interface CommResponse<T> {
  data: CommonData<T>[]
  meta: Pagination
}
