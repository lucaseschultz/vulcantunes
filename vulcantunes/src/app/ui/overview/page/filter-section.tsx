import { memo } from 'react'
import { SearchInput } from './search-input'
import { FeatureFilters } from './feature-filters'
import type { FilterSectionProps } from '@/src/app/lib/definitions'

export const FilterSection = memo(function FilterSection({
   searchValue,
   features,
   handleSearchChange,
   handleFeatureChange
 }: FilterSectionProps) {
  return (
    <div className="filters">
      <SearchInput value={searchValue} onChange={(e) => handleSearchChange(e.target.value)} />
      <FeatureFilters
        selectedFeatures={features}
        onFeatureChange={handleFeatureChange}
      />
    </div>
  )
})
