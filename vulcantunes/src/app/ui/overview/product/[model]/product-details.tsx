'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ProductQuantity } from "@/src/app/ui/overview/layout/product-item-quantity"
import { Product } from "@/src/app/lib/definitions"

export default function ProductDetails({ product }: { product: Product }) {
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
        <h1 className="product-title">{product.product_name}</h1>
        <p className="product-description">{product.product_description}</p>

        <div className="product-features">
          {product.features && product.features.split(',').map((feature: string) => (
            <span key={feature} className="feature-tag">{feature}</span>
          ))}
        </div>

        <div className="product-purchase-section">
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
  )
}
