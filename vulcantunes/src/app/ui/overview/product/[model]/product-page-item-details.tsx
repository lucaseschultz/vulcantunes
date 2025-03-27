'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ProductQuantity } from "@/src/app/ui/overview/layout/product-item-quantity"
import { Product } from "@/src/app/lib/definitions"
import { OptionValues } from '@/src/app/ui/overview/layout/option-values';

export default function ProductPageItemDetails({ product }: { product: Product }) {
  const [imgSrc, setImgSrc] = useState(`/products/${product.product_image}`)

  return (
    <div className="product-details-container">
      <div className="product-image-section">
        <Image
          src={imgSrc}
          alt={`${product.product_image} image`}
          width={400}
          height={400}
          style={{
            height: '400',
            width: 'auto',
          }}
          priority
          className="product-main-image"
          onError={() => setImgSrc('/products/image-coming-soon.jpg')}
        />
      </div>

      <div className="product-info-section">
        <h1 className="product-name">{product.product_name}</h1>
        <p className="product-page-description">{product.product_description}</p>
        <div className="product-features">
          {product.features && product.features.split(',').map((feature: string) => (
            <span key={feature} className="feature-tag">{feature}</span>
          ))}
        </div>

        <div className="product-purchase-section">
          {product.options && product.options.length > 0 && product.product_quantity > 0 && (
            <OptionValues options={product.options} productModel={product.product_model} />
          )}

          <div className="product-metadata">
            <span className="product-price">${product.product_price}</span>
            <ProductQuantity
              quantity={product.product_quantity}
              model={product.product_model}
            />
            {product.product_status === 2 && (
              <span className="product-discontinued">Discontinued</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
