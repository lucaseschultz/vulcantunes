import {ReactNode} from 'react'
import {Product} from '@/src/app/lib/definitions'
import {ProductPurchaseSection} from './product-purchase-section'
import {ProductImage} from './product-image'

interface ProductCardProps {
  product: Product
  imageSize?: { width: number; height: number }
  imagePriority?: boolean
  imageClassName?: string
  description?: string | ReactNode
  testIdPrefix?: string
  actions?: ReactNode
  additionalContent?: ReactNode
}

export function ProductCard({
                              product,
                              imageSize = {width: 200, height: 200},
                              imagePriority = false,
                              imageClassName = "product-image",
                              description,
                              testIdPrefix = "product",
                              actions,
                              additionalContent
                            }: ProductCardProps) {
  const {
    product_status,
    product_quantity,
    product_model,
    product_description,
    product_name,
    product_image,
    product_price,
    options
  } = product

  const isDiscontinued = product_status === 2
  const displayDescription = description || product_description

  return (
    <article
      className="product-item"
      data-testid={`${testIdPrefix}-${product_model}`}
      id={product_model}
    >
      <div className="product-image-container">
        <ProductImage
          productImage={product_image}
          productName={product_name}
          width={imageSize.width}
          height={imageSize.height}
          priority={imagePriority}
          className={imageClassName}
        />
      </div>
      <div className="product-info">
        <h2 className="product-name">{product_name}</h2>
        {typeof displayDescription === 'string' ? (
          <p className="product-description">{displayDescription}</p>
        ) : (
          displayDescription
        )}
        {additionalContent}
        <ProductPurchaseSection
          options={options}
          productModel={product_model}
          productQuantity={product_quantity}
          productPrice={product_price}
          isDiscontinued={isDiscontinued}
        />
      </div>
      {actions}
    </article>
  )
}
