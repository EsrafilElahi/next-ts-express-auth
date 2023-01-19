import React, { useState, useEffect, ChangeEvent, } from 'react'
import Layout from 'components/Layout'
import { NextPageLayout } from '../_app'
import { useAppDispatch, useAppSelector } from "../../utils/reduxTools";
import { useRouter } from 'next/router';
import { resetPassword } from 'redux/slices/authSlice';


type Props = {}

interface IPasswords {
  pass: string | number,
  confirmPass: string | number
}

const ForgetPassword: NextPageLayout = (props: Props) => {

  const [passwords, setPasswords] = useState<IPasswords>({ pass: '', confirmPass: '' });

  const auth = useAppSelector(state => state.authReducer);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleResetPassword = async () => {
    try {
      const res = await dispatch(resetPassword(passwords))
      if (res) {
        alert(res.payload);
        setPasswords({ pass: '', confirmPass: '' });
        router.push("/dashboard/")
      }
    } catch (error) {
      console.log('err in reset pass :', error);
    }
  }

  const submitResetPass = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    try {
      await handleResetPassword()
    } catch (error) {

    }
  }


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
          name='confirmPass'
          value={passwords.confirmPass}
          onChange={(e: ChangeEvent<HTMLInputElement>): void => setPasswords({ ...passwords, [e.target.name]: e.target.value })}
        />
      </div>

      <button className='btn-blue mt-6' onClick={(e) => submitResetPass(e)}>submit</button>
    </div>
  )
}

ForgetPassword.getLayout = (page) => <Layout title="reset password">{page}</Layout>
export default ForgetPassword