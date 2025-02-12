'use client'

import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState, Suspense } from 'react'
import { ProductsListErrorBoundary } from './products-list-error-boundary'
import { FilterSection } from './filter-section'
import { ProductsList } from './products-list'
import { Product } from '@/src/app/lib/definitions'
import { debounce } from '@/src/app/lib/utils'
import { ProductsSkeleton } from "@/src/app/ui/overview/page/skeletons";

export default function Products() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch('/api/products')
      const data = await response.json()
      setProducts(data)
    }
    fetchProducts()
  }, [])

  const [searchInput, setSearchInput] = useState(
    searchParams.get('search')?.toLowerCase() || ''
  )
  const [features, setFeatures] = useState(
    new Set(searchParams.get('features')?.split(',').filter(Boolean) || [])
  )

  const debouncedSearch = debounce(searchInput)
  const debouncedFeatures = debounce(Array.from(features).join(','))

  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    if (debouncedSearch) {
      params.set('search', debouncedSearch)
    } else {
      params.delete('search')
    }
    router.push(`?${params.toString()}`)
  }, [debouncedSearch, searchParams, router])

  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    if (debouncedFeatures) {
      params.set('features', debouncedFeatures)
    } else {
      params.delete('features')
    }
    router.push(`?${params.toString()}`)
  }, [debouncedFeatures, searchParams, router])

  const handleSearchChange = useCallback((value: string) => {
    setSearchInput(value)
  }, [])

  const handleFeatureChange = useCallback((feature: string) => {
    const newFeatures = new Set(features);
    if (newFeatures.has(feature)) {
      newFeatures.delete(feature);
    } else {
      newFeatures.add(feature);
    }
    setFeatures(newFeatures)
  }, [features]);

  const filteredProducts = useMemo(() =>
      products.filter((product) => {
        const matchesSearch = !debouncedSearch ||
          product.product_model.toLowerCase().includes(debouncedSearch)

        const matchesFeatures = debouncedFeatures.length === 0 ||
          debouncedFeatures.split(',').every(feature => product.features?.includes(feature))

        return matchesSearch && matchesFeatures
      }),
    [debouncedSearch, debouncedFeatures, products]
  )

  return (
    <div className="products">
      <FilterSection
        searchValue={searchInput}
        features={features}
        handleSearchChange={handleSearchChange}
        handleFeatureChange={handleFeatureChange}
      />
      <ProductsListErrorBoundary>
        <Suspense fallback={<ProductsSkeleton />}>
          <ProductsList products={filteredProducts} />
        </Suspense>
      </ProductsListErrorBoundary>
    </div>
  )
}
