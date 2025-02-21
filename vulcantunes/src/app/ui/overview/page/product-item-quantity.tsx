import { memo } from "react";

export const ProductQuantity = memo(({ quantity, model }: { quantity: number, model: string }) => (
  <span className={`product-quantity ${quantity === 0 ? 'out-of-stock' : ''}`}>
    {quantity > 0 ? (
      `In stock: ${quantity}`
    ) : (
      <>
        Out of stock
        <a href={`/notify/${model}`} className="notify-link">
          Get notified when available
        </a>
      </>
    )}
  </span>
));
