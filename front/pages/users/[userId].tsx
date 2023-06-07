import React, { useState, useEffect } from 'react'
import Layout from 'components/Layout'
import type { NextPageLayout } from 'pages/_app'
import { useAppDispatch, useAppSelector } from "../../utils/reduxTools";
import { getUser } from 'redux/slices/usersSlice';
import Router from 'next/router';
import { useRouter } from 'next/router';
import { TUser, TDataUsers } from 'types/reduxSlices/usersSlice';


const UserDetails: NextPageLayout = () => {

  const data: TDataUsers = useAppSelector(state => state.usersReducer.user);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const loadUser = async (id: number | string) => {
    try {
      const res = await dispatch(getUser(id)).unwrap();
      return res
    } catch (error) {
      console.log('err in load single user :', error);
    }
  }

  useEffect(() => {
    if (Router) {
      const id = parseInt(router.query.userId as string, 10)
      loadUser(id)
    }
  }, [Router.query.userId])

  console.log('router :', router.query.userId);
  console.log('data :', data);


  return (
    <div className='flex flex-col justify-center items-center w-[30%] h-[80%] rounded-md bg-blue-500 p-3 gap-4'>
      <h1>User Details</h1>
      <span>name: {data?.user?.firstName}</span>
      <span>family: {data?.user?.lastName}</span>
      <span>age: {data?.user?.age}</span>
      <span>job: {data?.user?.job}</span>
      <span>birthDate: {String(data?.user?.birthDate)}</span>
      <span>gender: {data?.user?.gender}</span>
      <span>isAdmin: {data?.user?.isAdmin ? 'yes' : 'no'}</span>
    </div>
  )
}

UserDetails.getLayout = (page) => <Layout>{page}</Layout>
export default UserDetails