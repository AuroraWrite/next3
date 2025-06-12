'use server'
import db from '@/lib/db'
import type { Product, ProductsAction, ProductAction } from '@/types/global'

export async function productsAction(): Promise<ProductsAction> {
  const res = (await db`SELECT * FROM products`) as Product[]
  return {
    status: 200,
    data: res,
  }
}

export async function getDetail(id: string): Promise<ProductAction> {
  const res = (await db`SELECT * FROM products WHERE id = ${id}`) as Product[]
  return {
    status: 200,
    data: res[0],
  }
}
