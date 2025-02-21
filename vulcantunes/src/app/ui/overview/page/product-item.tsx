import { memo, useMemo, useState } from 'react'
import Image from 'next/image'
import type { ProductItemProps } from '@/src/app/lib/definitions'
import { ProductQuantity } from "@/src/app/ui/overview/page/product-item-quantity";

export const ProductItem = memo(function ProductItem({ product }: ProductItemProps) {
  const { product_id, product_status, product_quantity, product_model, product_description, product_name, product_image, product_price } = product

  const [imgSrc, setImgSrc] = useState(`/${product_image}`)

  const truncatedDescription = useMemo(() =>
      product_description.length > 100
        ? `${product_description.slice(0, 100)}...`
        : product_description,
    [product_description]
  );


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
        priority={false}
        onError={() => setImgSrc('/products/image-coming-soon.jpg')}
      />
      <div className="product-details">
        <span className="product-name">{product_name}</span>
        <p className="product-description">{truncatedDescription}</p>
        <div className="product-metadata">
          <span className="product-price">${product_price}</span>
          <ProductQuantity quantity={product_quantity} model={product_model}/>
          {product_status === 2 && (
            <span className="product-discontinued">Discontinued</span>
          )}
        </div>
      </div>
    </div>
  )
})
