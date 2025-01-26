import { memo } from "react";
import {FEATURE_FILTERS} from "@/src/app/constants/products";

export const FeatureFilters = memo(function FeatureFilters({
  selectedFeatures,
  onFeatureChange
}: {
  selectedFeatures: Set<string>
  onFeatureChange: (feature: string) => void
}) {
  return (
    <div className="checkbox-group">
      {Object.keys(FEATURE_FILTERS).map((feature) => (
        <label key={feature} className="checkbox-label">
          <input
            type="checkbox"
            className="checkbox-input"
            checked={selectedFeatures.has(feature)}
            onChange={() => onFeatureChange(feature)}
          />
          {feature}
        </label>
      ))}
    </div>
  )
})