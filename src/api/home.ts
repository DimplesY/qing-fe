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
export function getArticleList(pageNum = 1, sort?: SortType) {
  const params: Record<string, number | string | boolean> = {
    'pagination[pageSize]': 10,
    'pagination[page]': pageNum,
  }
  // 默认显示推荐的文
  if (!sort) {
    params['filters[isRecommended]'] = true
  }
  // 如果有排序的话，就添加排序的参数
  if (sort) {
    params['sort[0]'] = SortEnum[sort]
  }

  return request<CommResponse<Article>>({
    url: '/api/articles',
    method: 'GET',
    params,
  })
}

// 获取文章详情
export function getArticleDetails(articleId: string[] | string | undefined) {
  return request<CommResponse<ArticleDetails>>({
    url: `/api/articles/${articleId}`,
    method: 'GET',
  })
}
