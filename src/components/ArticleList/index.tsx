import { getArticleList } from '@/api/home'
import { FC, useState } from 'react'
import useSWR from 'swr'
import ArticleItem from '../ArticleItem'

interface ArticlePageProps {
  pageNum: number
}

const ArticlePage = ({ pageNum }: ArticlePageProps) => {
  const { data, error, isLoading } = useSWR(`articleList?page=${pageNum}`, () =>
    getArticleList(pageNum),
  )
  if (isLoading) return <div>loading...</div>
  if (error) return <div>error</div>
  const articleList = data?.data

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
          />
        ))}
    </>
  )
}

const ArticleList: FC = () => {
  const pages: JSX.Element[] = []
  const [pageNum, _] = useState(1)

  for (let i = 0; i < pageNum; i++) {
    pages.push(<ArticlePage pageNum={i} key={i} />)
  }
  return <>{pages}</>
}

export default ArticleList
