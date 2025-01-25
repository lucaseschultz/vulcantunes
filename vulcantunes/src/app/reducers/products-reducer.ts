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
    case 'TOGGLE_FEATURE': {
      const newFeatures = toggleFeature(state.selectedFeatures, action.payload)
      return {
        ...state,
        selectedFeatures: newFeatures,
        filteredProducts: filterProducts(state.searchInput, newFeatures)
      }
    }
    default:
      return state
  }
}

function toggleFeature(features: Set<string>, feature: string): Set<string> {
  const newFeatures = new Set(features)
  features.has(feature) ? newFeatures.delete(feature) : newFeatures.add(feature)
  return newFeatures
}

function filterProducts(searchTerm: string, features: Set<string>) {
  const trimmedSearch = searchTerm.trim().toLowerCase()
  if (!trimmedSearch && features.size === 0) return PRODUCTS

  return PRODUCTS.filter((product) => {
    const matchesSearch = !trimmedSearch ||
      product.name.toLowerCase().includes(trimmedSearch) ||
      product.continent.toLowerCase().includes(trimmedSearch)

    const matchesFeatures = features.size === 0 ||
      Array.from(features).every(feature => product.features?.includes(feature))

    return matchesSearch && matchesFeatures
  })
}
