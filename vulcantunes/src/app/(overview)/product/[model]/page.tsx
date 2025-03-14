import { Suspense } from 'react'
import '@/src/app/ui/overview/product/[model]/[model].css'
import { notFound } from 'next/navigation'
import { getProduct } from "@/src/app/lib/server-actions"
import { ProductSkeleton } from "@/src/app/ui/overview/layout/skeletons"
import ProductDetails from "@/src/app/ui/overview/product/[model]/product-details"

export default async function Page({ params }: { params: { model: string } }) {
  const product = await getProduct(params.model)

  if (!product) {
    notFound()
  }

  return (
    <Suspense fallback={<ProductSkeleton/>}>
      <ProductDetails product={product} />
    </Suspense>
  )
}
