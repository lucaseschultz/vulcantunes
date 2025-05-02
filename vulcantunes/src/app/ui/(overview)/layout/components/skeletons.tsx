export function ProductSkeleton() {
  return (
    <div className="product-item-skeleton">
      <div className="product-skeleton-image"/>
      <div className="product-info">
        <div className="product-skeleton-name"/>
        <div className="product-skeleton-description"/>
        <div className="product-skeleton-price"/>
      </div>
    </div>
  );
}

export function ProductsSkeleton() {
  return (
    <div className="products-list">
      <ProductSkeleton/>
      <ProductSkeleton/>
      <ProductSkeleton/>
      <ProductSkeleton/>
      <ProductSkeleton/>
      <ProductSkeleton/>
      <ProductSkeleton/>
      <ProductSkeleton/>
    </div>
  );
}

export function HeaderLogoSkeleton() {
  return (
    <div className="header-logo-skeleton"></div>
  )
}
