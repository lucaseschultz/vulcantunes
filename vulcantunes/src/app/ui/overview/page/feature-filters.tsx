import { memo } from "react";
import { FEATURE_FILTERS } from "@/src/app/lib/constants";
import { FeatureFiltersProps } from "@/src/app/lib/definitions";

export const FeatureFilters = memo(function FeatureFilters({
  selectedFeatures,
  onFeatureChange
 }: FeatureFiltersProps) {
  return (
    <div className="checkbox-group">
      {Object.keys(FEATURE_FILTERS).map((feature) => (
        <label key={feature} className="checkbox-label">
          <input
            type="checkbox"
            className="checkbox-input"
            checked={selectedFeatures.has(feature)}
            onChange={() => onFeatureChange(feature.toLowerCase())}
          />
          {feature}
        </label>
      ))}
    </div>
  )
})