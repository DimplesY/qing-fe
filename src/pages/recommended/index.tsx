import type { GetServerSideProps, NextPage } from 'next'
import Seo from '@/components/Seo'
import { getArticleTypeList, getMenus } from '@/api/home'
import Layout from '@/layout/Layout'
import Tabs from '@/components/Tabs'
import { AdvImage } from '@/components/Adv'
import Main from '@/components/Main'
import { QrCode } from '@/components/QrCode'
interface HomeProps {
  menus: CommonData<Menu>[]
  articleTypeList: CommonData<ArticleType>[]
}

const Home: NextPage<HomeProps> = ({ menus, articleTypeList }) => {
  return (
    <Layout menus={menus} activeId={1}>
      <Seo />
      <Tabs articleTypeList={articleTypeList} activeId={1} />
      <Main className="flex justify-between mt-[16px]">
        {/* 文章列表 */}
        <div className="flex-1 min-h-[100vh] sm:max-w-[700px] bg-[var(--primary-white)]"></div>

        {/* 广告栏 */}
        <div className="hidden sm:block w-[240px]">
          <AdvImage
            img="/advImage1.jpg"
            adLink="/"
            link="/"
            alt="稀土掘金"
            className="w-[240px] h-[200px] overflow-hidden rounded-[2px]"
          />

          {/* 二维码小组件 */}
          <QrCode
            img="/qrCode.png"
            qrLink="/"
            title="下载稀土掘金APP"
            description="一个帮助开发者成长的社区"
          />
        </div>
      </Main>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const menusResponse = await getMenus()
  const menus = menusResponse.data
  const articleTypeResponse = await getArticleTypeList()
  const articleTypeList = articleTypeResponse.data
  return {
    props: {
      menus,
      articleTypeList,
    },
  }
}

export default Home
