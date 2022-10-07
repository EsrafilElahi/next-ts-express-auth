import React, { useState, useEffect, Dispatch, ChangeEvent, } from 'react'
import Layout from '/components/Layout'
import { NextPageLayout } from '../_app'
import Link from 'next/link'

type Props = {}

const ResetPassword: NextPageLayout = (props: Props) => {
  return (
    <div>ResetPassword</div>
  )
}

ResetPassword.getLayout = (page) => <Layout title="reset-password">{page}</Layout>
export default ResetPassword