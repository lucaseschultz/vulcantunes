'use client'

import {useState, useEffect} from 'react'
import Link from 'next/link'
import Image from 'next/image'

// ##Move to definitions
interface WishListItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
}

export default function WishListContent() {
  const [wishListItems, setWishListItems] = useState<WishListItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load wish list items from localStorage
    const loadWishList = () => {
      try {
        const savedItems = localStorage.getItem('wishlist')
        if (savedItems) {
          setWishListItems(JSON.parse(savedItems))
        }
      } catch (error) {
        console.error('Failed to load wish list:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadWishList()
  }, [])

  const removeFromWishList = (id: string) => {
    const updatedItems = wishListItems.filter(item => item.id !== id)
    setWishListItems(updatedItems)

    // Update localStorage
    try {
      localStorage.setItem('wishlist', JSON.stringify(updatedItems))
    } catch (error) {
      console.error('Failed to update wish list:', error)
    }
  }

  if (isLoading) {
    return <div className="wish-list-loading">Loading your wish list...</div>
  }

  if (wishListItems.length === 0) {
    return (
      <div className="wish-list-empty">
        <p>Your wish list is empty</p>
        <Link href="/" className="browse-products-link">
          Browse Products
        </Link>
      </div>
    )
  }

  return (
    <div className="wish-list-items">
      {wishListItems.map(item => (
        <div key={item.id} className="wish-list-item">
          <div className="wish-list-item-image">
            <Image
              src={item.imageUrl}
              alt={item.name}
              width={150}
              height={150}
            />
          </div>
          <div className="wish-list-item-details">
            <h2>{item.name}</h2>
            <p className="wish-list-item-price">${item.price.toFixed(2)}</p>
            <p className="wish-list-item-description">{item.description}</p>
            <div className="wish-list-item-actions">
              <button
                className="remove-button"
                onClick={() => removeFromWishList(item.id)}
              >
                Remove
              </button>
              <Link href={`/product/${item.id}`} className="view-details-link">
                View Details
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
