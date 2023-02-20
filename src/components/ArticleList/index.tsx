import { getArticleList } from '@/api/home'
import { useRouter } from 'next/router'
import { FC, useEffect, useRef } from 'react'
import useSWR from 'swr'
import ArticleItem from '../ArticleItem'
import useNextPage from './useNextPage'

interface ArticlePageProps {
  pageNum: number
  sort: string
  category: string
}

const ArticleListPage = ({ pageNum, sort, category }: ArticlePageProps) => {
  const { data } = useSWR(
    `/api/articles?page=${pageNum}&sort=${sort ? sort : ''}&type=${category}`,
    () => getArticleList(pageNum, sort as SortType),
  )
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
            cover={item.attributes.cover.data?.attributes.url}
          />
        ))}
    </>
  )
}

const ArticleList: FC = () => {
  const router = useRouter()
  const { pageNum } = useNextPage()
  const pages = useRef<JSX.Element[]>([])

  useEffect(() => {
    window.scrollTo(0, 0)
    pages.current = []
  }, [router])

  for (let i = 1; i <= pageNum; i++) {
    pages.current.push(
      <ArticleListPage
        pageNum={i}
        sort={router.query.sort as string}
        category={router.query.category as string}
        key={i}
      />,
    )
  }
  return <>{pages.current}</>
}

export default ArticleList
