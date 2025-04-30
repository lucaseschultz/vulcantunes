import {useState, useEffect} from 'react'
import {WishListItem} from './definitions'

const WISHLIST_KEY = 'wishlist'

export function useWishList() {
  const [items, setItems] = useState<WishListItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadWishlist = () => {
      try {
        const savedItems = localStorage.getItem('wishlist')
        if (savedItems) {
          setItems(JSON.parse(savedItems))
        }
      } catch (error) {
        console.error('Failed to load wish list:', error)
        setError('Failed to load your wish list. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    // Use setTimeout to avoid hydration issues with localStorage
    const timeoutId = setTimeout(loadWishlist, 0)
    return () => clearTimeout(timeoutId)
  }, [])

  const removeItem = (id: string) => {
    try {
      const updatedItems = items.filter(item => item.id !== id)
      setItems(updatedItems)
      localStorage.setItem('wishlist', JSON.stringify(updatedItems))
    } catch (error) {
      console.error('Failed to update wish list:', error)
      setError('Failed to update your wish list. Please try again.')
    }
  }

  return {
    items,
    isLoading,
    error,
    removeItem,
    setError
  }
}
