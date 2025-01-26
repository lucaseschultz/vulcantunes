'use client'

import { useReducer, useCallback, memo, useState, useEffect, type ChangeEvent } from 'react'
import { productsReducer, initialState } from '@/src/app/reducers/products-reducer'
import { FEATURE_FILTERS } from '@/src/app/constants/products'
import type { Product } from '@/src/app/lib/definitions';
import { useDebounce } from '@/src/app/hooks/use-debounce'
import {ProductsErrorBoundary} from "@/src/app/ui/overview/components/products-error-boundary";

const ProductsList = memo(function ProductsList({ products }: { products: readonly Product[] }) {
  return (
    <div className="products-list" aria-label="Products list">
      {products.map(({name, continent, id}) => (
        <div key={id} className="product-item">
          <span className="product-name">{name}</span>
          <span className="product-continent">{continent}</span>
        </div>
      ))}
    </div>
  )
})

const FeatureFilters = memo(function FeatureFilters({
  selectedFeatures,
  onFeatureChange
}: {
  selectedFeatures: Set<string>
  onFeatureChange: (feature: string) => void
}) {
  return (
    <div className="checkbox-group">
      {Object.keys(FEATURE_FILTERS).map((feature) => (
        <label key={feature} className="checkbox-label">
          <input
            type="checkbox"
            className="checkbox-input"
            checked={selectedFeatures.has(feature)}
            onChange={() => onFeatureChange(feature)}
          />
          {feature}
        </label>
      ))}
    </div>
  )
})

export default function Products() {
  const [state, dispatch] = useReducer(productsReducer, initialState)
  const [searchInput, setSearchInput] = useState('')
  const debouncedSearchTerm = useDebounce(searchInput)

  useEffect(() => {
    dispatch({ type: 'SET_SEARCH', payload: debouncedSearchTerm })
  }, [debouncedSearchTerm])

  const handleSearchChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value)
  }, [])

  const handleFeatureChange = useCallback((feature: string) => {
    dispatch({ type: 'TOGGLE_FEATURE', payload: feature })
  }, [])

  return (
    <ProductsErrorBoundary>
      <section className="products">
        <FilterSection
          searchValue={searchInput}
          onSearchChange={handleSearchChange}
          selectedFeatures={state.selectedFeatures}
          onFeatureChange={handleFeatureChange}
        />
        <ProductsList products={state.filteredProducts} />
      </section>
    </ProductsErrorBoundary>
  )
}
