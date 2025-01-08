'use client'

import { useState, useMemo, type ChangeEvent, useCallback } from 'react'

interface Country {
  name: string
  continent: string
  id: string
}

const COUNTRIES: Country[] = [
  { name: "Belgium", continent: "Europe", id: "be" },
  { name: "Bolivia", continent: "South America", id: "bo" },
  { name: "Ghana", continent: "Africa", id: "gh" },
  { name: "India", continent: "Asia", id: "in" },
  { name: "Japan", continent: "Asia", id: "jp" },
]

export default function Products() {
  const [searchInput, setSearchInput] = useState("")

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value.trim())
  }, [])

  const filteredCountries = useMemo(() => {
    if (!searchInput) return COUNTRIES

    const searchTerm = searchInput.toLowerCase()
    return COUNTRIES.filter((country) =>
      country.name.toLowerCase().includes(searchTerm) ||
      country.continent.toLowerCase().includes(searchTerm)
    )
  }, [searchInput])

  return (
    <section className="products">
      <input
        type="search"
        placeholder="Search here"
        onChange={handleChange}
        value={searchInput}
        aria-label="Search products"
        className="search-input"
      />
      <table
        className="products-table"
        aria-label="Products"
      >
        <thead>
          <tr>
            <th>Country</th>
            <th>Continent</th>
          </tr>
        </thead>
        <tbody>
        {filteredCountries.map(({ name, continent, id }) => (
          <tr key={id}>
            <td>{name}</td>
            <td>{continent}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </section>
  )
}
