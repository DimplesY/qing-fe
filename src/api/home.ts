import { request } from '@/utils/request'

export function getMenus() {
  return request<CommResponse<Menu>>({
    url: '/menus',
    method: 'GET',
  })
}

export function getArticleTypeList() {
  return request<CommResponse<ArticleType>>({
    url: '/article-types',
    method: 'GET',
  })
}
