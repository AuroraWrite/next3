'use server'
import db from '@/lib/db'

export const addAddressAction = async ({
  name,
  address,
  city,
  phone,
  id,
}: {
  name: string
  address: string
  city: string
  phone: number
  id: number
}) => {
  await db`INSERT INTO addresses (name, address, city, phone, userid) VALUES (${name}, ${address}, ${city}, ${phone}, ${id})`

  return { status: 200, message: 'Address added successfully' }
}

export const getAddressAction = async ({ id }: { id: number }) => {
  const res = await db`SELECT * FROM addresses WHERE userid = ${id}`
  return { status: 200, data: res }
}

export const removeAddressAction = async (id: number) => {
  await db`DELETE FROM addresses WHERE id = ${id}`
  return { status: 200, message: 'Address removed successfully' }
}

export const updateAddressAction = async ({
  id,
  name,
  address,
  city,
  phone,
}: {
  id: number
  name: string
  address: string
  city: string
  phone: number
}) => {
  await db`UPDATE addresses SET name = ${name}, address = ${address}, city = ${city}, phone = ${phone} WHERE id = ${id}`
  return { status: 200, message: 'Address updated successfully' }
}
