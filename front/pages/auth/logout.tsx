import React, { useState, useEffect } from 'react'
import Layout from '/components/Layout'
import type { NextPageLayout } from 'pages/_app'
import Router from 'next/router'

type Props = {}

const logout: NextPageLayout = ({ }: Props) => {

  console.log(Router)


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

logout.getLayout = (page) => <Layout>{page}</Layout>
export default logout