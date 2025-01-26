import { memo } from "react";
import { Product } from "@/src/app/lib/definitions";
import { ProductItem } from "./product-item";

export const ProductsList = memo(function ProductsList({ products }: { products: readonly Product[] }) {
  return (
    <div className="products-list" aria-label="Products list">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  )
})
