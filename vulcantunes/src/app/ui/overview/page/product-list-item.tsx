import { memo, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { ProductItemProps } from '@/src/app/lib/definitions'
import { ProductQuantity } from "@/src/app/ui/overview/layout/product-item-quantity";
import { renderOptionValues } from '@/src/app/lib/client-actions'

export const ProductListItem = memo(function ProductItem({ product, isOdd }: ProductItemProps) {
  const { product_status, product_quantity, product_model, product_description, product_name, product_image, product_price } = product

  const [imgSrc, setImgSrc] = useState(`/products/${product_image}`)

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
        alt={`${product_image} image`}
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
        {product.options && product.options.length > 0 && product.product_quantity > 0 && (
          <div className="product-options">
            {renderOptionValues({
              productModel: product_model,
              options: product.options,
              isOdd
            })}
          </div>
        )}
        <div className="product-metadata">
          <span className="product-price">${product_price}</span>
          <ProductQuantity quantity={product_quantity} model={product_model}/>
          {product_status === 2 && (
            <span className="product-discontinued">Discontinued</span>
          )}
          <Link
            href={`${process.env.NEXTAUTH_URL}/product/${product_model}`}
            className="product-details-button"
          >
            See Details
          </Link>
        </div>
      </div>
    </div>
  );
});
