'use client'
import React, { memo, useEffect, useRef, useState } from 'react'
import { Product } from '@/types/global'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Button } from '@/components/ui/button'
import { Alert, AlertTitle } from '@/components/ui/alert'
import { useCartStore } from '@/store'

const AddCard = memo(({ product }: { product: Product }) => {
  const [value, setValue] = useState<string>('')
  const { addToCart, isItemInCart, updateQuantity, cartList } = useCartStore()
  const [msg, setMsg] = useState<string>('')

  const handleValueChange = (value: string) => {
    setValue(value)
  }

  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const handleAddToCart = () => {
    if (!value) {
      setMsg('需要先选择商品类型才能加入购物车')
      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => {
        setMsg('')
      }, 2000)
      return
    }

    const index = isItemInCart(product.name, value)
    if (index !== -1) {
      updateQuantity(index, cartList[index].quantity + 1)
    } else {
      addToCart({ product, quantity: 1, selectedVariant: value })
    }
    setMsg('添加成功')
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      setMsg('')
    }, 2000)
  }

  // 组件卸载时清理定时器
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  return (
    <div className="w-80 py-12">
      <h3>{product.name}</h3>
      <ToggleGroup
        className="flex justify-start py-6 border-b mb-6"
        variant="outline"
        type="single"
        onValueChange={handleValueChange}
      >
        {product.variant.map((item, i) => (
          <ToggleGroupItem
            key={i}
            value={item}
            className="cursor-pointer bg-slate-50 px-4 mr-3"
          >
            {item}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      <h3>Price</h3>
      <p className="text-2xl font-bold text-red-400 mb-6">{product.price}</p>

      <Button
        variant="outline"
        className="cursor-pointer"
        onClick={handleAddToCart}
      >
        Add to Cart
      </Button>

      {msg && (
        <Alert className="absolute top-15 right-1/2 translate-x-1/2 w-64">
          <AlertTitle className="text-orange-400 text-center">{msg}</AlertTitle>
        </Alert>
      )}
    </div>
  )
})

export default AddCard
