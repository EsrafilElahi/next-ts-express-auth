import React, { useState, useEffect, ChangeEvent } from 'react'
import Layout from '/components/Layout'
import type { NextPageLayout } from 'pages/_app'
import Router from 'next/router'
import type { IRegisterData } from '/types/types'

type Props = {}

const Register: NextPageLayout = (props: Props) => {
  const [registerData, setRegisterData] = useState<IRegisterData>({
    name: '',
    family: '',
    job: '',
    birthData: '',
    age: '',
    gender: '',
  })

  const handleAllInputs = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setRegisterData({ ...registerData, [name]: value })
  }

  console.log(registerData)

  return (
    <div className='flex flex-col justify-start items-center w-[40%] h-[80%] rounded-md bg-blue-500 p-3'>
      <div className='flex flex-1 justify-center flex-wrap gap-7'>

        <div className='flex flex-col'>
          <label className='mb-1 ml-1' htmlFor='name'>name</label>
          <input className='input' name='name' value={registerData.name} onChange={(e) => handleAllInputs(e)} />
        </div>

        <div className='flex flex-col'>
          <label className='mb-1 ml-1' htmlFor='family'>family</label>
          <input className='input' name='family' value={registerData.family} onChange={(e) => handleAllInputs(e)} />
        </div>

        <div className='flex flex-col'>
          <label className='mb-1 ml-1' htmlFor="job">job</label>
          <input className='input' name="job" value={registerData.job} onChange={(e) => handleAllInputs(e)} />
        </div>

        <div className='flex flex-col'>
          <label className='mb-1 ml-1' htmlFor="birthData">birthData</label>
          <input className='input' name="birthData" value={registerData.birthData} onChange={(e) => handleAllInputs(e)} />
        </div>

        <div className='flex flex-col'>
          <label className='mb-1 ml-1' htmlFor="age">age</label>
          <input className='input' name="age" value={registerData.age} onChange={(e) => handleAllInputs(e)} />
        </div>

        <div className='flex flex-col'>
          <label className='mb-1 ml-1' htmlFor="gender">gender</label>
          <input className='input' name="gender" value={registerData.gender} onChange={(e) => handleAllInputs(e)} />
        </div>

      </div>
      <div className='flex-1 flex items-center'>
        <button className='btn-blue'>submit</button>
      </div>
    </div>
  )
}
Register.getLayout = (page) => <Layout title="register">{page}</Layout>
export default Register