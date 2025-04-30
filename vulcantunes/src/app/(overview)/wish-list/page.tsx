import '@/src/app/ui/(overview)/wish-list/styles/wish-list.css'
import WishListContent from '@/src/app/ui/(overview)/wish-list/components/wish-list-content'

export default function Page() {
  return (
    <div className="wish-list-container">
      <h1>Your Wish List</h1>
      <WishListContent/>
    </div>
  );
};
