'use client'

import {useState} from 'react'
import Image from 'next/image'

interface ProductImageProps {
  productImage: string
  productName: string
  width: number
  height: number
  priority?: boolean
  className?: string
}

export function ProductImage({
                               productImage,
                               productName,
                               width,
                               height,
                               priority = false,
                               className = "product-main-image"
                             }: ProductImageProps) {
  const [imgSrc, setImgSrc] = useState(`/products/${productImage}`)
  const fallbackImage = '/products/image-coming-soon.jpg'

  return (
    <Image
      src={imgSrc}
      alt={`${productName} image`}
      width={width}
      height={height}
      priority={priority}
      className={className}
      onError={() => setImgSrc(fallbackImage)}
    />
  )
}
