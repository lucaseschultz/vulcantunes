'use client'

import Link from "next/link"
import Image from "next/image"
import { usePathname } from 'next/navigation'
import type { IconNavItem, ImageNavItem } from './definitions'

export function DisplayNavItems({ NavName, NavItems }: {
  NavName: string,
  NavItems: (IconNavItem|ImageNavItem)[]
}) {
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