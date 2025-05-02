import {memo} from 'react'
import {ProductItemProps} from '@/src/app/lib/definitions'
import {ProductCard} from '@/src/app/ui/(overview)/layout/components/product-card'
import {ProductActions} from '@/src/app/ui/(overview)/layout/components/product-actions'

export const WishListItemCard = memo(function WishListItemCard({product}: ProductItemProps) {
  const features = product.features || '';

  const featuresContent = features && features.length > 0 ? (
    <div className="product-features-section">
      <h3 className="product-features-header">Features</h3>
      <div className="product-features">
        {Array.from(new Set(features.split(','))).map((feature: string) => (
          <span key={feature.trim()} className="feature-tag">{feature.trim()}</span>
        ))}
      </div>
    </div>
  ) : null;

  return (
    <ProductCard
      product={product}
      imageClassName="product-main-image"
      description={product.product_description}
      testIdPrefix="wishlist"
      actions={<ProductActions product={product}/>}
      additionalContent={featuresContent}
    />
  )
})
