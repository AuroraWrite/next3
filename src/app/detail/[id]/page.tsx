import React from 'react'
import Image from 'next/image'
import { getDetail, productsAction } from '@/actions/products'
import NotFound from './not-found'
import AddCard from '@/components/ui/AddCard'

export async function generateStaticParams() {
  const res = (await productsAction()).data
  return res.map((item) => ({
    id: String(item.id),
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const newParams = await params
  const res = (await getDetail(newParams.id)).data
  return {
    title: 'Store - ' + res.name,
    description: res.description,
  }
}

export default async function Detail({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const newParams = await params
  const res = (await getDetail(newParams.id)).data
  if (!res) {
    return <NotFound />
  }

  return (
    <div className="container flex py-6">
      <div className="w-64">
        <h2 className="font-sans text-3xl leading-10 font-bold my-8">
          {res.name}
        </h2>
        <p className="leading-10">{res.description}</p>
      </div>
      <div className="h-[500px] w-full max-w-md mx-auto bg-slate-50 p-4 rounded-lg shadow-md relative flex items-center justify-center">
        <Image
          src={res.image}
          alt={res.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
          style={{ objectFit: 'contain' }}
        />
      </div>
      <AddCard product={res} />
    </div>
  )
}
