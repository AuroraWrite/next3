'use client'
import React, { memo, useState } from 'react'
import type { AddressType } from '@/types/global'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from '@/components/ui/table'
import { SelectGroup } from '@radix-ui/react-select'
import { useCartStore } from '@/store'
import Image from 'next/image'
import { Button } from '../ui/button'
import { toast } from 'sonner'

const page = memo(({ addressList }: { addressList: AddressType[] }) => {
  const { cartList } = useCartStore()
  const [selectAddress, setSelectAddress] = useState('')

  return (
    <>
      <div className="border-b py-4">
        <h2 className="text-lg leading-10 font-bold">Address</h2>
        {addressList.length === 0 ? (
          <div className="my-2">
            <p>Don't have any address yet</p>
            <div className="flex text-sm items-center underline text-orange-400">
              <Link href="/account">Add address</Link>
              <ArrowUpRight width={18} />
            </div>
          </div>
        ) : (
          <Select onValueChange={setSelectAddress}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a address" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Address</SelectLabel>
                {addressList.map((address) => (
                  <SelectItem key={address.id} value={address.id.toString()}>
                    <h3 className="font-bold m-2">{address.name}</h3>
                    <p className="mx-5">City: {address.city}</p>
                    <p className="mx-5">Address: {address.address}</p>
                    <p className="mx-5">Phone: {address.phone}</p>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      </div>

      <div className="border-b py-4">
        <h2 className="text-lg leading-10 font-bold">Cart</h2>
        {cartList.length === 0 ? (
          <div className="my-2">
            <p>No items in cart</p>
            <div className="flex text-sm items-center underline text-orange-400">
              <Link href="/">Shop now</Link>
              <ArrowUpRight width={18} />
            </div>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[400px]">Item</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cartList.map((cartItem, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <Image
                        src={cartItem.product.image}
                        alt={cartItem.product.name}
                        width={64}
                        height={64}
                        priority
                        style={{
                          width: '64px',
                          height: '64px',
                          objectFit: 'cover',
                        }}
                      />
                      <div className="ml-4 space-y-3">
                        <p className="text-sm font-medium">
                          {cartItem.product.name}
                        </p>
                        <p className="text-xs text-gray-400">
                          {cartItem.selectedVariant}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{cartItem.quantity}</TableCell>
                  <TableCell>${cartItem.product.price}</TableCell>
                  <TableCell className="text-right">
                    ${cartItem.product.price * cartItem.quantity}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell className="text-right">
                  $
                  {cartList
                    .reduce(
                      (acc, cartItem) =>
                        acc + cartItem.product.price * cartItem.quantity,
                      0
                    )
                    .toFixed(2)}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        )}
      </div>
      <div className="border-b py-4">
        <h2 className="text-lg leading-10 font-bold">Payment</h2>
        <p>In the process of functional construction ...</p>
      </div>
      <div className="mt-4">
        <Button
          disabled={!selectAddress || !cartList.length}
          onClick={() => {
            toast('没做订单', {
              style: { backgroundColor: '#d4edda', color: 'orange' },
            })
          }}
        >
          Cresate order
        </Button>
      </div>
    </>
  )
})

export default page
