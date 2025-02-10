import { memo, useState } from 'react'
import Image from 'next/image'
import type { ProductItemProps } from '@/src/app/lib/definitions'

export const ProductItem = memo(function ProductItem({ product }: ProductItemProps) {
  const { product_model, product_image, product_price, product_id } = product
  const [imgSrc, setImgSrc] = useState(`/${product_image}`)

  return (
    <div
      className="product"
      data-testid={`product-${product_id}`}
    >
      <div className="product-details">
        <Image
          src={imgSrc}
          alt={`${product_model} image`}
          width={200}
          height={200}
          style={{
            height: '200',
            width: 'auto',
          }}
          onError={() => setImgSrc('/products/image-coming-soon.jpg')}
        />
        <span className="product-name">{product_model}</span>
        <span className="product-price">${product_price}</span>
      </div>
    </div>
  )
})
