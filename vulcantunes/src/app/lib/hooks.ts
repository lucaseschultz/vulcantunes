import {useState, useEffect, useCallback} from 'react'
import {Product} from './definitions'

const WISHLIST_KEY = 'wishlist'

export function useWishList() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load wishlist from localStorage
  useEffect(() => {
    const loadWishlist = () => {
      try {
        const savedProducts = localStorage.getItem(WISHLIST_KEY)
        if (savedProducts) {
          setProducts(JSON.parse(savedProducts))
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
  const saveWishlist = useCallback((updatedProducts: Product[]) => {
    try {
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(updatedProducts))
      return true
    } catch (error) {
      console.error('Failed to save wish list:', error)
      setError('Failed to save your wish list. Please try again.')
      return false
    }
  }, [])

  // Add product to wishlist
  const addProduct = useCallback((product: Product) => {
    try {
      // Prevent duplicates
      if (products.some(existingProduct => existingProduct.product_model === product.product_model)) {
        return false
      }

      const updatedProducts = [...products, product]
      setProducts(updatedProducts)
      return saveWishlist(updatedProducts)
    } catch (error) {
      console.error('Failed to add product to wish list:', error)
      setError('Failed to update your wish list. Please try again.')
      return false
    }
  }, [products, saveWishlist])

  // Remove product from wishlist
  const removeProduct = useCallback((model: string) => {
    try {
      const updatedProducts = products.filter(product => product.product_model !== model)
      setProducts(updatedProducts)
      return saveWishlist(updatedProducts)
    } catch (error) {
      console.error('Failed to update wish list:', error)
      setError('Failed to update your wish list. Please try again.')
      return false
    }
  }, [products, saveWishlist])

  // Clear error message
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return {
    products: products,
    isLoading,
    error,
    addProduct: addProduct,
    removeProduct: removeProduct,
    clearError,
    setError
  }
}
