import { GetServerSideProps, NextPage } from 'next'
import { getMenus } from '@/api/home'
import Layout from '@/layout/Layout'
import Seo from '@/components/Seo'
import { FC, MouseEvent, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { getArticleDetails } from '@/api/article'
import marked, { prism, resetTitle } from '@/utils/marked'
import matter from 'gray-matter'
import clsxm from '@/utils/clsxm'
import RelatedList from '@/components/RelatedList'

export interface ArticleProps {
  articleDetails: CommonData<Article>
  menus: CommonData<Menu>[]
  activeId: number
}

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
        <div className="text-[14px] mt-[4px]">{position}</div>
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
    <div className="w-[300px] bg-[var(--primary-white)] px-[20px] pb-[15px] rounded-[4px] mt-[20px]">
      <div className="h-[56px] leading-[56px] text-[16px] border-b-[1px] border-[#e4e6eb]">
        目录
      </div>
      <ul>
        {tocList.map((item) => (
          <li
            key={item.id}
            className={clsxm(
              'py-[8px] w-[260px] text-[14px] leading-[22px] hover:text-[#1e80ff] truncate',
              currentId === item.id && 'text-[#1e80ff]',
              item.level === 2 && 'pl-[16px]',
            )}>
            <a
              rel="noopener noreferrer"
              href={'#' + item.id}
              onClick={(e) => {
                onLinkClick(e, item.id)
              }}>
              {item.content}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

interface TocProps {
  id: string
  content: string
  level: number
}

const Article: NextPage<ArticleProps> = ({ articleDetails, menus, activeId }) => {
  const [toc, setToc] = useState<TocProps[]>([])
  const observer = useRef<IntersectionObserver | null>(null)
  const [currentId, setCurrentId] = useState<string>('heading-1')

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
          <div className="flex-1 min-h-[100vh] sm:max-w-[820px] bg-[var(--primary-white)] transition-all duration-200">
            {/* 文章渲染 */}
            <article
              dangerouslySetInnerHTML={{ __html: articleDetails.attributes.content }}
              className="prose pt-[2.667rem] px-[2.67rem] relative z-10"
            />
          </div>

          {/* 右侧内容 */}
          <div className="hidden sm:block w-[300px]">
            {/* 作者卡片 */}
            <AuthorCard
              name={articleDetails.attributes.author.data.attributes.name}
              position={articleDetails.attributes.author.data.attributes.position}
              imageUrl={
                articleDetails.attributes.author.data.attributes.imageUrl.data.attributes.url
              }
            />

            {/* 推荐文章 */}
            <RelatedList />

            {/* 目录 */}
            <Directory tocList={toc} currentId={currentId} setCurrentId={setCurrentId} />
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

  // 顶部菜单
  const menusResponse = await getMenus()
  const menus = menusResponse.data

  return {
    props: {
      articleDetails,
      menus,
      activeId: 1,
    },
  }
}

export default Article
