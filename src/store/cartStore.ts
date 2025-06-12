import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { CartItem } from '@/types/global'

// quantity 所存数量
type CartState = {
  cartList: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (index: number) => void
  isItemInCart: (name: string, selectedVariant: string) => number
  updateQuantity: (index: number, quantity: number) => void
}

const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cartList: [],

      addToCart: (item: CartItem) => {
        set((state) => ({
          cartList: [...state.cartList, item],
        }))
      },

      removeFromCart: (index: number) => {
        set((state) => {
          const newCartList = [...state.cartList]
          newCartList.splice(index, 1)
          return { cartList: newCartList }
        })
      },

      isItemInCart: (name: string, selectedVariant: string) => {
        return get().cartList.findIndex(
          (item) =>
            item.product.name === name &&
            item.selectedVariant === selectedVariant
        )
      },

      updateQuantity: (index: number, quantity: number) => {
        set((state) => {
          const newList = [...state.cartList]
          newList[index].quantity = quantity
          return { cartList: newList }
        })
      },
    }),
    {
      name: 'cart-storage',
      storage:
        typeof window !== 'undefined'
          ? createJSONStorage(() => localStorage)
          : undefined,
    }
  )
)

export default useCartStore
