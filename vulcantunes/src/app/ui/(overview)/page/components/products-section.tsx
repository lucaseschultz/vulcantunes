'use client'

import {useSearchParams} from 'next/navigation'
import {useRouter} from 'next/navigation'
import {useCallback, useEffect, useState} from 'react'
import {ProductsErrorBoundary} from '../../layout/components/products-error-boundary'
import {FilterSection} from './filter-section'
import {ProductsList} from './products-list'
import {debounce} from '@/src/app/lib/utils'

export default function ProductsSection() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [features, setFeatures] = useState(
    new Set(searchParams.get('features')?.split(',').filter(Boolean) || [])
  )

  const debouncedFeatures = debounce(Array.from(features).join(','))

  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    if (debouncedFeatures) {
      params.set('features', debouncedFeatures)
    } else {
      params.delete('features')
    }
    router.push(`?${params.toString()}`)
  }, [debouncedFeatures, searchParams, router])

  const handleFeatureChange = useCallback((feature: string) => {
    const newFeatures = new Set(features);
    if (newFeatures.has(feature)) {
      newFeatures.delete(feature);
    } else {
      newFeatures.add(feature);
    }
    setFeatures(newFeatures)
  }, [features]);

  return (
    <div className="products">
      <FilterSection
        selectedFeatures={features}
        handleFeatureChange={handleFeatureChange}
      />
      <ProductsErrorBoundary>
        <ProductsList
          featuresFilters={debouncedFeatures}
        />
      </ProductsErrorBoundary>
    </div>
  )
}
