import { Suspense } from 'react'
import '@/src/app/ui/overview/product/[model]/[model].css'
import { notFound } from 'next/navigation'
import { getProduct } from "@/src/app/lib/server-actions"
import { getErrorType, getErrorMessage } from "@/src/app/lib/utils"
import { ProductSkeleton } from "@/src/app/ui/overview/layout/skeletons"
import ProductPageItemDetails from "@/src/app/ui/overview/product/[model]/product-page-item-details"
import ProductViewTracker from "@/src/app/ui/overview/product/[model]/product-view-tracker"
import { ErrorMessage } from "@/src/app/ui/overview/layout/error-message"

export default async function Page({ params }: { params: { model: string } }) {
  try {
    const product = await getProduct(params.model)

    if (!product) {
      return notFound()
    }

    return (
      <div className="product-page-container">
        <Suspense fallback={<ProductSkeleton/>}>
          <ProductViewTracker productId={product.product_id} />
          <ProductPageItemDetails product={product} />
        </Suspense>
      </div>
    )
  } catch (error: any) {
    console.error("Error fetching product:", error)

    if (error.status === 404 || getErrorType(error) === 'notFound') {
      return notFound()
    }

    return (
      <ErrorMessage
        {...getErrorMessage(error)}
        error={error}
      />
    )
  }
}
