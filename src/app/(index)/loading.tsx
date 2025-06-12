import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="container flex items-start space-x-4 my-20">
      <div className="w-64 py-4 h-full">
        <Skeleton className="h-4 w-[150px]" />
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
      <div className="flex-1 space-y-4">
        <Skeleton className="h-4 w-[150px]" />
        <div className="grid grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton className="h-100 rounded-md" key={index} />
          ))}
        </div>
      </div>
    </div>
  )
}
