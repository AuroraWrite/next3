import React from 'react'
import Acpt from '@/components/account/page'
import NotAccount from '@/components/account/notAccount'
import { isAuthLogin } from '@/actions/users'
import { getAddressAction } from '@/actions/address'
import type { JwtPayload } from 'jsonwebtoken'
import type { AddressType } from '@/types/global'

export default async function Account() {
  const res = await isAuthLogin()
  const addressList = await getAddressAction({ id: res?.data?.id as number })

  interface DataType extends JwtPayload {
    name: string
    email: string
  }

  return (
    <>
      {res.status === 200 && res.data ? (
        <Acpt
          data={res.data as DataType}
          addressList={addressList.data as AddressType[]}
        /> //已登录
      ) : (
        <NotAccount /> //未登录
      )}
    </>
  )
}
