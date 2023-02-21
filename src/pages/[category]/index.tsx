import type { GetServerSideProps, NextPage } from 'next'
import Seo from '@/components/Seo'
import {
  getAdvertisements,
  getArticleTabs,
  getArticleTypeList,
  getMenus,
  getAuthorList,
} from '@/api/home'
import Layout from '@/layout/Layout'
import Tabs from '@/components/Tabs'
import { AdvImage } from '@/components/Adv'
import Main from '@/components/Main'
import { QrCode } from '@/components/QrCode'
import AuthorList from '@/components/AuthorList'
import Link from 'next/link'
import clsxm from '@/utils/clsxm'
import { FC, useMemo, useRef } from 'react'
import { useRouter } from 'next/router'
import ArticleList from '@/components/ArticleList'
import { useAdvShow } from '@/hooks/useAdvShow'

interface ArticleTabProps {
  articleTabList: CommonData<ArticleTab>[]
}

// 文章顶部的 tab
const ArticleTab: FC<ArticleTabProps> = ({ articleTabList }) => {
  const router = useRouter()

  // 生成 tab 数据
  const articleTabs = useMemo(
    () =>
      articleTabList.map((item) => ({
        id: item.id,
        name: item.attributes.name,
        link: item.attributes.link.replace('[type]', router.query.category as string) || '/',
        active:
          router.asPath === item.attributes.link.replace('[type]', router.query.category as string),
      })),
    [router, articleTabList],
  )

  return (
    <div className="px-4 py-[1.3rem] border-b border-solid border-b-[hsla(0,0%,59.2%,.1)]">
      <ul className="flex leading-[1]">
        {articleTabs.map((item) => (
          <li
            key={item.id}
            className="shrink-0 text-[1.17rem] px-[1.2rem] last:border-none border-r border-solid border-r-[hsla(0,0%,59.2%,.2)] text-[var(--tabs-color)]">
            <Link
              href={item.link}
              className={clsxm(
                'inline-block hover:text-[var(--tabs-active-color)]',
                item.active && 'text-[var(--tabs-active-color)]',
              )}>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

interface HomeProps {
  menus: CommonData<Menu>[]
  activeId: number
  articleTypeList: CommonData<ArticleType>[]
  advImageList: CommonData<Advertisement>[]
  articleTabList: CommonData<ArticleTab>[]
  authorList: CommonData<AuthorType>[]
}

// 首页
const Home: NextPage<HomeProps> = ({
  menus,
  activeId,
  articleTypeList,
  advImageList,
  authorList,
  articleTabList,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const show = useAdvShow(scrollRef)

  return (
    <Layout menus={menus} activeId={1}>
      <Seo />
      <Tabs articleTypeList={articleTypeList} activeId={activeId} />
      <Main className="flex justify-between mt-[16px]">
        {/* 文章列表 */}
        <div className="flex-1 pb-4  sm:max-w-[700px] bg-[var(--primary-white)] transition-all duration-200">
          {/* 顶部分类栏 */}
          <ArticleTab articleTabList={articleTabList} />

          {/* 文章列表 */}
          <ArticleList />
        </div>

        {/* 广告栏 */}
        <div className="hidden sm:block w-[240px] h-[min-content]" ref={scrollRef}>
          <div
            className={clsxm(
              'duration-200 transition-all top-0',
              show ? 'fixed translate-y-[5.133rem]' : 'static translate-y-[0]',
            )}>
            {advImageList.map((item) => (
              <AdvImage
                key={item.id}
                img={process.env.NEXT_PUBLIC_API_URL + item.attributes.img.data.attributes.url}
                advLink={item.attributes.advLink}
                link={item.attributes.link}
                alt={item.attributes.alt || '稀土掘金'}
                className="w-[240px] h-[200px] overflow-hidden rounded-[2px] mb-[1.3rem]"
              />
            ))}

            {/* 二维码小组件 */}
            <QrCode
              img="/qrCode.png"
              qrLink="/"
              title="下载稀土掘金APP"
              description="一个帮助开发者成长的社区"
            />
          </div>

          {/* 作者榜组件 */}
          <AuthorList authorList={authorList} />
        </div>
      </Main>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  // 顶部菜单
  const menusResponse = await getMenus()
  const menus = menusResponse.data
  // 文章分类
  const articleTypeResponse = await getArticleTypeList()
  const articleTypeList = articleTypeResponse.data
  // 图片广告
  const advImageResponse = await getAdvertisements()
  const advImageList = advImageResponse.data
  // 获取文章栏顶部的tab
  const articleTabResponse = await getArticleTabs()
  const articleTabList = articleTabResponse.data

  // 作者榜
  const authorListResponse = await getAuthorList()
  const authorList = authorListResponse.data

  // 激活的菜单
  const { category } = query
  const { id: activeId } = articleTypeList.find(
    (item) => item.attributes.path === '/' + category,
  ) || {
    id: 1,
  }

  return {
    props: {
      menus,
      activeId,
      articleTypeList,
      advImageList,
      articleTabList,
      authorList,
    },
  }
}

export default Home
