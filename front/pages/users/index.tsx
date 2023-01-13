import React, { useState, useEffect } from 'react'
import Layout from 'components/Layout'
import type { NextPageLayout } from 'pages/_app'

type Props = {}

const Users: NextPageLayout = (props: Props) => {
  return (
    <div className='flex flex-col justify-start items-center w-[30%] h-[80%] rounded-md bg-blue-500 p-3 gap-4'>
      <h1 className='w-full text-center bg-slate-400 my-2'>Users List</h1>

      <div className='w-full grow flex flex-col justify-start items-center gap-3 bg-slate-400 overflow-auto py-3'>
        <div className='w-full px-3 cursor-pointer'>
          <span>1 : <br /> <strong>name : </strong>esrafil elahi <br /> <strong>email : </strong>esrafil.elahi@gmail.com</span>
        </div>
        <div className='w-full px-3 cursor-pointer'>
          <span>2 : <br /> <strong>name : </strong>esrafil elahi <br /> <strong>email : </strong>esrafil.elahi@gmail.com</span>
        </div>

        <div className='w-full px-3 cursor-pointer'>
          <span>3 : <br /> <strong>name : </strong>esrafil elahi <br /> <strong>email : </strong>esrafil.elahi@gmail.com</span>
        </div>

        <div className='w-full px-3 cursor-pointer'>
          <span>4 : <br /> <strong>name : </strong>esrafil elahi <br /> <strong>email : </strong>esrafil.elahi@gmail.com</span>
        </div>

        <div className='w-full px-3 cursor-pointer'>
          <span>5 : <br /> <strong>name : </strong>esrafil elahi <br /> <strong>email : </strong>esrafil.elahi@gmail.com</span>
        </div>
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