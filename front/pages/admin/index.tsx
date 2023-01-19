import React, { useState, useEffect } from 'react'
import Layout from 'components/Layout'
import type { NextPageLayout } from 'pages/_app'
import { useAppDispatch, useAppSelector } from "../../utils/reduxTools";
import { TUser, TDataUsers } from 'types/reduxSlices/usersSlice';


const AdminPage: NextPageLayout = () => {
  const data: TDataUsers = useAppSelector(state => state.usersReducer.users);
  const dispatch = useAppDispatch();


  return (
    <div className='flex flex-col justify-center items-center w-[30%] h-[80%] rounded-md bg-blue-500 p-3 gap-4'>
      <h1 className='mb-10'>dashboard page</h1>
      <span>name: {auth?.me?.firstName}</span>
      <span>family: {auth?.me?.lastName}</span>
      <span>age: {auth?.me?.age}</span>
      <span>job: {auth?.me?.job}</span>
      <span>birth date: {auth?.me?.birthDate}</span>
      <span>gender: {auth?.me?.gender}</span>
      <span>isAdmin: {auth?.me?.isAdmin ? 'yes' : 'no'}</span>
    </div>
  )
}

AdminPage.getLayout = (page) => <Layout>{page}</Layout>
export default AdminPage