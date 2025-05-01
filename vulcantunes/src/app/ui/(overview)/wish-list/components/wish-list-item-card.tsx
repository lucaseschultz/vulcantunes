import {memo, useState} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {ProductItemProps} from '@/src/app/lib/definitions'
import WishListButton from "@/src/app/ui/(overview)/layout/components/wish-list-button";
import {ProductPurchaseSection} from "@/src/app/ui/(overview)/layout/components/product-purchase-section";

export const WishListItemCard = memo(function WishListItemCard({
                                                                 product,
                                                               }: ProductItemProps) {
  const {
    product_status,
    product_quantity,
    product_model,
    product_description,
    product_name,
    product_image,
    product_price,
    options,
  } = product;

  const [imgSrc, setImgSrc] = useState(`/products/${product_image}`);
  const fallbackImage = '/products/image-coming-soon.jpg';

  const isDiscontinued = product_status === 2;

  return (
    <article className="product-item" data-testid={`wishlist-${product_model}`} id={product_model}>
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
        <p className="product-item-description">{product_description}</p>
        <ProductPurchaseSection
          options={options}
          productModel={product_model}
          productQuantity={product_quantity}
          productPrice={product_price}
          isDiscontinued={isDiscontinued}
        />
      </div>
      <div className="product-actions">
        <WishListButton product={product}/>
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
