import React, { useLayoutEffect } from 'react'
import type { NextPage } from 'next'
import Login from './auth/login'
import Register from './auth/register'
import Dashboard from './dashboard'
import { useRouter } from 'next/router'
import Layout from 'components/Layout'
import type { TAuthSliceState } from 'types/reduxSlices/suthSlice'
import type { NextPageLayout } from './_app'
import { useAppDispatch, useAppSelector } from "../utils/reduxTools";


const Home: NextPageLayout = () => {
  const auth: TAuthSliceState = useAppSelector(state => state.authReducer);
  const dispatch = useAppDispatch();
  const router = useRouter();

  // console.log('auth reducer :', auth);

  useLayoutEffect(() => {
    if (auth?.isLoggedIn) {
      router.push("/dashboard/")
    } else {
      router.push("/auth/login")
    }
  }, [auth])


  return (
    <>
      {/* {auth?.isLoggedIn ? (<Dashboard />) : (<Login />)} */}
      <span>index page</span>
    </>
  )
}

Home.getLayout = (page) => <Layout title="index page">{page}</Layout>
export default Home
