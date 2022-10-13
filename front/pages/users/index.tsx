import React, { useState, useEffect } from 'react'
import Layout from '/components/Layout'
import type { NextPageLayout } from 'pages/_app'

type Props = {}

const Users: NextPageLayout = (props: Props) => {
  return (
    <div className='flex flex-col justify-start items-center w-[30%] h-[80%] rounded-md bg-blue-500 p-3 gap-4'>
      <h1 className='my-3'>Users List</h1>

      <div className=''>
        <span>1 - <strong>name : </strong>esrafil elahi <strong>email : </strong>esrafil.elahi@gmail.com</span>
      </div>
      <div>
        <span>2 - <strong>name : </strong>esrafil elahi <strong>email : </strong>esrafil.elahi@gmail.com</span>
      </div>

      <div>
        <span>3 - <strong>name : </strong>esrafil elahi <strong>email : </strong>esrafil.elahi@gmail.com</span>
      </div>

      <div>
        <span>4 - <strong>name : </strong>esrafil elahi <strong>email : </strong>esrafil.elahi@gmail.com</span>
      </div>

      <div>
        <span>5 - <strong>name : </strong>esrafil elahi <strong>email : </strong>esrafil.elahi@gmail.com</span>
      </div>

    </div>
  )
}

Users.getLayout = (page) => <Layout title="users list">{page}</Layout>
export default Users