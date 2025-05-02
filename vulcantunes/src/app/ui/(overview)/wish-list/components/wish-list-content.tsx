'use client'

import Link from 'next/link'
import {useState, useEffect} from 'react'
import {Product} from '@/src/app/lib/definitions'
import {WishListItemCard} from "@/src/app/ui/(overview)/wish-list/components/wish-list-item-card"
import {ProductsSkeleton} from "@/src/app/ui/(overview)/layout/components/skeletons"

export default function WishListContent() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchWishlistProducts() {
      try {
        setIsLoading(true)

        // Get wishlist models from localStorage
        const savedModels = localStorage.getItem('wishlist')
        if (!savedModels) {
          setProducts([])
          return
        }

        const wishlistModels = JSON.parse(savedModels) as string[]

        if (wishlistModels.length === 0) {
          setProducts([])
          return
        }

        // Fetch all products
        const response = await fetch('/api/products')
        const allProducts = await response.json()

        // Filter products that are in the wishlist
        const wishlistProducts = allProducts.filter((product: Product) =>
          wishlistModels.includes(product.product_model)
        )

        setProducts(wishlistProducts)
      } catch (error) {
        console.error('Failed to fetch wishlist products:', error)
        setProducts([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchWishlistProducts()
  }, [])

  if (isLoading) {
    return <ProductsSkeleton/>
  }

  if (products.length === 0) {
    return (
      <div className="wish-list-empty">
        <p>Your wish list is empty</p>
        <Link
          href="/"
          className="product-details-button"
        >
          Browse Products
        </Link>
      </div>
    )
  }

  return (
    <div className="products-list" aria-label="Wish list items">
      {products.map(product => (
        <WishListItemCard
          key={product.product_model}
          product={product}
        />
      ))}
    </div>
  )
}
