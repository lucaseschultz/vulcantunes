'use client'

import Link from 'next/link'
import {useWishList} from '@/src/app/lib/hooks'
import {WishListItemCard} from "@/src/app/ui/(overview)/wish-list/components/wish-list-item-card";
import {ProductsSkeleton} from "@/src/app/ui/(overview)/layout/components/skeletons";

export default function WishListContent() {
  const {products, isLoading} = useWishList()

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
          product={product}
        />
      ))}
    </div>
  )
}
