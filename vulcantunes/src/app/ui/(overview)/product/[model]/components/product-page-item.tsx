'use client'

import Link from 'next/link'
import {ArrowLeft} from '@phosphor-icons/react'
import {Product} from "@/src/app/lib/definitions"
import {ProductPurchaseSection} from '@/src/app/ui/(overview)/layout/components/product-purchase-section'
import {ProductImage} from '@/src/app/ui/(overview)/layout/components/product-image'
import WishListButton from '@/src/app/ui/(overview)/layout/components/wish-list-button'

export default function ProductPageItem({product}: { product: Product }) {
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
  } = product

  const isDiscontinued = product_status === 2

  return (
    <div className="product-page">
      <div className="product-navigation">
        <Link href="/" className="all-products-link">
          <ArrowLeft size={16} weight="bold"/>
          <span>All Products</span>
        </Link>
      </div>

      <article className="product-details-container" data-testid={`wishlist-${product_model}`} id={product_model}>
        <div className="product-page-image-container">
          <ProductImage
            productImage={product_image}
            productName={product_name}
            width={400}
            height={400}
            priority={true}
            className="product-page-main-image"
          />
        </div>

        <div className="product-page-info">
          <div className="product-info-header">
            <h1 className="product-page-name">{product_name}</h1>
            <WishListButton product_model={product_model}/>
          </div>
          <p className="product-page-description">{product_description}</p>
          {features && features.length > 0 && (
            <div className="product-features-section">
              <h3 className="product-features-header">Features</h3>
              <div className="product-features">
                {features.split(',').map((feature: string) => (
                  <span key={feature} className="feature-tag">{feature.trim()}</span>
                ))}
              </div>
            </div>
          )}
          <ProductPurchaseSection
            options={options}
            productModel={product_model}
            productQuantity={product_quantity}
            productPrice={product_price}
            isDiscontinued={isDiscontinued}
          />
        </div>
      </article>
    </div>
  )
}
