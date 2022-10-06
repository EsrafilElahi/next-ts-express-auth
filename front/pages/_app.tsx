import React, { ReactElement, ReactNode } from 'react'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import type { NextPage } from 'next'
import '../styles/globals.css'


export type NextPageLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

export type NextPropsLayout = AppProps & {
  Component: NextPageLayout
}


function MyApp({ Component, pageProps }: NextPropsLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)

  return getLayout(<Component {...pageProps} />)
}

export default MyApp
