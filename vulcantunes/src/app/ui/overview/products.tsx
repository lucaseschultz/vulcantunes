'use client'

import { useState, useMemo, type ChangeEvent, useCallback, memo } from 'react'

interface Country {
  name: string
  continent: string
  id: string
}
const COUNTRIES: readonly Country[] = [
  { name: "Belgium", continent: "Europe", id: "be" },
  { name: "Bolivia", continent: "South America", id: "bo" },
  { name: "Ghana", continent: "Africa", id: "gh" },
  { name: "India", continent: "Asia", id: "in" },
  { name: "Japan", continent: "Asia", id: "jp" },
] as const
const ProductsList = memo(({ countries }: { countries: readonly Country[] }) => (
  <div className="products-list" aria-label="Products list">
    {countries.map(({name, continent, id}) => (
      <div key={id} className="product-item">
        <span className="product-name">{name}</span>
        <span className="product-continent">{continent}</span>
      </div>
    ))}
  </div>
))

interface FeatureFilters {
  [key: string]: false
}
const FEATURE_FILTERS: FeatureFilters = {
  "Bluetooth": false,
  "USB Charger": false,
  "AUX Output": false,
  "AUX Input": false,
  "Audio Jack": false
} as const

export default function Products() {
  const [searchInput, setSearchInput] = useState("")
  const [selectedFeatures, setSelectedFeatures] = useState<Set<string>>(new Set())

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value.toLowerCase().trim())
  }, [])

  const handleFeatureChange = useCallback((feature: string) => {
    setSelectedFeatures(prev => {
      const newSet = new Set(prev)
      if (newSet.has(feature)) {
        newSet.delete(feature)
      } else {
        newSet.add(feature)
      }
      return newSet
    })
  }, [])

  const filteredCountries = useMemo(() => {
    if (!searchInput) return COUNTRIES

    return COUNTRIES.filter((country) => (
      country.name.toLowerCase().includes(searchInput) ||
      country.continent.toLowerCase().includes(searchInput)
    ))
  }, [searchInput])

  return (
    <section className="products">
      <div className="filter">
        <input
          type="search"
          placeholder="Search products"
          onChange={handleChange}
          value={searchInput}
          aria-label="Search products"
          className="search-input"
        />
        <div className="checkbox-group">
          {Object.keys(FEATURE_FILTERS).map((feature) => (
            <label key={feature} className="checkbox-label">
              <input
                type="checkbox"
                className="checkbox-input"
                checked={filters.selectedFeatures.has(feature)}
                onChange={() => handleFeatureChange(feature)}
              />
              {feature}
            </label>
          ))}
        </div>
      </div>
      <ProductsList countries={filteredCountries}/>
    </section>
  )
}
