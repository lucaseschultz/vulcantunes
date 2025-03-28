import { memo, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { ProductItemProps } from '@/src/app/lib/definitions'
import { ProductQuantity } from "@/src/app/ui/(overview)/layout/product-item-quantity";
import { OptionValues } from '@/src/app/ui/(overview)/layout/option-values';

export const ProductListItem = memo(function ProductListItem({ product }: ProductItemProps) {
  const {
    product_status,
    product_quantity,
    product_model,
    product_description,
    product_name,
    product_image,
    product_price,
    options
  } = product;

  const [imgSrc, setImgSrc] = useState(`/products/${product_image}`);
  const fallbackImage = '/products/image-coming-soon.jpg';

  const truncatedDescription = useMemo(() =>
      product_description.length > 175
        ? `${product_description.slice(0, 175)}...`
        : product_description,
    [product_description]
  );

  const isInStock = product_quantity > 0;
  const isDiscontinued = product_status === 2;
  const hasOptions = options && options.length > 0;

  return (
    <article
      className="product-item"
      data-testid={`product-${product_model}`}
      id={product_model}
    >
      <div className="product-image-container">
        <Image
          src={imgSrc}
          alt={`${product_image} image`}
          width={200}
          height={200}
          className="product-image"
          priority={false}
          onError={() => setImgSrc(fallbackImage)}
        />
      </div>
      <div className="product-details">
        <h2 className="product-name">{product_name}</h2>
        <p className="product-description">{truncatedDescription}</p>
        <div className="product-purchase-section">
          {hasOptions && isInStock && (
            <OptionValues
              options={options}
              productModel={product_model}
            />
          )}
          <div className="product-metadata">
            <span className="product-price">${product_price}</span>
            <ProductQuantity
              quantity={product_quantity}
              model={product_model}
              isDiscontinued={isDiscontinued}
            />
          </div>
          <Link
            href={`${process.env.NEXTAUTH_URL}/product/${product_model}`}
            className="product-details-button"
            aria-label={`See details for ${product_name}`}
          >
            See Details
          </Link>
        </div>
      </div>
    </article>
  );
});
