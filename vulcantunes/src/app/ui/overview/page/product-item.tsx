import { memo, useState } from 'react'
import Image from 'next/image'
import type { ProductItemProps } from '@/src/app/lib/definitions'

export const ProductItem = memo(function ProductItem({ product }: ProductItemProps) {
  const { product_status, product_quantity, product_model, product_description, product_name, product_image, product_price } = product

  const [imgSrc, setImgSrc] = useState(`/${product_image}`)

  const truncatedDescription = product_description.length > 100
    ? `${product_description.slice(0, 100)}...`
    : product_description

  return (
    <div
      className="product-item"
      data-testid={`product-${product_model}`}
      id={`${product_model}`}
    >
      <Image
        src={imgSrc}
        alt={`${imgSrc} image`}
        width={200}
        height={200}
        style={{
          height: '200',
          width: 'auto',
        }}
        onError={() => setImgSrc('/products/image-coming-soon.jpg')}
      />
      <div className="product-details">
        <span className="product-name">{product_name}</span>
        <p className="product-description">{truncatedDescription}</p>
        <div className="product-metadata">
          <span className="product-price">${product_price}</span>
          <span className={`product-quantity ${product_quantity === 0 ? 'out-of-stock' : ''}`}>
            {product_quantity > 0
              ? `In stock: ${product_quantity}`
              : (
                <>
                  Out of stock
                  <a
                    href={`/notify/${product_model}`}
                    className="notify-link"
                  >
                    Get notified when available
                  </a>
                </>
              )}
          </span>
          {product_status === 2 && (
            <span className="product-discontinued">Discontinued</span>
          )}
        </div>
      </div>
    </div>
  )
})
