import { memo } from "react";
import { ProductQuantityProps } from '@/src/app/lib/definitions';

export const ProductQuantity = memo(function ProductQuantity({
 quantity,
 model,
 isDiscontinued
}: ProductQuantityProps) {
  const isInStock = quantity > 0;

  return (
    <div className={`product-quantity ${isInStock ? '' : 'out-of-stock'}`}>
      {isInStock ? (
        <span>
          In stock: {quantity}
          {isDiscontinued && (
            <span className="product-discontinued"> Discontinued</span>
          )}
        </span>
      ) : isDiscontinued ? (
        <span className="product-discontinued">Discontinued</span>
      ) : (
        <span>
          Out of stock
          <a
            href={`/notify/${model}`}
            className="notify-link"
            aria-label="Get notified when this product becomes available"
          >
            Get notified when available
          </a>
        </span>
      )}
    </div>
  );
});

ProductQuantity.displayName = 'ProductQuantity';
