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

const FEATURE_FILTERS = {
  "Bluetooth": false,
  "USB Charger": false,
  "AUX Input": false,
  "AUX Output": false,
  "Audio Jack": false
} as const satisfies Record<string, boolean>

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
  const [filters, setFilters] = useState<productSearchFilters>({
    searchInput: '',
    selectedFeatures: new Set<string>()
  })

  const handleSearchChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value
    setFilters(prev => ({
      ...prev,
      searchInput: searchTerm
    }))
  }, [])

  const handleFeatureChange = useCallback((feature: string) => {
    setFilters(prev => {
      const newFeatures = new Set(prev.selectedFeatures)
      newFeatures.has(feature) ? newFeatures.delete(feature) : newFeatures.add(feature)
      return {
        ...prev,
        selectedFeatures: newFeatures
      }
    })
  }, [])

  const filteredCountries = useMemo(() => {
    if (!filters.searchInput.trim()) return COUNTRIES

    const searchTerm = filters.searchInput.toLowerCase().trim()
    return COUNTRIES.filter((country) =>
      country.name.toLowerCase().includes(searchTerm) ||
      country.continent.toLowerCase().includes(searchTerm)
    )
  }, [filters.searchInput])

  return (
    <section className="products">
      <div className="filter">
        <input
          type="search"
          placeholder="Search products"
          onChange={handleSearchChange}
          value={filters.searchInput}
          aria-label="Search products"
          className="search-input"
        />
        <FeatureFilters
          selectedFeatures={filters.selectedFeatures}
          onFeatureChange={handleFeatureChange}
        />
      </div>
      <ProductsList countries={filteredCountries}/>
    </section>
  )
}
