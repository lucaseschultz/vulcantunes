import Link from 'next/link'
import WishListButton from './wish-list-button'
import {Product} from '@/src/app/lib/definitions'

interface ProductActionsProps {
  product: Product
  showWishlistButton?: boolean
}

export function ProductActions({product, showWishlistButton = true}: ProductActionsProps) {
  return (
    <div className="product-actions">
      {showWishlistButton && <WishListButton product={product}/>}
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
