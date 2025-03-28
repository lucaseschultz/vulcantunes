// Add link to "Contact Us" form to avoid site abandonment
import { memo } from 'react'

export const NoProductsFound = memo(function NoProductsFound() {
  return (
    <div className="no-products">
      <h2>No Products Found</h2>
      <p>Try adjusting your search or filter criteria</p>
    </div>
  )
})
