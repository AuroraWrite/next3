import React from 'react'
import CheckoutCpt from '@/components/checkoutCpt/page'
import { isAuthLogin } from '@/actions/users'
import { redirect } from 'next/navigation'
import { getAddressAction } from '@/actions/address'
import type { JwtPayload } from 'jsonwebtoken'
import type { AddressType } from '@/types/global'

interface UserInfo extends JwtPayload {
  id: number
}

export default async function CheckOut() {
  const res = await isAuthLogin()
  if (res.status !== 200) {
    redirect('/account')
  }

  const userData = res.data as UserInfo

  const address = await getAddressAction({ id: userData.id })

  return (
    <div className="container2">
      <CheckoutCpt addressList={address.data as AddressType[]} />
    </div>
  )
}
