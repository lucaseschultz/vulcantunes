'use client'

import Link from "next/link"
import Image from "next/image"
import {usePathname} from 'next/navigation'
import {IconNavItem, ImageNavItem} from '@/src/app/lib/definitions'


interface NavItemRendererProps {
  navItem: IconNavItem | ImageNavItem
  renderNotification?: (navItem: IconNavItem | ImageNavItem) => React.ReactNode | null
}

export function NavItem({navItem, renderNotification}: NavItemRendererProps) {
  const pathname = usePathname()
  const isImage = typeof navItem.icon === 'string'

  return (
    <li key={navItem.name}>
      <Link
        href={navItem.href}
        aria-label={`${navItem.name} button`}
        title={navItem.name}
      >
        {isImage ? (
          <Image
            src={navItem.icon as string}
            alt={isImage ? (navItem as ImageNavItem).alt : navItem.name}
            width={(navItem as ImageNavItem).width}
            height={(navItem as ImageNavItem).height}
          />
        ) : (
          <navItem.icon
            size={(navItem as IconNavItem).size}
            aria-hidden="true"
            weight={navItem.href === pathname ? 'fill' : 'regular'}
          />
        )}
      </Link>
      {renderNotification && renderNotification(navItem)}
    </li>
  )
}
