import { memo, useState } from 'react'
import Image from 'next/image'
import type { ProductItemProps } from '@/src/app/lib/definitions'

export const ProductItem = memo(function ProductItem({ product }: ProductItemProps) {
  const { product_quantity, product_model, product_description, product_name, product_image, product_price } = product
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
        <span className="product-price">${product_price}</span>
      </div>
    </div>
  )
})
