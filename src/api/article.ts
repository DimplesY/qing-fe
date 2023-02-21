import { request } from '@/utils/request'
// 获取文章详情
export function getArticleDetails(articleId: string[] | string | undefined) {
  return request<CommSingleResponse<Article>>({
    url: `/api/articles/${articleId}`,
    method: 'GET',
  })
}

// 获取当前分类前十
export function getTagLimit(tag: string | undefined) {
  return request<CommResponse<ArticleTab>>({
    url: 'api/article-types',
    params: {
      'filters[name][$eq]': tag,
      populate: 'deep',
    },
    method: 'GET',
  })
}

// 获取文章推荐列表
export function getRecommendedList(typeIds: number[]) {
  return request<CommResponse<Article>>({
    url: 'api/articles',
    method: 'GET',
    params: {
      'pagination[pageSize]': 5,
      'filters[article_types][id][$in]': typeIds,
      'filters[isRecommended]': true,
    },
  })
}
