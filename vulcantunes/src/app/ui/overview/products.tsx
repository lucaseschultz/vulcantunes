'use client'

import { useState, useMemo, type ChangeEvent } from 'react'

interface Country {
  name: string
  continent: string
}

const COUNTRIES: Country[] = [
  { name: "Belgium", continent: "Europe" },
  { name: "India", continent: "Asia" },
  { name: "Bolivia", continent: "South America" },
  { name: "Ghana", continent: "Africa" },
  { name: "Japan", continent: "Asia" },
]

export default function Products() {
  const [searchInput, setSearchInput] = useState("")

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value)
  }

  const filteredCountries = useMemo(() => {
    if (!searchInput) return COUNTRIES

    const searchTerm = searchInput.toLowerCase()
    return COUNTRIES.filter((country) =>
      country.name.toLowerCase().includes(searchTerm) ||
      country.continent.toLowerCase().includes(searchTerm)
    )
  }, [searchInput])

  return (
    <div className="products">
      <input
        type="search"
        placeholder="Search here"
        onChange={handleChange}
        value={searchInput} />
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
        {filteredCountries.map((country) => (
          <tr key={country.name}>
            <td>{country.name}</td>
            <td>{country.continent}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
}
