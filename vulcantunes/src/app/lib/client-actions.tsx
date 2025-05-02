'use client'

import {DisplayNavItemsProps} from './definitions'
import {useNotification} from '@/src/app/ui/layout/components/notification-context'
import {NavItem} from '@/src/app/ui/(overview)/layout/components/nav-item'

export function DisplayNavItems({NavName, NavItems}: DisplayNavItemsProps) {
  return (
    <ul className={NavName}>
      {NavItems.map((navItem) => (
        <NavItem key={navItem.name} navItem={navItem}/>
      ))}
    </ul>
  )
}

// Custom renderer for nav items with notification support
export function CustomDisplayNavItems({NavName, NavItems}: DisplayNavItemsProps) {
  const {showWishlistNotification} = useNotification();

  return (
    <ul className={NavName}>
      {NavItems.map((navItem) => (
        <NavItem
          key={navItem.name}
          navItem={navItem}
          renderNotification={(item) =>
            item.name === 'Wish List' && showWishlistNotification ? (
              <div className="wishlist-notification">
                Added to wishlist!
              </div>
            ) : null
          }
        />
      ))}
    </ul>
  )
}
