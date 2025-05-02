'use client'

import Link from "next/link"
import Image from "next/image"
import {usePathname} from 'next/navigation'
import {DisplayNavItemsProps, IconNavItem, ImageNavItem} from './definitions'
import {useNotification} from '@/src/app/ui/layout/components/notification-context'

export function DisplayNavItems({NavName, NavItems}: DisplayNavItemsProps) {
  const pathname = usePathname()

  return (
    <ul className={NavName}>
      {NavItems.map((NavItem) => {
        const isImage = typeof NavItem.icon === 'string'
        return (
          <li key={NavItem.name}>
            <Link
              href={NavItem.href}
              aria-label={`${NavItem.name} button`}
              title={NavItem.name}
            >
              {isImage ? (
                <Image
                  src={NavItem.icon as string}
                  alt={isImage ? (NavItem as ImageNavItem).alt : NavItem.name}
                  width={(NavItem as ImageNavItem).width}
                  height={(NavItem as ImageNavItem).height}
                />
              ) : (
                <NavItem.icon
                  size={(NavItem as IconNavItem).size}
                  aria-hidden="true"
                  weight={NavItem.href === pathname ? 'fill' : 'regular'}
                />
              )}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

// Custom renderer for nav items with notification support
export function CustomDisplayNavItems({NavName, NavItems}: DisplayNavItemsProps) {
  const {showWishlistNotification} = useNotification();
  const pathname = usePathname();

  return (
    <ul className={NavName}>
      {NavItems.map((NavItem) => {
        const isImage = typeof NavItem.icon === 'string';
        const isWishlistItem = NavItem.name === 'Wish List';

        return (
          <li key={NavItem.name}>
            <Link
              href={NavItem.href}
              aria-label={`${NavItem.name} button`}
              title={NavItem.name}
            >
              {isImage ? (
                <Image
                  src={NavItem.icon as string}
                  alt={isImage ? (NavItem as ImageNavItem).alt : NavItem.name}
                  width={(NavItem as ImageNavItem).width}
                  height={(NavItem as ImageNavItem).height}
                />
              ) : (
                <NavItem.icon
                  size={(NavItem as IconNavItem).size}
                  aria-hidden="true"
                  weight={NavItem.href === pathname ? 'fill' : 'regular'}
                />
              )}
            </Link>

            {isWishlistItem && showWishlistNotification && (
              <div className="wishlist-notification">
                Added to wishlist!
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
