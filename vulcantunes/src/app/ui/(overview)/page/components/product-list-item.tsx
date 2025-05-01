import {memo, useMemo} from 'react'
import type {ProductItemProps} from '@/src/app/lib/definitions'
import {ProductCard} from '@/src/app/ui/(overview)/layout/components/product-card'
import {ProductActions} from '@/src/app/ui/(overview)/layout/components/product-actions'

export const ProductListItem = memo(function ProductListItem({product}: ProductItemProps) {
  const truncatedDescription = useMemo(() =>
      product.product_description.length > 175
        ? `${product.product_description.slice(0, 175)}...`
        : product.product_description,
    [product.product_description]
  )

  return (
    <ProductCard
      product={product}
      description={truncatedDescription}
      testIdPrefix="product"
      actions={<ProductActions product={product}/>}
    />
  )
})
