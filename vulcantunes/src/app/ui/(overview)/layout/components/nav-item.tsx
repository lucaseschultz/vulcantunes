'use client'

import Link from 'next/link'
import Image from 'next/image'
import {IconNavItem, ImageNavItem} from '@/src/app/lib/definitions'
import {useNotification} from '@/src/app/ui/layout/components/notification-context'
import {WishlistNotification} from './wish-list-notification'

interface NavItemProps {
  navItem: IconNavItem | ImageNavItem
}

export function NavItem({navItem}: NavItemProps) {
  const {
    showWishlistNotification
  } = useNotification();

  // Determine if this is an image nav item
  const isImageNavItem = 'alt' in navItem;

  return (
    <li className="nav-item">
      <Link href={navItem.href} className="nav-link">
        {isImageNavItem ? (
          <Image
            src={(navItem as ImageNavItem).icon}
            alt={(navItem as ImageNavItem).alt}
            width={(navItem as ImageNavItem).width}
            height={(navItem as ImageNavItem).height}
          />
        ) : (
          <navItem.icon size={(navItem as IconNavItem).size}/>
        )}
      </Link>

      {/* Render notification if this is the Wish List item and notification should be shown */}
      {navItem.name === 'Wish List' && showWishlistNotification && (
        <WishlistNotification/>
      )}
    </li>
  )
}
