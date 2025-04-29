import {memo} from 'react'
import Link from 'next/link'

export const NoProductsFound = memo(function NoProductsFound() {
  return (
    <div className="no-products">
      <h2>No Products Found</h2>
      <p>Try adjusting your search or filter criteria</p>
      <p>If you think there's a mistake or issue on our behalf, please let us know
        <Link href="/info#contact-us">here</Link></p>
    </div>
  )
})
