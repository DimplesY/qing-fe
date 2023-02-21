import { GetServerSideProps, NextPage } from 'next'
import { getMenus } from '@/api/home'
import Layout from '@/layout/Layout'
import Seo from '@/components/Seo'
import { FC, MouseEvent, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { getArticleDetails, getRecommendedList } from '@/api/article'
import marked, { prism, resetTitle } from '@/utils/marked'
import matter from 'gray-matter'
import clsxm from '@/utils/clsxm'
import RelatedList from '@/components/RelatedList'
import { formatDate } from '@dimplesyj/util'
import { useAdvShow } from '@/hooks/useAdvShow'

interface AuthorProps {
  name: string
  position: string
  imageUrl: string
}

// 作者小卡片
const AuthorCard: FC<AuthorProps> = ({ name, position, imageUrl }) => {
  return (
    <div className="flex rounded-[4px] w-[300px] p-[20px] bg-[var(--primary-white)]">
      <Image
        src={process.env.NEXT_PUBLIC_API_URL + imageUrl}
        width={48}
        height={48}
        alt="头像"
        className="w-[48px] h-[48px] rounded-full"
      />
      <div className="pl-[16px]">
        <div className="text-[16px]">{name}</div>
        <div className="text-[14px] mt-[4px] text-[var(--aside-text-color)]">{position}</div>
      </div>
    </div>
  )
}

interface DirectoryProps {
  tocList: TocProps[]
  currentId: string
  setCurrentId: (id: string) => void
}

// 目录
const Directory: FC<DirectoryProps> = ({ tocList, currentId, setCurrentId }) => {
  // 点击目录
  function onLinkClick(e: MouseEvent, id: string) {
    e.preventDefault()
    location.hash = id
    setCurrentId(id)
    window.scrollTo({
      top: document.getElementById(id)?.offsetTop || 0,
    })
  }

  return (
    <div className="w-[300px] bg-[var(--primary-white)] pb-[15px] rounded-[4px] mt-[20px]">
      <div className="h-[56px] leading-[56px] text-[16px] mx-[20px] border-b-[1px] border-[var(--menu-split-line-color)] text-[var(--article-title-color)]">
        目录
      </div>
      <ul>
        {tocList.map((item) => (
          <li
            key={item.id}
            className={clsxm(
              'py-[8px] w-[260px] text-[14px] leading-[22px] hover:text-[#1e80ff] truncate relative text-[var(--aside-text-color)]',
              currentId === item.id && 'text-[#1e80ff]',
              item.level === 2 && 'pl-[16px]',
            )}>
            <a
              className="mx-[20px]"
              rel="noopener noreferrer"
              href={'#' + item.id}
              onClick={(e) => {
                onLinkClick(e, item.id)
              }}>
              {item.content}
            </a>
            <div
              className={clsxm(
                'absolute left-0 top-[12px] h-[1.25rem] w-[0.333rem] bg-[#1e80ff] rounded-r-[1.25rem]',
                currentId !== item.id && 'hidden',
              )}></div>
          </li>
        ))}
      </ul>
    </div>
  )
}

interface articleContentProps {
  name: string
  title: string
  imageUrl: string
  content: string
  createdAt: string
  view: number
}

// 文章详情
const ArticleContent: FC<articleContentProps> = ({
  name,
  title,
  imageUrl,
  content,
  createdAt,
  view,
}) => {
  return (
    <div className="flex-1 min-h-[100vh] sm:max-w-[820px] bg-[var(--primary-white)] transition-all duration-200">
      {/* 文章标题 */}
      <div className="text-[2.66rem] font-[900] mx-[2.66rem] mt-[2.66rem] text-[var(--tw-prose-headings)]">
        {title}
      </div>
      <div className="flex mx-[2.66rem] mt-[1.66rem] items-center">
        <Image
          className="w-[48px] h-[48px] rounded-full"
          src={process.env.NEXT_PUBLIC_API_URL + imageUrl}
          alt="头像"
          width={48}
          height={48}
        />
        <div className="ml-[1rem]">
          <div className="text-[1.33rem] text-[var(--article-header)]">{name}</div>
          <div className="text-[1.167rem] text-[var(--article-time)]">
            <span>{formatDate(createdAt, 'YYYY年MM月DD日 HH:mm:ss')}</span>
            <span className="mx-[0.36rem]">·</span>
            <span>阅读&nbsp;{view}</span>
          </div>
        </div>
      </div>

      {/* 文章主体渲染 */}
      <article
        dangerouslySetInnerHTML={{ __html: content }}
        className="prose pt-[2.667rem] px-[2.67rem] relative z-10"
      />
    </div>
  )
}

interface TocProps {
  id: string
  content: string
  level: number
}

export interface ArticleProps {
  articleDetails: CommonData<Article>
  menus: CommonData<Menu>[]
  recommendedArticleList: CommonData<Article>[]
  activeId: number
}

const Article: NextPage<ArticleProps> = ({
  articleDetails,
  menus,
  activeId,
  recommendedArticleList,
}) => {
  const [toc, setToc] = useState<TocProps[]>([])
  const observer = useRef<IntersectionObserver | null>(null)
  const [currentId, setCurrentId] = useState<string>('heading-1')
  const scrollRef = useRef<HTMLDivElement>(null)
  const show = useAdvShow(scrollRef)

  useEffect(() => {
    window.Prism = prism
    const tocList = Array.from(document.querySelectorAll('h1,h2')).map((item) => {
      return {
        content: item.textContent?.trim() + '',
        id: item.id,
        level: Number(item.tagName.replace('H', '')),
      }
    })
    setToc(tocList)
  }, [])

  useEffect(() => {
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        // 激活的id
        setCurrentId(entries[0].target.id)
      } else {
        // 激活的id
        if (toc.length) {
          const index = toc.findIndex((item) => item.id === entries[0].target.id)
          setCurrentId(toc[index + 1]?.id || entries[0].target.id)
        }
      }
    })
    document.querySelectorAll('h1,h2').forEach((el) => {
      observer.current && observer.current.observe(el)
    })
    return () => {
      observer.current && observer.current.disconnect()
    }
  }, [toc])

  return (
    <Layout menus={menus} activeId={activeId}>
      <Seo />

      {/* 格式化上下文 */}
      <div className="max-w-[1140px] mx-auto flow-root  pb-20">
        <div className="sm:flex sm:justify-between mt-[16px]">
          {/* 主体内容 */}
          <ArticleContent
            name={articleDetails.attributes.author.data.attributes.name}
            title={articleDetails.attributes.title}
            imageUrl={articleDetails.attributes.author.data.attributes.imageUrl.data.attributes.url}
            content={articleDetails.attributes.content}
            createdAt={articleDetails.attributes.createdAt}
            view={articleDetails.attributes.view}
          />

          {/* 右侧内容 */}
          <div className="hidden sm:block w-[300px] h-[min-content]" ref={scrollRef}>
            {/* 作者卡片 */}
            <AuthorCard
              name={articleDetails.attributes.author.data.attributes.name}
              position={articleDetails.attributes.author.data.attributes.position}
              imageUrl={
                articleDetails.attributes.author.data.attributes.imageUrl.data.attributes.url
              }
            />
            {/* 推荐文章 */}
            <RelatedList recommendedArticleList={recommendedArticleList} />

            {/* 目录 */}
            <div className={clsxm(show ? 'fixed top-0' : 'static')}>
              <Directory tocList={toc} currentId={currentId} setCurrentId={setCurrentId} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { articleId } = query

  // 文章详情数据
  const articleDetailsResponse = await getArticleDetails(articleId)
  const articleDetails = articleDetailsResponse.data
  resetTitle()
  articleDetails.attributes.content = marked.parse(
    matter(articleDetails.attributes.content).content,
  )

  const articleTypeIdList = articleDetails.attributes.article_types.data.map((item) => item.id)
  const recommendedResponse = await getRecommendedList(articleTypeIdList)
  const recommendedArticleList = recommendedResponse.data

  // 顶部菜单
  const menusResponse = await getMenus()
  const menus = menusResponse.data

  return {
    props: {
      articleDetails,
      menus,
      recommendedArticleList,
      activeId: 1,
    },
  }
}

export default Article
