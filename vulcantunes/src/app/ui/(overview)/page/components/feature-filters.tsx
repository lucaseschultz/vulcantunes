import { memo } from "react";
import { FEATURE_FILTERS } from "@/src/app/lib/constants";
import { FeatureFiltersProps } from "@/src/app/lib/definitions";

export const FeatureFilters = memo(function FeatureFilters({
  selectedFeatures,
  onFeatureChange
 }: FeatureFiltersProps) {
  return (
    <div className="feature-filters">
      {Object.keys(FEATURE_FILTERS).map((feature) => (
        <label key={feature} className="feature-label">
          <input
            type="checkbox"
            className="feature-input"
            checked={selectedFeatures.has(feature.toLowerCase())}
            onChange={() => onFeatureChange(feature.toLowerCase())}
          />
          {feature}
        </label>
      ))}
    </div>
  )
})