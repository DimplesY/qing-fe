import { request } from '@/utils/request'
// 获取文章详情
export function getArticleDetails(articleId: string[] | string | undefined) {
  return request<CommResponse<Article>>({
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
