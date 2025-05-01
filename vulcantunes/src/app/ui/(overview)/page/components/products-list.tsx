import {memo, useEffect, useState, useMemo} from "react";
import {Product, ProductsListProps} from "@/src/app/lib/definitions";
import {ProductListItem} from "./product-list-item";
import {NoProductsFound} from "./no-products-found";
import {ProductsSkeleton} from "@/src/app/ui/(overview)/layout/components/skeletons";

export const ProductsList = memo(function ProductsList({
                                                         featuresFilters
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

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (featuresFilters.length === 0) return true;

      if (!product.features) return false;

      const filterFeatures = featuresFilters.split(',');
      const productFeatures = product.features.split(',').map(f => f.trim().toLowerCase());

      return filterFeatures.every(feature => productFeatures.includes(feature));
    });
  }, [products, featuresFilters]);

  if (isLoading) {
    return <ProductsSkeleton/>
  }

  if (filteredProducts.length === 0) {
    return <NoProductsFound/>
  }

  return (
    <div className="products-list" aria-label="Products list">
      {filteredProducts.map((product) => (
        <ProductListItem
          product={product}
        />
      ))}
    </div>
  )
})
