import React, { useState, useEffect } from 'react'
import Layout from 'components/Layout'
import type { NextPageLayout } from 'pages/_app'
import { useAppDispatch, useAppSelector } from "../../utils/reduxTools";
import { getUsers } from 'redux/slices/usersSlice';
import { TUser } from 'types/reduxSlices/usersSlice';


type Props = {}

const Users: NextPageLayout = (props: Props) => {

  const users = useAppSelector(state => state.usersReducer.users);
  const dispatch = useAppDispatch();

  const loadUsers = async () => {
    try {
      const res = await dispatch(getUsers()).unwrap();
      return res
    } catch (error) {
      console.log('err in load users :', error);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [])

  console.log('userslist in users page :', users)


  return (
    <div className='flex flex-col justify-start items-center w-[30%] h-[80%] rounded-md bg-blue-500 p-3 gap-4'>
      <h1 className='w-full text-center bg-slate-400 my-2 py-2'>Users List</h1>

      <div className='w-full grow flex flex-col justify-start items-center gap-3 bg-slate-400 overflow-auto py-3'>

        {/* {
          users?.map((user: TUser) => {
            <div className='w-full px-3 cursor-pointer'>
              <span>1 : <br /> <strong>name : </strong>{user.firstName}<br /> <strong>email : </strong>{user.email}</span>
            </div>
          })
        } */}


      </div>

      <div className='w-full flex justify-center gap-4'>
        <span className='border border-slate-400 rounded-md px-3 py-1 cursor-pointer hover:border-slate-500 hover:text-slate-800'>before</span>
        <span className='border border-slate-400 rounded-md px-3 py-1 cursor-pointer hover:border-slate-500 hover:text-slate-800'>after</span>
      </div>
    </div>
  )
}

Users.getLayout = (page) => <Layout title="users list">{page}</Layout>
export default Users