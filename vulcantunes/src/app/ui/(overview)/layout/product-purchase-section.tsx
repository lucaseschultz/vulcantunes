import { OptionValues } from '@/src/app/ui/(overview)/layout/option-values';
import { ProductMetadata } from '@/src/app/ui/(overview)/layout/product-metadata';
import { ProductPurchaseSectionProps } from '@/src/app/lib/definitions';

export function ProductPurchaseSection({
  options,
  productModel,
  productQuantity,
  productPrice,
  isDiscontinued,
}: ProductPurchaseSectionProps) {
  const hasOptions = options && options.length > 0;
  const isInStock = productQuantity > 0;

  return (
    <div className="product-purchase-section">
      {hasOptions && isInStock && (
        <OptionValues
          options={options}
          productModel={productModel}
        />
      )}

      <ProductMetadata
        price={productPrice}
        quantity={productQuantity}
        model={productModel}
        isDiscontinued={isDiscontinued}
      />

    </div>
  );
}
