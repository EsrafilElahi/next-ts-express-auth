import React, { useState, useEffect, Dispatch, ChangeEvent, } from 'react'
import Layout from 'components/Layout'
import { NextPageLayout } from '../_app'
import Link from 'next/link'
import { useRouter } from 'next/router'
import type { TUserLogin, TAuthSliceState } from 'types/reduxSlices/authSlice'
import { useAppDispatch, useAppSelector } from "utils/reduxTools";
import { loginUser } from 'redux/slices/authSlice'


type Props = {}

const Login: NextPageLayout = ({ }: Props) => {
  const [loginData, setLoginData] = useState<TUserLogin>({
    email: '',
    password: ''
  });

  const auth: TAuthSliceState = useAppSelector(state => state.authReducer);

  const dispatch = useAppDispatch();
  const router = useRouter();


  const handleAllInputs = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setLoginData({
      ...loginData,
      [name]: value
    } as TUserLogin)
  }

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    try {
      const res = await dispatch(loginUser(loginData)).unwrap();
      if (res) {
        router.push("/dashboard/");
        setLoginData({
          email: '',
          password: ''
        })
      }
    } catch (error) {
      // console.log('err login', error)
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

      <button className='btn-blue' onClick={(e) => handleLogin(e)}>login</button>

      <Link href="/auth/forget-password"><a className='link'>forget password</a></Link>
      {/* <Link href="/auth/reset-password"><a className='link'>reset password</a></Link> */}
      <span>Don’t have account ? <Link href="/auth/register"><a className='link'>Click here</a></Link></span>

    </div>
  )
}

Login.getLayout = (page) => <Layout title="login">{page}</Layout>
export default Login