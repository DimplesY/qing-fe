import type { GetServerSideProps, NextPage } from 'next'
import Seo from '@/components/Seo'
import { getMenus } from '@/api/menus'
import Layout from '@/layout/Layout'
import Tabs from '@/components/Tabs'

interface HomeProps {
  menus: CommonData<Menu>[]
}

const Home: NextPage<HomeProps> = ({ menus }) => {
  return (
    <Layout menus={menus} activeId={1}>
      <Seo />
      <Tabs />
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
