import type { NextPage } from 'next'
import Login from './auth/login'
import Layout from '/components/Layout'
import type { NextPageLayout } from './_app'


const Home: NextPageLayout = () => {
  return (
    <Login />
  )
}

Home.getLayout = (page) => <Layout title="index page">{page}</Layout>
export default Home
