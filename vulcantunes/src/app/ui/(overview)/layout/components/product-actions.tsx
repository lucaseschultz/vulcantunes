import Link from 'next/link'
import WishListButton from './wish-list-button'
import {ProductItemProps} from '@/src/app/lib/definitions'

export function ProductActions({product}: ProductItemProps) {
  return (
    <div className="product-actions">
      <WishListButton product={product}/>
      <Link
        href={`${process.env.NEXTAUTH_URL}/product/${product.product_model}`}
        className="product-details-button"
        aria-label={`See details for ${product.product_name}`}
      >
        See Details
      </Link>
    </div>
  )
}
