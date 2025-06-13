import React from 'react'
import CartCpt from '@/components/cart/page'
import { isAuthLogin } from '@/actions/users'

export default async function Cart() {
  const res = await isAuthLogin()
  return <CartCpt status={res.status} />
}
