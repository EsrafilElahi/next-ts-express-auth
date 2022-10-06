import React, { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

function Layout({ children }: Props) {
  return (
    <div className='w-full h-full bg-blue-400'>
      {children}
    </div>
  )
}

export default Layout