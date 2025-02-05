import { memo } from 'react'
import Image from 'next/image'
import type { ProductItemProps } from '@/src/app/lib/definitions'

export const ProductItem = memo(function ProductItem({ product }: ProductItemProps) {
  const { product_model, product_image, product_price, product_id } = product

  return (
    <div
      className="product"
      data-testid={`product-${product_id}`}
    >
      <div className="product-details">
        <Image
          src={`/${product_image}`}
          alt={product_model}
          width={200}
          height={200}
        />
        <span className="product-name">{product_model}</span>
        <span className="product-price">${product_price}</span>
      </div>
    </div>
  )
})
