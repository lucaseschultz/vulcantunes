import { memo } from 'react'
import type { ProductItemProps } from '@/src/app/lib/definitions'

export const ProductItem = memo(function ProductItem({ product }: ProductItemProps) {
  const { name, continent, id } = product

  return (
    <div
      className="product-item"
      data-testid={`product-${id}`}
    >
      <div className="product-details">
        <span className="product-name">{name}</span>
        <span className="product-continent">{continent}</span>
      </div>
    </div>
  )
})
