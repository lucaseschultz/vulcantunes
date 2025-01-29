import { memo } from "react";
import { Product } from "@/src/app/lib/definitions";
import { ProductItem } from "./product-item";
import { NoProductsFound } from "./no-products-found";

export const ProductsList = memo(function ProductsList({ products }: { products: readonly Product[] }) {
  if (products.length === 0) {
    return <NoProductsFound />
  }

  return (
    <div className="products-list" aria-label="Products list">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  )
})
