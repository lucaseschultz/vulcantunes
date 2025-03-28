import { memo } from "react";

export const ProductQuantity = memo(function ProductQuantity({ quantity, model }: { quantity: number, model: string }) {
  const isInStock = quantity > 0;

  return (
    <span className={`product-quantity ${isInStock ? '' : 'out-of-stock'}`}>
      {isInStock ? (
        `In stock: ${quantity}`
      ) : (
        <>
          Out of stock
          <a
            href={`/notify/${model}`}
            className="notify-link"
            aria-label="Get notified when this product becomes available"
          >
            Get notified when available
          </a>
        </>
      )}
    </span>
  );
});

ProductQuantity.displayName = 'ProductQuantity';
