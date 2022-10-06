import React, { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

function Layout({ children }: Props) {
  return (
    <div className='w-screen h-screen flex justify-center items-center bg-blue-400'>
      {children}
    </div>
  )
}

export default Layout