import { memo, useMemo, useState } from 'react'
import Image from 'next/image'
import type { ProductItemProps } from '@/src/app/lib/definitions'
import { ProductQuantity } from "@/src/app/ui/overview/layout/product-item-quantity";
import { renderOptionValues } from '@/src/app/lib/client-actions'

export const ProductItem = memo(function ProductItem({ product, isOdd }: ProductItemProps) {
  const { product_status, product_quantity, product_model, product_description, product_name, product_image, product_price, options } = product

  const [imgSrc, setImgSrc] = useState(`/${product_image}`)

  const truncatedDescription = useMemo(() =>
      product_description.length > 100
        ? `${product_description.slice(0, 100)}...`
        : product_description,
    [product_description]
  );

  const optionsArray = useMemo(() => {
    if (!product.options) return [];
    return product.options.split(',').reduce((acc, opt) => {
      const [type, value, price, prefix, optionType] = opt.split(':');
      const existingType = acc.find(o => o.type === type);
      if (existingType) {
        existingType.values.push(`${value}:${price}:${prefix}`);
      } else {
        acc.push({
          type,
          values: [`${value}:${price}:${prefix}`],
          optionType: parseInt(optionType)
        });
      }
      return acc;
    }, [] as Array<{type: string, values: string[], optionType: number}>);
  }, [product.options]);

  return (
    <div
      className="product-item"
      data-testid={`product-${product_model}`}
      id={`${product_model}`}
    >
      <Image
        src={imgSrc}
        alt={`${imgSrc} image`}
        width={200}
        height={200}
        style={{
          height: '200',
          width: 'auto',
        }}
        priority={false}
        onError={() => setImgSrc('/products/image-coming-soon.jpg')}
      />
      <div className="product-details">
        <span className="product-name">{product_name}</span>
        <p className="product-description">{truncatedDescription}</p>
        {options && options.length > 0 && product_quantity > 0 && (
          <div className="product-options">
            {optionsArray.map(({ type, values, optionType }) => (
              <div key={type} className="option-group">
                <label>{type}</label>
                {renderOptionValues(type, values, product.product_model, optionType, isOdd)}
              </div>
            ))}
          </div>
        )}
        <div className="product-metadata">
          <span className="product-price">${product_price}</span>
          <ProductQuantity quantity={product_quantity} model={product_model}/>
          {product_status === 2 && (
            <span className="product-discontinued">Discontinued</span>
          )}
        </div>
      </div>
    </div>
  );
});
