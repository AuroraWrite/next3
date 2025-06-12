'use client'

import { useRouter } from 'next/navigation'

export default function NotFound() {
  const router = useRouter()
  const handleClick = () => {
    router.back()
  }
  return (
    <div className="container flex justify-center items-center h-screen">
      <div className="mt-4">
        <h2 className="text-2xl font-bold">该商品不存在</h2>
        <br />
        <button onClick={handleClick} className="block text-5xl cursor-pointer">
          返回上一页
        </button>
      </div>
    </div>
  )
}
