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

  return (
    <div className={NavName}>
      {NavItems.map((item, index) => {
        const isWishlistItem = item.name === 'Wish List';

        return (
          <div key={index} className="nav-item-container" style={{
            position: 'relative',
            display: 'inline-block',
            margin: '0 10px' // Add consistent margin to maintain spacing
          }}>
            <a href={item.href} className="nav-item" aria-label={item.name}>
              {'alt' in item ? (
                <img src={item.icon as string} alt={item.alt} width={item.width} height={item.height}/>
              ) : (
                <item.icon size={item.size}/>
              )}
            </a>

            {isWishlistItem && showWishlistNotification && (
              <div className="wishlist-notification" style={{
                position: 'absolute',
                bottom: '-20px',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: '#4CAF50',
                color: 'white',
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '12px',
                whiteSpace: 'nowrap',
                zIndex: 10,
              }}>
                Added to wishlist!
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
