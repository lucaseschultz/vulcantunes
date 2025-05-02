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
    async function fetchWishListProducts() {
      try {
        setIsLoading(true)

        // Get wish list models from localStorage
        const savedModelsNumbers = localStorage.getItem('wish-list')
        if (!savedModelsNumbers) {
          setProducts([])
          return
        }

        const wishListModelNumbers = JSON.parse(savedModelsNumbers) as string[]

        if (wishListModelNumbers.length === 0) {
          setProducts([])
          return
        }

        // Fetch all products
        const response = await fetch('/api/products')
        const allProducts = await response.json()

        // Filter products that are in the wish list
        const wishListProducts = allProducts.filter((product: Product) =>
          wishListModelNumbers.includes(product.product_model)
        )

        setProducts(wishListProducts)
      } catch (error) {
        console.error('Failed to fetch wish list products:', error)
        setProducts([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchWishListProducts()
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
