import React, { useState, useEffect, Dispatch, ChangeEvent, } from 'react'
import Layout from '/components/Layout'
import { NextPageLayout } from '../_app'
import Link from 'next/link'

type Props = {}
interface ILoginData {
  email: string,
  password: string
}


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
        <label className='mb-2' htmlFor="email">email</label>
        <input className='input' name='email' type="email" value={loginData.email} onChange={(e) => handleAllInputs(e)} />
      </div>

      <div className='flex flex-col'>
        <label className='mb-2' htmlFor="password">password</label>
        <input className='input' name='password' type="text" value={loginData.password} onChange={(e) => handleAllInputs(e)} />
      </div>

      <button className='btn-blue' onClick={handleLogin}>login</button>

      <Link href=""><a className='link'>forget password</a></Link>
      <span>Don’t have account ? <Link href=""><a className='link'>Click here</a></Link></span>

    </div>
  )
}

Login.getLayout = (page) => <Layout>{page}</Layout>
export default Login