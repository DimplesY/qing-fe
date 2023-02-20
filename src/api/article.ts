import { request } from '@/utils/request'
// 获取文章详情
export function getArticleDetails(articleId: string[] | string | undefined) {
  return request<CommResponse<ArticleDetails>>({
    url: `/api/articles/${articleId}`,
    method: 'GET',
  })
}
