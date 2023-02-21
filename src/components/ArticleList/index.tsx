import { getArticleList, SortType } from '@/api/home'
import { useRouter } from 'next/router'
import { FC, useEffect, useRef } from 'react'
import useSWR from 'swr'
import ArticleItem from '../ArticleItem'
import useNextPage from '@/hooks/useNextPage'

interface ArticlePageProps {
  pageNum: number
  sort: string
  category: string
}

const ArticleListPage = ({ pageNum, sort, category }: ArticlePageProps) => {
  const { data } = useSWR(
    `/api/articles?page=${pageNum}&sort=${sort ? sort : ''}&type=${category}`,
    () => getArticleList(pageNum, sort as SortType, category as string),
  )
  const articleList = data?.data

  if (articleList?.length) {
    return (
      <>
        {articleList.map((item) => (
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
            articleTypes={item.attributes.article_types.data}
          />
        ))}
      </>
    )
  }

  return null
}

const ArticleList: FC = () => {
  const router = useRouter()
  const pages = useRef<JSX.Element[]>([])
  const { pageNum } = useNextPage('#page-end')

  useEffect(() => {
    pages.current = []
  }, [router, pageNum])

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
  return (
    <>
      {pages.current}
      <div id="page-end"></div>
    </>
  )
}

export default ArticleList
