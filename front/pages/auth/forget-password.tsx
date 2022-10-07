import React, { useState, useEffect, Dispatch, ChangeEvent, } from 'react'
import Layout from '/components/Layout'
import { NextPageLayout } from '../_app'
import Link from 'next/link'

type Props = {}

const ForgetPassword: NextPageLayout = (props: Props) => {
  const [email, setEmail] = useState<string>('')

  return (
    <div className='flex flex-col justify-center items-center w-[30%] h-[80%] rounded-md bg-blue-500 p-3 gap-10'>
      <div className='flex flex-col'>
        <label className='mb-1 ml-1' htmlFor="email">email</label>
        <input
          className='input'
          name='email' type="email"
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>): void => setEmail(e.target.value)}
        />
      </div>

      <button className='btn-blue'>submit</button>
    </div>
  )
}

ForgetPassword.getLayout = (page) => <Layout title="forget password">{page}</Layout>
export default ForgetPassword