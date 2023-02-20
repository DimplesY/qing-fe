import { GetServerSideProps, NextPage } from 'next'
import { getMenus } from '@/api/home'
import Layout from '@/layout/Layout'
import Seo from '@/components/Seo'
import { FC } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getArticleDetails } from '@/api/article'

//eslint-disable-next-line @typescript-eslint/no-var-requires
const showdown = require('showdown')

export interface ArticleProps {
  articleDetails: CommonData<Article>
  menus: CommonData<Menu>[]
  activeId: number
}

// 推荐文章列表
const RelatedList: FC = () => {
  return (
    <div className="w-[300px] bg-[var(--primary-white)] px-[20px] pb-[15px] rounded-[4px] mt-[20px]">
      <div className="h-[56px] leading-[56px] text-[16px] border-b-[1px] border-[#e4e6eb]">
        相关文章
      </div>
      <ul>
        <li className="py-[8px] w-[260px] text-[14px] leading-[22px] hover:text-[#1e80ff]">
          <Link href="/">【一库】yalc: 可能是最好的前端link调试方案（已经非常谦虚了）</Link>
        </li>
        <li className="py-[8px] w-[260px] text-[14px] leading-[22px] hover:text-[#1e80ff]">
          <Link href="/">【一库】yalc: 可能是最好的前端link调试方案（已经非常谦虚了）</Link>
        </li>
        <li className="py-[8px] w-[260px] text-[14px] leading-[22px] hover:text-[#1e80ff]">
          <Link href="/">【一库】yalc: 可能是最好的前端link调试方案（已经非常谦虚了）</Link>
        </li>
      </ul>
    </div>
  )
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

// 目录
const Directory: FC = () => {
  return (
    <div className="w-[300px] bg-[var(--primary-white)] px-[20px] pb-[15px] rounded-[4px] mt-[20px]">
      <div className="h-[56px] leading-[56px] text-[16px] border-b-[1px] border-[#e4e6eb]">
        目录
      </div>
      <ul>
        <li className="py-[8px] w-[260px] text-[14px] leading-[22px] hover:text-[#1e80ff]">
          <Link href="/">【一库】yalc: 可能是最好的前端link调试方案（已经非常谦虚了）</Link>
        </li>
      </ul>
    </div>
  )
}

const Article: NextPage<ArticleProps> = ({ articleDetails, menus, activeId }) => {
  const converter = new showdown.Converter()
  return (
    <Layout menus={menus} activeId={activeId}>
      <Seo />

      {/* 格式化上下文 */}
      <div className="max-w-[1140px] mx-auto flow-root">
        <div className="flex justify-between mt-[16px]">
          {/* 主体内容 */}
          <div className="flex-1 min-h-[100vh] sm:max-w-[820px] bg-[var(--primary-white)] transition-all duration-200">
            {/* <div>{articleDetails.attributes.content}</div> */}

            {/* 文章渲染 */}
            <div
              dangerouslySetInnerHTML={{
                __html: converter.makeHtml(articleDetails.attributes.content),
              }}
              className="pose content"
            />
            <h1>dsfasdfadsf</h1>
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
            <Directory />
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

  // 顶部菜单
  const menusResponse = await getMenus()
  const menus = menusResponse.data

  return {
    props: {
      articleDetails,
      menus,
    },
  }
}

export default Article
