import type { GetServerSideProps, NextPage } from 'next'
import Seo from '@/components/Seo'
import { getMenus } from '@/api/menus'
import Layout from '@/layout/Layout'

interface HomeProps {
  menus: Menu[]
}

const Home: NextPage<HomeProps> = () => {
  return (
    <Layout>
      <Seo />
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
