import { memo, useEffect, useState } from "react";
import { Product } from "@/src/app/lib/definitions";
import { ProductItem } from "./product-item";
import { NoProductsFound } from "./no-products-found";

export const ProductsList = memo(function ProductsList({
   searchFilter,
   featuresFilter
 }: {
  searchFilter: string,
  featuresFilter: string
}) {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch('/api/products')
      const data = await response.json()
      setProducts(data)
    }
    fetchProducts()
  }, [])

  const filteredProducts = products.filter((product) => {
    const matchesSearch = !searchFilter ||
      product.product_model.toLowerCase().includes(searchFilter)

    const matchesFeatures = featuresFilter.length === 0 ||
      featuresFilter.split(',').every(feature => product.features?.includes(feature))

    return matchesSearch && matchesFeatures
  })

  if (filteredProducts.length === 0) {
    return <NoProductsFound />
  }

  return (
    <div className="products-list" aria-label="Products list">
      {filteredProducts.map((product) => (
        <ProductItem key={product.product_id} product={product} />
      ))}
    </div>
  )
})
