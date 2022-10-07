import React, { useState, useEffect, Dispatch, ChangeEvent, } from 'react'
import Layout from '/components/Layout'
import { NextPageLayout } from '../_app'
import Link from 'next/link'

type Props = {}
interface IPasswords {
  pass: string,
  confirmPass: string
}

const ForgetPassword: NextPageLayout = (props: Props) => {
  const [passwords, setPasswords] = useState<IPasswords>({ pass: '', confirmPass: '' })

  return (
    <div className='flex flex-col justify-center items-center w-[30%] h-[80%] rounded-md bg-blue-500 p-3 gap-2'>
      <div className='flex flex-col'>
        <label className='mb-1 ml-1' htmlFor="email">password</label>
        <input
          className='input'
          name='pass'
          value={passwords.pass}
          onChange={(e: ChangeEvent<HTMLInputElement>): void => setPasswords({ ...passwords, [e.target.name]: e.target.value })}
        />
      </div>
      <div className='flex flex-col'>
        <label className='mb-1 ml-1' htmlFor="email">confirm password</label>
        <input
          className='input'
          name='cofirmPass'
          value={passwords.confirmPass}
          onChange={(e: ChangeEvent<HTMLInputElement>): void => setPasswords({ ...passwords, [e.target.name]: e.target.value })}
        />
      </div>

      <button className='btn-blue mt-6'>submit</button>
    </div>
  )
}

ForgetPassword.getLayout = (page) => <Layout title="reset password">{page}</Layout>
export default ForgetPassword