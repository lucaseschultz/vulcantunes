import {memo} from 'react'
import {ProductItemProps} from '@/src/app/lib/definitions'
import {ProductCard} from '@/src/app/ui/(overview)/layout/components/product-card'
import {ProductActions} from '@/src/app/ui/(overview)/layout/components/product-actions'

export const WishListItemCard = memo(function WishListItemCard({product}: ProductItemProps) {
  return (
    <ProductCard
      product={product}
      imageClassName="product-main-image"
      testIdPrefix="wishlist"
      actions={<ProductActions product={product}/>}
    />
  )
})
