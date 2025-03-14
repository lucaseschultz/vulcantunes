import { Suspense } from 'react'
import '@/src/app/ui/overview/product/[model]/[model].css'
import { notFound } from 'next/navigation'
import { getProduct } from "@/src/app/lib/server-actions"
import { getErrorType } from "@/src/app/lib/utils"
import { ProductSkeleton } from "@/src/app/ui/overview/layout/skeletons"
import ProductDetails from "@/src/app/ui/overview/product/[model]/product-details"
import { ErrorMessage } from "@/src/app/ui/overview/layout/error-message"
import { PRODUCTS_ERROR_MESSAGES } from '@/src/app/lib/constants'

export default async function Page({ params }: { params: { model: string } }) {
  try {
    const product = await getProduct(params.model)

    if (!product) {
      return notFound()
    }

    return (
      <Suspense fallback={<ProductSkeleton/>}>
        <ProductDetails product={product} />
      </Suspense>
    )
  } catch (error: any) {
    console.error("Error fetching product:", error)

    if (error.status === 404 || getErrorType(error) === 'notFound') {
      return notFound()
    }

    const errorType = getErrorType(error)
    return (
      <ErrorMessage
        {...PRODUCTS_ERROR_MESSAGES[errorType]}
        error={error}
      />
    )
  }
}
