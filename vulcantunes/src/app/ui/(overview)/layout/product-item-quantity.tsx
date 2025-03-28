import { memo } from "react";

export const ProductQuantity = memo(function ProductQuantity({
 quantity,
 model,
 isDiscontinued
}: {
  quantity: number,
  model: string,
  isDiscontinued?: boolean
}) {
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
