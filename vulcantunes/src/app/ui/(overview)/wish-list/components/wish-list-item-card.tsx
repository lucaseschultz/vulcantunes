import {WishListItem} from "@/src/app/lib/definitions";
import Image from "next/image";
import Link from "next/link";

const WishListItemCard = ({item, onRemove}: { item: WishListItem, onRemove: (id: string) => void }) => (
  <div className="wish-list-item-card">
    <div className="wish-list-item-image">
      <Image
        src={item.imageUrl}
        alt={item.name}
        width={150}
        height={150}
        className="wish-list-item-image"
      />
    </div>
    <div className="wish-list-item-content">
      <h2 className="wish-list-item-title">{item.name}</h2>
      <p className="wish-list-item-price">${item.price}</p>
      <p className="wish-list-item-description">{item.description}</p>
      <div className="wish-list-item-actions">
        <button
          className="wish-list-remove-button"
          onClick={() => onRemove(item.id)}
        >
          Remove
        </button>
        <Link
          href={`/product/${item.id}`}
          className="wish-list-view-button"
        >
          View Details
        </Link>
      </div>
    </div>
  </div>
)