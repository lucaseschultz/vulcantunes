import type { ProductState, ProductAction } from '../lib/definitions'
import { PRODUCTS } from '@/src/app/constants/products'

export const initialState = {
  searchInput: '',
  selectedFeatures: new Set<string>(),
  filteredProducts: PRODUCTS
} satisfies ProductState

export function productsReducer(state: ProductState, action: ProductAction): ProductState {
  switch (action.type) {
    case 'SET_SEARCH':
      return {
        ...state,
        searchInput: action.payload,
        filteredProducts: filterProducts(action.payload, state.selectedFeatures)
      }
    case 'TOGGLE_FEATURE':
      { const newFeatures = new Set(state.selectedFeatures)
      newFeatures.has(action.payload)
        ? newFeatures.delete(action.payload)
        : newFeatures.add(action.payload)
      return {
        ...state,
        selectedFeatures: newFeatures,
        filteredProducts: filterProducts(state.searchInput, newFeatures)
      } }
    default:
      return state
  }
}

function filterProducts(searchTerm: string, features: Set<string>) {
  if (!searchTerm.trim()) return PRODUCTS

  return PRODUCTS.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.continent.toLowerCase().includes(searchTerm.toLowerCase())
  )
}
