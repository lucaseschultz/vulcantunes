import { memo } from 'react'

export const NoProductsFound = memo(function NoProductsFound() {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <h2 className="text-xl font-semibold mb-2">No Products Found</h2>
      <p className="text-gray-600">Try adjusting your search or filter criteria</p>
    </div>
  )
})
