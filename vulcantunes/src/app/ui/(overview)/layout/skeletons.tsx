export function ProductSkeleton() {
  return (
    <div className="product-item shimmer">
      <div className="product-skeleton-image" />
      <div className="product-details">
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
