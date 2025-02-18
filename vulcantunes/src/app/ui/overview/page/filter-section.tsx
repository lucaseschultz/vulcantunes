import { memo } from 'react'
import { FeatureFilters } from './feature-filters'
import type { FilterSectionProps } from '@/src/app/lib/definitions'

export const FilterSection = memo(function FilterSection({
   features,
   handleFeatureChange
 }: FilterSectionProps) {
  return (
    <div className="filters">
      <h2 className="filters-title">Filter Products</h2>
      <FeatureFilters
        selectedFeatures={features}
        onFeatureChange={handleFeatureChange}
      />
    </div>
  )
})
