import {ProductQuantity} from "@/src/app/ui/(overview)/layout/components/product-quantity";

interface ProductMetadataProps {
  price: number;
  quantity: number;
  model: string;
  isDiscontinued: boolean;
}

export function ProductMetadata({
                                  price,
                                  quantity,
                                  model,
                                  isDiscontinued
                                }: ProductMetadataProps) {
  return (
    <div className="product-metadata">
      <span className="product-price">${price}</span>
      <ProductQuantity
        quantity={quantity}
        model={model}
        isDiscontinued={isDiscontinued}
      />
    </div>
  );
}
