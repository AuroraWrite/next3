import React from 'react'
import Sort from '@/components/sort/page'
import Products from '@/components/products/page'
import { productsAction } from '@/actions/products'
import { ProductsAction } from '@/types/global'

export default async function Page() {
  const res: ProductsAction = await productsAction()

  return (
    <div className="container flex py-6">
      <Sort />
      <Products data={res.data} />
    </div>
  )
}
