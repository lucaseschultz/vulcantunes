import { memo, useEffect, useState } from "react";
import { Product, ProductsListProps } from "@/src/app/lib/definitions";
import { ProductListItem } from "./product-list-item";
import { NoProductsFound } from "./no-products-found";
import { ProductsSkeleton } from "@/src/app/ui/(overview)/layout/skeletons";

export const ProductsList = memo(function ProductsList({
   featuresFilter
 }: ProductsListProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchProducts() {
      try {
        setIsLoading(true)
        const response = await fetch('/api/products')
        const data = await response.json()
        setProducts(data)
      } finally {
        setIsLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const filteredProducts = products.filter((product) => {
    return featuresFilter.length === 0 ||
      featuresFilter.split(',').every(feature => product.features?.includes(feature))
  })

  if (isLoading) {
    return <ProductsSkeleton />
  }

  if (filteredProducts.length === 0) {
    return <NoProductsFound />
  }

  return (
    <div className="products-list" aria-label="Products list">
      {filteredProducts.map((product) => (
        <ProductListItem
          key={product.product_model}
          product={product}
        />
      ))}
    </div>
  )
})
