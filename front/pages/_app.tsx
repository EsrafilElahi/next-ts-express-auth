import React, {ReactElement, ReactNode} from 'react'
import type { AppProps } from 'next/app'
import type { NextPage } from 'next'
import '../styles/globals.css'

type NextPageWithLayout = NextPage & {
  getLayout: (page: ReactElement) => ReactNode
}
type NextPropsWithLayout = AppProps & {
  pageProps: NextPageWithLayout
}

function MyApp({ Component, pageProps }: NextPropsWithLayout) {
  return <Component {...pageProps} />
}

export default MyApp
