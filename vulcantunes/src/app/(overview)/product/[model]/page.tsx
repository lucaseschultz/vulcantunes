'use client'

import { Suspense, useState } from 'react'
import Image from 'next/image'
import '@/src/app/ui/overview/product[model]/product[model].css'
import { notFound } from 'next/navigation'
import { ProductQuantity } from "@/src/app/ui/overview/layout/product-item-quantity"
import { getProduct } from "@/src/app/lib/server-actions";
import { ProductSkeleton } from "@/src/app/ui/overview/layout/skeletons";

export default async function Page({ params }: { params: { model: string } }) {
  const product = await getProduct(params.model)

  const [imgSrc, setImgSrc] = useState(`/products/${product.product_image}`)


  if (!product) {
    notFound()
  }

  return (
    <Suspense fallback={<ProductSkeleton/>}>
      <div className="product-details-container">
        <div className="product-image-section">
          <Image
            src={`/${product.product_image}`}
            alt={product.product_name}
            width={400}
            height={400}
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
    </Suspense>
  )
}
