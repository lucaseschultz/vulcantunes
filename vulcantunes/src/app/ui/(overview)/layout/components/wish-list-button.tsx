'use client'

import {useState, useEffect} from 'react'
import {Heart} from "@phosphor-icons/react"
import {ProductItemProps} from '@/src/app/lib/definitions';

export default function WishListButton({product}: ProductItemProps) {
  const {
    product_model
  } = product;

  const [isInWishList, setIsInWishList] = useState(false)

  useEffect(() => {
    // Check if product is already in wish list
    try {
      const savedProducts = localStorage.getItem('wishlist')
      if (savedProducts) {
        const wishlist = JSON.parse(savedProducts)
        setIsInWishList(wishlist.some((savedProduct: any) => savedProduct.model === product_model))
      }
    } catch (error) {
      console.error('Failed to check wish list status:', error)
    }
  }, [product_model])

  const toggleWishList = () => {
    try {
      const savedProducts = localStorage.getItem('wishlist')
      let wishlist = savedProducts ? JSON.parse(savedProducts) : []

      if (isInWishList) {
        wishlist = wishlist.filter((savedProduct: any) => savedProduct.model !== product_model)
      } else {
        wishlist.push(product)
      }

      localStorage.setItem('wishlist', JSON.stringify(wishlist))
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
