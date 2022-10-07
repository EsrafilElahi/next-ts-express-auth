import React, { useState, useEffect } from 'react'
import Layout from '/components/Layout'
import type { NextPageLayout } from 'pages/_app'

type Props = {}

const Dashboard: NextPageLayout = (props: Props) => {
  return (
    <div className='flex flex-col justify-center items-center w-[30%] h-[80%] rounded-md bg-blue-500 p-3 gap-4'>
      <span>name: esrafil</span>
      <span>family: elahi</span>
      <span>age: 25</span>
      <span>job: developer</span>
      <span>birth date: 1996-12-18</span>
      <span>gender: male</span>
    </div>
  )
}

Dashboard.getLayout = (page) => <Layout>{page}</Layout>
export default Dashboard
