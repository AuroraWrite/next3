import React from 'react'
import Link from 'next/link'
import { Separator } from '@/components/ui/separator'
import { Title, NavList } from '@/lib/constants'

export default async function Footer() {
  return (
    <div className="border-t mt-6 px-10">
      <div className="container py-32 flex justify-between">
        <h2 className="text-2xl">
          <Link href="/">{Title}</Link>
        </h2>
        <div className="flex gap-10">
          {NavList.map((item, i) => (
            <React.Fragment key={item.title}>
              {i !== 0 && <Separator orientation="vertical" />}
              <div>
                <span>{item.title}</span>
                <ul className="m-4 space-y-3">
                  {item.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}
