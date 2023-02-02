import type { GetServerSideProps, NextPage } from 'next'
import Seo from '@/components/Seo'
import { getMenus } from '@/api/menus'

interface HomeProps {
  menus: Menu[]
}

const Home: NextPage<HomeProps> = () => {
  return (
    <>
      <Seo />
    </>
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
