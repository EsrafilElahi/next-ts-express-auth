import React, { useState, useEffect, ChangeEvent } from 'react'
import Layout from 'components/Layout'
import { useRouter } from 'next/router'
import type { NextPageLayout } from 'pages/_app'
import type { TUserRegister, TAuthSliceState } from 'types/reduxSlices/suthSlice'
import { useAppDispatch, useAppSelector } from "utils/reduxTools";
import { registerUser } from 'redux/slices/authSlice'


type Props = {}

const Register: NextPageLayout = (props: Props) => {

  const [registerData, setRegisterData] = useState<TUserRegister>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
    job: "",
    birthDate: "",
    age: "",
    gender: "male",
    isAdmin: false,
  })

  const auth: TAuthSliceState = useAppSelector(state => state.authReducer);


  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleAllInputs = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setRegisterData({ ...registerData, [name]: value })
  }

  const submit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    try {
      const res = await dispatch(registerUser(registerData)).unwrap();
      if (res) {
        router.push("/auth/login")
      }
    } catch (error) {
      // console.log('err in register user :', error)
    }
  }

  return (
    <div className='flex flex-col justify-start items-center w-[40%] h-[80%] rounded-md bg-blue-500 p-3 overflow-y-auto'>
      <div className='flex flex-col flex-1 justify-center items-center flex-wrap gap-7'>

        <div className='flex flex-col'>
          <label className='mb-1 ml-1' htmlFor='firstName'>firstName</label>
          <input className='input' name='firstName' value={registerData.firstName} onChange={(e) => handleAllInputs(e)} />
        </div>

        <div className='flex flex-col'>
          <label className='mb-1 ml-1' htmlFor='lastName'>lastName</label>
          <input className='input' name='lastName' value={registerData.lastName} onChange={(e) => handleAllInputs(e)} />
        </div>

        <div className='flex flex-col'>
          <label className='mb-1 ml-1' htmlFor="email">email</label>
          <input className='input' name="email" value={registerData.email} onChange={(e) => handleAllInputs(e)} />
        </div>

        <div className='flex flex-col'>
          <label className='mb-1 ml-1' htmlFor="password">password</label>
          <input className='input' name="password" value={registerData.password} onChange={(e) => handleAllInputs(e)} />
        </div>

        <div className='flex flex-col'>
          <label className='mb-1 ml-1' htmlFor="passwordConfirm">passwordConfirm</label>
          <input className='input' name="passwordConfirm" value={registerData.passwordConfirm} onChange={(e) => handleAllInputs(e)} />
        </div>

        <div className='flex flex-col'>
          <label className='mb-1 ml-1' htmlFor="job">job</label>
          <input className='input' name="job" value={registerData.job} onChange={(e) => handleAllInputs(e)} />
        </div>

        <div className='flex flex-col'>
          <label className='mb-1 ml-1' htmlFor="birthDate">birthDate</label>
          <input className='input' name="birthDate" value={registerData.birthDate} onChange={(e) => handleAllInputs(e)} />
        </div>

        <div className='flex flex-col'>
          <label className='mb-1 ml-1' htmlFor="age">age</label>
          <input className='input' name="age" value={registerData.age} onChange={(e) => handleAllInputs(e)} />
        </div>

        <div className='flex flex-col w-full'>
          <label className='mb-1 ml-1' htmlFor="gender">gender</label>
          <select className='input w-full' id="gender" name="gender" value={registerData.gender} onChange={(e) => setRegisterData({ ...registerData, gender: e.target.value })} >
            <option value="male">male</option>
            <option value="female">female</option>
          </select>
        </div>

        <div className='flex flex-col mb-10'>
          <label className='mb-1 ml-1' htmlFor="isAdmin">isAdmin</label>
          <input type="checkbox" name="isAdmin" checked={registerData.isAdmin} onChange={(e) => setRegisterData({ ...registerData, isAdmin: e.target.checked })} />
        </div>

      </div>
      <div className='flex-1 flex items-center'>
        <button className='btn-blue' onClick={(e) => submit(e)}>submit</button>
      </div>
    </div>
  )
}
Register.getLayout = (page) => <Layout title="register">{page}</Layout>
export default Register