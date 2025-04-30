import '@/src/app/ui/(overview)/wish-list/styles/wish-list.css'
import WishListContent from '@/src/app/ui/(overview)/wish-list/components/wish-list-content'
import {ProductsErrorBoundary} from "@/src/app/ui/(overview)/layout/components/products-error-boundary";

export default function Page() {
  return (
    <div className="wish-list-container">
      <h1>Your Wish List</h1>
      <ProductsErrorBoundary>
        <WishListContent/>
      </ProductsErrorBoundary>
    </div>
  );
};
