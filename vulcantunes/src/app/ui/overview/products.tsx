'use client'

import { useState, useMemo, type ChangeEvent, useCallback, memo } from 'react'
import type { productSearchFilters } from '@/src/app/lib/definitions';

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
    <section className="products">
      <div className="filter">
        <input
          type="search"
          placeholder="Search products"
          onChange={handleSearchChange}
          value={state.searchInput}
          aria-label="Search products"
          className="search-input"
        />
        <FeatureFilters
          selectedFeatures={state.selectedFeatures}
          onFeatureChange={handleFeatureChange}
        />
      </div>
      <ProductsList products={state.filteredProducts}/>
    </section>
  )
}
