import { memo, type ChangeEvent } from 'react'

interface SearchInputProps {
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const SearchInput = memo(function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <input
      type="search"
      placeholder="Search products"
      onChange={onChange}
      value={value}
      aria-label="Search products"
      className="search-input"
    />
  )
})
