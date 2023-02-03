import type { GetServerSideProps, NextPage } from 'next'
import Seo from '@/components/Seo'
import { getMenus } from '@/api/menus'
import Layout from '@/layout/Layout'
import Tabs from '@/components/Tabs'
import { AdvImage } from '@/components/Adv'
import Main from '@/components/Main'

interface HomeProps {
  menus: CommonData<Menu>[]
}

const Home: NextPage<HomeProps> = ({ menus }) => {
  return (
    <Layout menus={menus} activeId={1}>
      <Seo />
      <Tabs />
      <Main className="flex justify-between mt-[16px]">
        {/* 文章列表 */}
        <div className="w-[700px] bg-white"></div>

        {/* 广告栏 */}
        <div className="">
          <AdvImage
            img="/advImage1.jpg"
            adLink="/"
            link="/"
            alt="稀土掘金"
            className="w-[240px] h-[200px] overflow-hidden rounded-[2px]"
          />
        </div>
      </Main>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await getMenus()
  const menus = response.data
  return {
    props: {
      menus,
    },
  }
}

export default Home
