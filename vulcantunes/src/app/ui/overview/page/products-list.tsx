import { memo, useEffect, useState } from "react";
import { Product, ProductsListProps } from "@/src/app/lib/definitions";
import { ProductItem } from "./product-item";
import { NoProductsFound } from "./no-products-found";
import { ProductsSkeleton } from "./skeletons";

export const ProductsList = memo(function ProductsList({
   searchFilter,
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
    const matchesSearch = !searchFilter ||
      product.product_model.toLowerCase().includes(searchFilter)

    const matchesFeatures = featuresFilter.length === 0 ||
      featuresFilter.split(',').every(feature => product.features?.includes(feature))

    return matchesSearch && matchesFeatures
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
        <ProductItem key={product.product_id} product={product} />
      ))}
    </div>
  )
})
