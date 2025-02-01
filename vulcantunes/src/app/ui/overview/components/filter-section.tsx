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
    <div className="filter">
      <SearchInput value={searchValue} onChange={handleSearchChange} />
      <FeatureFilters
        selectedFeatures={features}
        onFeatureChange={handleFeatureChange}
      />
    </div>
  )
})
