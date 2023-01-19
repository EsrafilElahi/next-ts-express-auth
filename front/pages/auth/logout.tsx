import React, { useState, useEffect } from 'react'
import Layout from 'components/Layout'
import type { NextPageLayout } from 'pages/_app'
import { useAppDispatch, useAppSelector } from "../../utils/reduxTools"
import Router from 'next/router'
import { logoutUser } from 'redux/slices/authSlice'

type Props = {}

const Logout: NextPageLayout = ({ }: Props) => {

  const auth = useAppSelector(state => state.authReducer);
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken")
      const res = await dispatch(logoutUser(refreshToken || 'test'))
      console.log('res logout page :', res)
    } catch (error) {
      console.log('err in logout :', error);
    }
  }

  useEffect(() => {
    handleLogout()
  }, [])


  return (
    <div className='flex flex-col justify-center items-center w-[30%] h-[80%] rounded-md bg-blue-500 p-3 gap-10'>
      <h1>you logged out</h1>
      <div className='flex justify-center items-center gap-4'>
        <button className='btn-blue' onClick={() => Router.push('/auth/login')}>login</button>
        <button className='btn-blue' onClick={() => Router.push('/auth/register')}>regsiter</button>
      </div>
    </div>
  )
}

Logout.getLayout = (page) => <Layout title="logout">{page}</Layout>
export default Logout