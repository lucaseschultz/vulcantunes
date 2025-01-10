'use client'

import { useState, useMemo, type ChangeEvent, useCallback } from 'react'

interface Country {
  name: string
  continent: string
  id: string
}

// Move constant outside component to prevent recreation
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

export default function Products() {
  const [searchInput, setSearchInput] = useState("")

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value.toLowerCase().trim())
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
      </div>
      <ProductsList countries={filteredCountries}/>
    </section>
  )
}
