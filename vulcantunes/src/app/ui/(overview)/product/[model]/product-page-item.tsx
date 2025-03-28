'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Product } from "@/src/app/lib/definitions"
import { ProductPurchaseSection } from '@/src/app/ui/(overview)/layout/product-purchase-section';

export default function ProductPageItem({ product }: { product: Product }) {
  const {
    product_status,
    product_quantity,
    product_model,
    product_description,
    product_name,
    product_image,
    product_price,
    options,
    features
  } = product;

  const [imgSrc, setImgSrc] = useState(`/products/${product_image}`)

  const isDiscontinued = product_status === 2;

  return (
    <div className="product-details-container">
      <div className="product-image-section">
        <Image
          src={imgSrc}
          alt={`${product_image} image`}
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
        <h1 className="product-name">{product_name}</h1>
        <p className="product-page-description">{product_description}</p>
        <div className="product-features">
          {features && features.split(',').map((feature: string) => (
            <span key={feature} className="feature-tag">{feature}</span>
          ))}
        </div>

        <ProductPurchaseSection
          options={options}
          productModel={product_model}
          productQuantity={product_quantity}
          productPrice={product_price}
          isDiscontinued={isDiscontinued}
        />
      </div>
    </div>
  )
}
