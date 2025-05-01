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
    product_id,
    product_status,
    product_quantity,
    product_model,
    product_description,
    product_name,
    product_image,
    product_price,
  } = product;

  const [imgSrc, setImgSrc] = useState(product_image);
  const fallbackImage = '/products/image-coming-soon.jpg';

  const isDiscontinued = product_status === 2;

  return (
    <article className="product-item" data-testid={`wishlist-${product_id}`} id={String(product_id)}>
      <div className="product-image-container">
        <Image
          src={imgSrc}
          alt={`${product_name} image`}
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
          productModel={product_model}
          productQuantity={product_quantity}
          productPrice={product_price}
          isDiscontinued={isDiscontinued}
        />
      </div>
      <div className="product-actions">
        <WishListButton product={product}/>
        <Link
          href={`/product/${product_id}`}
          className="product-details-button"
          aria-label={`See details for ${product_name}`}
        >
          See Details
        </Link>
      </div>
    </article>
  );
});
