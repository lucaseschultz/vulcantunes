import {memo, useMemo, useState} from 'react'
import Image from 'next/image'
import type {ProductItemProps} from '@/src/app/lib/definitions'
import {ProductPurchaseSection} from '@/src/app/ui/(overview)/layout/components/product-purchase-section';
import Link from "next/link";
import WishListButton from '../../layout/components/wish-list-button';

export const ProductListItem = memo(function ProductListItem({product}: ProductItemProps) {
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

  const isDiscontinued = product_status === 2;

  const wishListProduct = {
    id: product_model,
    name: product_name,
    price: product_price,
    imageUrl: imgSrc,
    description: truncatedDescription,
    quantity: product_quantity,
    model: product_model,
    isDiscontinued: isDiscontinued,
  };

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
        <p className="product-item-description">{truncatedDescription}</p>
        <ProductPurchaseSection
          options={options}
          productModel={product_model}
          productQuantity={product_quantity}
          productPrice={product_price}
          isDiscontinued={isDiscontinued}
          productName={product_name}
        />
      </div>
      <div className="product-actions">
        <WishListButton product={wishListProduct}/>
        <Link
          href={`${process.env.NEXTAUTH_URL}/product/${product_model}`}
          className="product-details-button"
          aria-label={`See details for ${product_name}`}
        >
          See Details
        </Link>
      </div>
    </article>
  );
});
