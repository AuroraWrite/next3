import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="container flex items-start space-x-4 my-20">
      <div className="w-64 py-4 h-full">
        <Skeleton className="h-4 w-[150px]" />
        <Skeleton className="h-4 w-[250px]" />
      </div>
      <div className="flex-1 space-y-4">
        <Skeleton className="h-48 w-full rounded-md" />
      </div>

      <div className="w-80 space-y-4">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[250px]" />
      </div>
    </div>
  )
}
