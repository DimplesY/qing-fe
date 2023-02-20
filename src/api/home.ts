import { request } from '@/utils/request'

// 获取所有的顶部菜单
export function getMenus() {
  return request<CommResponse<Menu>>({
    url: '/api/menus',
    method: 'GET',
  })
}

// 获取文章的类别
export function getArticleTypeList() {
  return request<CommResponse<ArticleType>>({
    url: '/api/article-types',
    method: 'GET',
  })
}

// 获取广告列表
export function getAdvertisements() {
  return request<CommResponse<Advertisement>>({
    url: '/api/advertisements',
    method: 'GET',
  })
}

// 获取文章栏顶部的tab
export function getArticleTabs() {
  return request<CommResponse<ArticleTab>>({
    url: '/api/article-tabs',
    method: 'GET',
  })
}

// 获取作者列表
export function getAuthorList() {
  return request<CommResponse<AuthorType>>({
    url: '/api/authors',
    method: 'GET',
  })
}

// 获取文章列表
export function getArticleList(pageNum = 1) {
  const params = {
    'pagination[pageSize]': 10,
    'pagination[page]': pageNum,
  }

  return request<CommResponse<Article>>({
    url: '/api/articles',
    method: 'GET',
    params,
  })
}
