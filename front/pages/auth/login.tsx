import React, { useState, useEffect, Dispatch, ChangeEvent, } from 'react'
import Layout from 'components/Layout'
import { NextPageLayout } from '../_app'
import Link from 'next/link'
import type { ILoginData } from 'types/types'

type Props = {}

const Login: NextPageLayout = ({ }: Props) => {
  const [loginData, setLoginData] = useState<ILoginData>({
    email: '',
    password: ''
  })

  const handleAllInputs = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setLoginData({
      ...loginData,
      [name]: value
    } as ILoginData)
  }

  const handleLogin = (): void => {
    try {
      console.log('submit login')
    } catch (error) {
      console.log('err login')
    }
  }

  return (
    <div className='flex flex-col justify-center items-center w-[30%] h-[80%] rounded-md bg-blue-500 p-3 gap-5'>
      <div className='flex flex-col'>
        <label className='mb-1 ml-1' htmlFor="email">email</label>
        <input className='input' name='email' type="email" value={loginData.email} onChange={(e) => handleAllInputs(e)} />
      </div>

      <div className='flex flex-col'>
        <label className='mb-1 ml-1' htmlFor="password">password</label>
        <input className='input' name='password' type="text" value={loginData.password} onChange={(e) => handleAllInputs(e)} />
      </div>

      <button className='btn-blue' onClick={handleLogin}>login</button>

      <Link href="/auth/forget-password"><a className='link'>forget password</a></Link>
      {/* <Link href="/auth/reset-password"><a className='link'>reset password</a></Link> */}
      <span>Don’t have account ? <Link href="/auth/register"><a className='link'>Click here</a></Link></span>

    </div>
  )
}

Login.getLayout = (page) => <Layout title="login">{page}</Layout>
export default Login