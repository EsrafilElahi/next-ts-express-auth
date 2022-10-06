import React from 'react'
import Layout from '/components/Layout'
import { NextPageLayout } from '../_app'

type Props = {}

const Login: NextPageLayout = ({ }: Props) => {
  return (
    <div>Login</div>
  )
}

Login.getLayout = (page) => <Layout>{page}</Layout>
export default Login