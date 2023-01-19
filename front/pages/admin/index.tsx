import React, { useState, useEffect, useLayoutEffect } from 'react'
import Layout from 'components/Layout'
import type { NextPageLayout } from 'pages/_app'
import { useAppDispatch, useAppSelector } from "../../utils/reduxTools";
import { getUser } from 'redux/slices/usersSlice';
import { TUser, TDataUsers } from 'types/reduxSlices/usersSlice';
import { useRouter } from 'next/router';


const AdminPage: NextPageLayout = () => {
  const auth = useAppSelector(state => state.authReducer.me);

  const router = useRouter()
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    if (!auth.isAdmin) {
      router.push("/dashboard/")
    }
  }, [auth])


  return (
    <div className='flex flex-col justify-center items-center w-[30%] h-[80%] rounded-md bg-blue-500 p-3 gap-4'>
      <h1 className='mb-10'>Admin Land</h1>
      <span>Mr/Ms : {auth.firstName}</span>
    </div>
  )
}

AdminPage.getLayout = (page) => <Layout>{page}</Layout>
export default AdminPage