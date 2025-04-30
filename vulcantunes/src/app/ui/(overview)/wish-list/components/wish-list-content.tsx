'use client'

import Link from 'next/link'
import {useWishList} from '@/src/app/lib/hooks'
import {WishListItemCard} from "@/src/app/ui/(overview)/wish-list/components/wish-list-item-card";

export default function WishListContent() {
  const {items, isLoading, error, removeItem, setError} = useWishList()

  if (isLoading) {
    return (
      <div className="wish-list-loading">
        <div className="loading-text">Loading your wish list...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="wish-list-error">
        <p>{error}</p>
        <button
          onClick={() => setError(null)}
          className="dismiss-button"
        >
          Dismiss
        </button>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="wish-list-empty">
        <p className="empty-message">Your wish list is empty</p>
        <Link
          href="/"
          className="browse-button"
        >
          Browse Products
        </Link>
      </div>
    )
  }

  return (
    <div className="wish-list-container" aria-label="Wish list items">
      {items.map(item => (
        <WishListItemCard
          key={item.id}
          item={item}
          onRemove={removeItem}
        />
      ))}
    </div>
  )
}
