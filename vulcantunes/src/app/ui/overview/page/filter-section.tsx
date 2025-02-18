import { memo } from 'react'
import { FeatureFilters } from './feature-filters'
import type { FilterSectionProps } from '@/src/app/lib/definitions'

export const FilterSection = memo(function FilterSection({
   features,
   handleFeatureChange
 }: FilterSectionProps) {
  return (
    <div className="filters">
      <FeatureFilters
        selectedFeatures={features}
        onFeatureChange={handleFeatureChange}
      />
    </div>
  )
})
