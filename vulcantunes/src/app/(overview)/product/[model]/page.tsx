import { Suspense } from 'react'
import '@/src/app/ui/(overview)/product/[model]/styles/[model].css'
import { notFound } from 'next/navigation'
import { getProduct } from "@/src/app/lib/server-actions"
import { getErrorType, getErrorMessage } from "@/src/app/lib/utils"
import { ProductSkeleton } from "@/src/app/ui/(overview)/layout/components/skeletons"
import ProductPageItem from "@/src/app/ui/(overview)/product/[model]/components/product-page-item"
import ProductViewTracker from "@/src/app/ui/(overview)/product/[model]/components/product-view-tracker"
import { ErrorMessage } from "@/src/app/ui/(overview)/layout/components/error-message"
import { ProductPageProps } from "@/src/app/lib/definitions";

export default async function Page({ params }: ProductPageProps) {
  try {
    const resolvedParams = await (params as unknown as Promise<typeof params>);
    const product = await getProduct(resolvedParams.model)

    if (!product) {
      return notFound()
    }

    return (
      <div className="product-page-container">
        <Suspense fallback={<ProductSkeleton/>}>
          <ProductViewTracker productId={product.product_id} />
          <ProductPageItem product={product} />
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
