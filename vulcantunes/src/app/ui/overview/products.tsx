'use client'

import {useReducer, useCallback, useState, type ChangeEvent, useEffect} from 'react'
import { productsReducer, initialState } from '@/src/app/reducers/products-reducer'
import { ProductsErrorBoundary } from './components/products-error-boundary'
import { FilterSection } from './components/filter-section'
import { ProductsList } from './components/products-list'
import { useDebounce } from "@/src/app/hooks/use-debounce";

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
