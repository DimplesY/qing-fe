import type { GetServerSideProps, NextPage } from 'next'
import Seo from '@/components/Seo'
import { getAdvertisements, getArticleTypeList, getMenus } from '@/api/home'
import Layout from '@/layout/Layout'
import Tabs from '@/components/Tabs'
import { AdvImage } from '@/components/Adv'
import Main from '@/components/Main'
import { QrCode } from '@/components/QrCode'
import AuthorList from '@/components/AuthorList'
interface HomeProps {
  menus: CommonData<Menu>[]
  articleTypeList: CommonData<ArticleType>[]
  advImageList: CommonData<Advertisement>[]
}

const Home: NextPage<HomeProps> = ({ menus, articleTypeList, advImageList }) => {
  return (
    <Layout menus={menus} activeId={1}>
      <Seo />
      <Tabs articleTypeList={articleTypeList} activeId={1} />
      <Main className="flex justify-between mt-[16px]">
        {/* 文章列表 */}
        <div className="flex-1 min-h-[100vh] sm:max-w-[700px] bg-[var(--primary-white)]"></div>

        {/* 广告栏 */}
        <div className="hidden sm:block w-[240px]">
          {advImageList.map((item) => (
            <AdvImage
              key={item.id}
              img={process.env.NEXT_PUBLIC_API_URL + item.attributes.img.data.attributes.url}
              adLink={item.attributes.advLink}
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

          {/* 作者榜组件 */}
          <AuthorList authorList="" />
        </div>
      </Main>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  // 顶部菜单
  const menusResponse = await getMenus()
  const menus = menusResponse.data
  // 文章分类
  const articleTypeResponse = await getArticleTypeList()
  const articleTypeList = articleTypeResponse.data

  // 图片广告
  const advImageResponse = await getAdvertisements()
  const advImageList = advImageResponse.data

  return {
    props: {
      menus,
      articleTypeList,
      advImageList,
    },
  }
}

export default Home
