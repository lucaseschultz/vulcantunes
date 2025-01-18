'use client'

import { useState, useMemo, type ChangeEvent, useCallback } from 'react'

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

const ProductsList = ({ countries }: { countries: readonly Country[] }) => (
  <div className="products-list" aria-label="Products list">
    {countries.map(({name, continent, id}) => (
      <span key={id}>
        <span>{name}</span>
        <span>{continent}</span>
      </span>
    ))}
  </div>
)
const FEATURE_FILTERS = [
  "Bluetooth",
  "USB Charger",
  "AUX Output",
  "AUX Input",
  "Audio Jack"
] as const

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
          {FEATURE_FILTERS.map((feature) => (
            <label key={feature} className="checkbox-label">
              <input
                type="checkbox"
                className="checkbox-input"
                checked={selectedFeatures.has(feature)}
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
