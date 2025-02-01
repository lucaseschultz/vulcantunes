import { memo, ChangeEvent } from 'react'
import type { SearchInputProps } from '@/src/app/lib/definitions'

export const SearchInput = memo(function SearchInput({
   value,
   onChange
 }: SearchInputProps) {
  return (
    <input
      type="search"
      placeholder="Search products"
      onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e)}
      value={value}
      aria-label="Search products"
      className="search-input"
    />
  )
})
