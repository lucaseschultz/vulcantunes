import {memo} from "react";
import {Product} from "@/src/app/lib/definitions";

export const ProductsList = memo(function ProductsList({ products }: { products: readonly Product[] }) {
  return (
    <div className="products-list" aria-label="Products list">
      {products.map(({name, continent, id}) => (
        <div key={id} className="product-item">
          <span className="product-name">{name}</span>
          <span className="product-continent">{continent}</span>
        </div>
      ))}
    </div>
  )
})