import { getArticleList } from '@/api/home'
import { FC } from 'react'
import useSWR from 'swr'
import ArticleItem from '../ArticleItem'
import useNextPage from './useNextPage'

interface ArticlePageProps {
  pageNum: number
}

const ArticlePage = ({ pageNum }: ArticlePageProps) => {
  const { data } = useSWR(`articleList?page=${pageNum}`, () => getArticleList(pageNum))
  const articleList = data?.data

  if (data?.data.length === 0) return null

  return (
    <>
      {articleList?.length &&
        articleList.map((item) => (
          <ArticleItem
            key={item.id}
            id={item.id}
            title={item.attributes.title}
            desc={item.attributes.desc}
            content={item.attributes.content}
            author={item.attributes.author.data.attributes.name}
            view={item.attributes.view}
            publishedAt={item.attributes.publishedAt}
            cover={item.attributes.cover.data?.attributes.url || ''}
          />
        ))}
    </>
  )
}

const ArticleList: FC = () => {
  const pages: JSX.Element[] = []
  const { pageNum } = useNextPage()
  for (let i = 1; i <= pageNum; i++) {
    pages.push(<ArticlePage pageNum={i} key={i} />)
  }
  return <>{pages}</>
}

export default ArticleList
