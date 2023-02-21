import { getArticleList, SortType } from '@/api/home'
import { useRouter } from 'next/router'
import { FC, useEffect, useMemo, useRef, useState } from 'react'
import useSWR from 'swr'
import ArticleItem from '../ArticleItem'
import clsxm from '@/utils/clsxm'
import styles from './index.module.scss'

interface ArticlePageProps {
  pageNum: number
  sort: string
  category: string
  observer?: IntersectionObserver
}

const ArticleListPage = ({ pageNum, sort, category, observer }: ArticlePageProps) => {
  const { data, isLoading } = useSWR(
    `/api/articles?page=${pageNum}&sort=${sort ? sort : ''}&type=${category}`,
    () => getArticleList(pageNum, sort as SortType, category as string),
  )

  const articleList = data?.data

  if (!articleList?.length && observer && !isLoading) {
    observer.unobserve(document.getElementById('page-end') as HTMLDivElement)
    observer.disconnect()
  }

  if (articleList?.length) {
    return (
      <>
        {articleList.map((item) => (
          <ArticleItem
            key={item.id + item.attributes.title}
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
  // 显示loading
  if (isLoading) {
    return (
      <div className="w-full pt-4 px-[20px] h-[133px] cursor-pointer flex flex-col justify-around">
        <div className={clsxm('h-[14px] bg-zinc-200 rounded-md w-[60%]', styles.loadingLine)}></div>
        <div
          className={clsxm('h-[14px] bg-zinc-200 rounded-md w-[100%]', styles.loadingLine)}></div>
        <div className={clsxm('h-[14px] bg-zinc-200 rounded-md w-[80%]', styles.loadingLine)}></div>
        <div className={clsxm('h-[14px] bg-zinc-200 rounded-md w-[40%]', styles.loadingLine)}></div>
      </div>
    )
  }

  return null
}

const ArticleList: FC = () => {
  const router = useRouter()
  const observer = useRef<IntersectionObserver>()
  const [page, setPage] = useState(0)
  const { sort, category } = router.query
  const pages = useMemo(() => {
    const temPage = []
    for (let i = 1; i <= page; i++) {
      temPage.push(
        <ArticleListPage
          observer={observer.current}
          key={i}
          pageNum={i}
          sort={sort as string}
          category={category as string}
        />,
      )
    }
    return temPage
  }, [page, sort, category])

  useEffect(() => {
    setPage(0)
    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((page) => page + 1)
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      },
    )
    observer.current.observe(document.getElementById('page-end') as HTMLDivElement)
    return () => {
      observer.current?.disconnect()
    }
  }, [sort, category])

  return (
    <>
      {pages}
      <div id="page-end"></div>
    </>
  )
}

export default ArticleList
