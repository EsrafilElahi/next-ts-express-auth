import React, { useState, useEffect } from 'react'
import Layout from 'components/Layout'
import type { NextPageLayout } from 'pages/_app'
import { useAppDispatch, useAppSelector } from "../../utils/reduxTools";
import { useRouter } from 'next/router';
import { getUsers } from 'redux/slices/usersSlice';
import { TUser, TDataUsers } from 'types/reduxSlices/usersSlice';


type Props = {}

const Users: NextPageLayout = (props: Props) => {

  const [page, setPage] = useState(1);
  const data: TDataUsers = useAppSelector(state => state.usersReducer.users);
  const { users } = data
  const dispatch = useAppDispatch();
  const router = useRouter();

  const loadUsers = async () => {
    try {
      const res = await dispatch(getUsers({ page: page })).unwrap();
      return res
    } catch (error) {
      console.log('err in load users :', error);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [page])

  console.log('userslist in data page :', data.users);
  console.log('page :', page);

  const handlePrevious = () => {
    if (page >= 2) {
      setPage(prev => prev - 1)
    } else {
      return;
    }
  }

  const handleNext = () => {
    if (page < data.totalPages) {
      setPage(prev => prev + 1)
    } else {
      return;
    }
  }


  return (
    <div className='flex flex-col justify-start items-center w-[30%] h-[80%] rounded-md bg-blue-500 p-3 gap-4'>
      <h1 className='w-full text-center bg-slate-400 my-2 py-2'>Users List</h1>

      <div className='w-full grow flex flex-col justify-start items-center gap-3 bg-slate-400 overflow-auto py-3'>

        {
          users.map((user: TUser, ind: number) => (
            <div
              onClick={() => router.push(`/users/${user._id}`, undefined, { shallow: true })}
              key={user.email}
              className="flex flex-col justify-start items-start w-[90%] border border-solid p-3 rounded-md cursor-pointer hover:border-blue-500">
              <span className='mb-2'>{++ind}</span>
              <span>name: {user.firstName}</span>
              <span>email: {user.email}</span>
            </div>
          ))
        }

      </div>

      <div className='w-full flex justify-center gap-4'>
        <button
          className={`
          border border-slate-400
          rounded-md px-3 py-1 cursor-pointer
          hover:border-slate-500
          hover:text-slate-800
          ${page === 1 && 'text-red-600 cursor-auto hover:border-slate-400 hover:text-red-600'}
           `}
          onClick={() => handlePrevious()}
        >
          prev
        </button>
        <button
          className={`
          border border-slate-400 
          rounded-md px-3 py-1 cursor-pointer
          hover:border-slate-500 
          hover:text-slate-800
          ${page >= data.totalPages && 'text-red-600 cursor-auto hover:border-slate-400 hover:text-red-600'}
          `}
          onClick={() => handleNext()}
        >
          next
        </button>
      </div>
    </div>
  )
}

Users.getLayout = (page) => <Layout title="users list">{page}</Layout>
export default Users