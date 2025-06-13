'use client'
import React, { memo, useState } from 'react'
import Login from '@/components/Login/page'
import Register from '@/components/Login/register'
import { NotAccountType } from '@/types/global'

const NotAccount = memo(() => {
  const [notAccount, setNotAccount] = useState<NotAccountType>('login')
  return (
    <>
      {notAccount === 'login' ? (
        <Login setNotAccount={setNotAccount} />
      ) : (
        <Register setNotAccount={setNotAccount} />
      )}
    </>
  )
})

export default NotAccount
