import {memo, useState} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {WishListItemProps} from '@/src/app/lib/definitions'
import WishListButton from "@/src/app/ui/(overview)/layout/components/wish-list-button";

export const WishListItemCard = memo(function WishListItemCard({
                                                                 item,
                                                               }: WishListItemProps) {
  const [imgSrc, setImgSrc] = useState(item.imageUrl);
  const fallbackImage = '/products/image-coming-soon.jpg';

  return (
    <article className="product-item" data-testid={`wishlist-${item.id}`} id={item.id}>
      <div className="product-image-container">
        <Image
          src={imgSrc}
          alt={`${item.name} image`}
          width={200}
          height={200}
          className="product-image"
          priority={false}
          onError={() => setImgSrc(fallbackImage)}
        />
      </div>
      <div className="product-details">
        <h2 className="product-name">{item.name}</h2>
        <p className="product-item-description">{item.description}</p>
        <div className="product-price">${item.price}</div>
      </div>
      <div className="product-actions">
        <WishListButton product={item}/>
        <Link
          href={`/product/${item.id}`}
          className="product-details-button"
          aria-label={`See details for ${item.name}`}
        >
          See Details
        </Link>
      </div>
    </article>
  );
});
