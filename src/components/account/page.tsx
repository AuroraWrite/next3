'use client'
import React, { memo } from 'react'
import type { JwtPayload } from 'jsonwebtoken'
import { Button } from '../ui/button'
import { signOutAction } from '@/actions/users'
import { useRouter } from 'next/router'
import { toast } from 'sonner'
import Address from '../address/page'
import type { AddressType } from '@/types/global'

interface DataType extends JwtPayload {
  name: string
  email: string
}

const Acpt = memo(
  ({ data, addressList }: { data: DataType; addressList: AddressType[] }) => {
    const handleClick = async () => {
      const res = await signOutAction()
      if (res.status === 200) {
        toast(res.message, {
          style: {
            backgroundColor: res.status === 200 ? '#d4edda' : '#f8d7da',
            color: res.status === 200 ? '#155724' : '#721c24',
          },
        })
        useRouter().push('/')
      }
    }

    return (
      <div className="container2 py-10">
        <div className="border-b py-4">
          <h2 className="text-lg leading-10 font-bold">Account</h2>
          <div className="flex justify-between items-center">
            <div>
              <p>Hello,{data.name}</p>
              <p>Signed in as {data.email}</p>
            </div>
            <Button onClick={handleClick} className="cursor-pointer">
              Sign out
            </Button>
          </div>
        </div>
        <div className="border-b py-4">
          <h2 className="text-lg leading-10 font-bold">Address</h2>
          <div className="flex justify-between items-center">
            <p>View and update your address,you can add as many as you want</p>
            <p>Save your address will make it easier for you to checkout</p>
          </div>

          <Address userid={data.id} addressList={addressList} />
        </div>

        <div className="py-4">
          <h2 className="text-lg leading-10 font-bold">Orders</h2>
          <div>
            <p>There is currently no order information available</p>
          </div>
        </div>
      </div>
    )
  }
)

export default Acpt
