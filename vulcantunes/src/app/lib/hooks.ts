import {useState, useEffect, useCallback} from 'react'
import {WishListItem} from './definitions'

const WISHLIST_KEY = 'wishlist'

export function useWishList() {
  const [items, setItems] = useState<WishListItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load wishlist from localStorage
  useEffect(() => {
    const loadWishlist = () => {
      try {
        const savedItems = localStorage.getItem(WISHLIST_KEY)
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

  // Save wishlist to localStorage
  const saveWishlist = useCallback((updatedItems: WishListItem[]) => {
    try {
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(updatedItems))
      return true
    } catch (error) {
      console.error('Failed to save wish list:', error)
      setError('Failed to save your wish list. Please try again.')
      return false
    }
  }, [])

  // Add item to wishlist
  const addItem = useCallback((item: WishListItem) => {
    try {
      // Prevent duplicates
      if (items.some(existingItem => existingItem.id === item.id)) {
        return false
      }

      const updatedItems = [...items, item]
      setItems(updatedItems)
      return saveWishlist(updatedItems)
    } catch (error) {
      console.error('Failed to add item to wish list:', error)
      setError('Failed to update your wish list. Please try again.')
      return false
    }
  }, [items, saveWishlist])

  // Remove item from wishlist
  const removeItem = useCallback((id: string) => {
    try {
      const updatedItems = items.filter(item => item.id !== id)
      setItems(updatedItems)
      return saveWishlist(updatedItems)
    } catch (error) {
      console.error('Failed to update wish list:', error)
      setError('Failed to update your wish list. Please try again.')
      return false
    }
  }, [items, saveWishlist])

  // Clear error message
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return {
    items,
    isLoading,
    error,
    addItem,
    removeItem,
    clearError,
    setError
  }
}
