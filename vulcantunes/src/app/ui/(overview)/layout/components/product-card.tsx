import {ProductCardProps} from '@/src/app/lib/definitions'
import {ProductPurchaseSection} from './product-purchase-section'
import {ProductImage} from './product-image'

export function ProductCard({
                              product,
                              imageSize = {width: 200, height: 200},
                              imagePriority = false,
                              imageClassName = "product-main-image",
                              description,
                              testIdPrefix = "product",
                              actions,
                              additionalContent
                            }: ProductCardProps) {
  const {
    product_status,
    product_quantity,
    product_model,
    product_name,
    product_image,
    product_price,
    options
  } = product

  const isDiscontinued = product_status === 2

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
        <p className="product-description">{description}</p>
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
