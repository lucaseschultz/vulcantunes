'use client'

import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import {useCallback, useEffect, useMemo, useState} from 'react'
import { ProductsListErrorBoundary } from './products-list-error-boundary'
import { FilterSection } from './filter-section'
import { ProductsList } from './products-list'
import { PRODUCTS } from '@/src/app/lib/constants'
import { useDebounce } from '@/src/app/hooks/use-debounce'

export default function Products() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [searchInput, setSearchInput] = useState(
    searchParams.get('search')?.toLowerCase() || ''
  )

  const debouncedSearch = useDebounce(searchInput)

  const features = useMemo(() =>
      new Set(searchParams.get('features')?.split(',').filter(Boolean) || []),
    [searchParams]
  )

  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    if (debouncedSearch) {
      params.set('search', debouncedSearch)
    } else {
      params.delete('search')
    }
    router.push(`?${params.toString()}`)
  }, [debouncedSearch, searchParams, router])

  const handleSearchChange = useCallback((value: string) => {
    setSearchInput(value)
  }, [])

  const handleFeatureChange = useCallback((newFeatures: Set<string>) => {
    const params = new URLSearchParams(searchParams)
    if (newFeatures.size > 0) {
      params.set('features', Array.from(newFeatures).join(','))
    } else {
      params.delete('features')
    }
    router.push(`?${params.toString()}`)
  }, [searchParams, router])

  const filteredProducts = useMemo(() =>
      PRODUCTS.filter((product) => {
        const matchesSearch = !searchInput ||
          product.name.toLowerCase().includes(searchInput) ||
          product.continent.toLowerCase().includes(searchInput)

        const matchesFeatures = features.size === 0 ||
          Array.from(features).every(feature => product.features?.includes(feature))

        return matchesSearch && matchesFeatures
      }),
    [debouncedSearch, features]
  )

  return (
    <>
      <FilterSection
        searchValue={searchInput}
        features={features}
        handleSearchChange={handleSearchChange}
        handleFeatureChange={handleFeatureChange}
      />
      <ProductsListErrorBoundary>
        <ProductsList products={filteredProducts} />
      </ProductsListErrorBoundary>
    </>
  )
}
