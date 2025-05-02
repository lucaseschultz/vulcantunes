'use client'

import {useState, useEffect} from 'react'
import {Heart} from "@phosphor-icons/react"
import {WishListProps} from '@/src/app/lib/definitions'
import {useNotification} from '@/src/app/ui/layout/components/notification-context'
import {usePathname} from 'next/navigation'

export default function WishListButton({product_model}: WishListProps) {
  const [isInWishList, setIsInWishList] = useState(false)
  const {setShowWishListNotification} = useNotification()
  const pathname = usePathname()

  useEffect(() => {
    // Check if product is already in wish list
    try {
      const savedProducts = localStorage.getItem('wish-list')
      if (savedProducts) {
        const wishList = JSON.parse(savedProducts)
        setIsInWishList(wishList.includes(product_model))
      }
    } catch (error) {
      console.error('Failed to check wish list status:', error)
    }
  }, [product_model])

  const toggleWishList = () => {
    try {
      const savedProducts = localStorage.getItem('wish-list')
      let wishList = savedProducts ? JSON.parse(savedProducts) : []

      if (isInWishList) {
        wishList = wishList.filter((model: string) => model !== product_model)
      } else {
        wishList.push(product_model)

        if (pathname === '/') {
          setShowWishListNotification(true)
          setTimeout(() => {
            setShowWishListNotification(false)
          }, 3000)
        }
      }

      localStorage.setItem('wish-list', JSON.stringify(wishList))
      setIsInWishList(!isInWishList)
    } catch (error) {
      console.error('Failed to update wish list:', error)
    }
  }

  return (
    <button
      className={`wish-list-button ${isInWishList ? 'in-wish-list' : ''}`}
      onClick={toggleWishList}
      aria-label={isInWishList ? "Remove from wish list" : "Add to wish list"}
    >
      <Heart
        weight={isInWishList ? "fill" : "regular"}
        className="heart-icon"
        size={24}
      />
    </button>
  )
}
