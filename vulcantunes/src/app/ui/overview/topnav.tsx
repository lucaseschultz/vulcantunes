'use client'

import type { ImageNavItem, IconNavItem } from '@/app/lib/definitions'
import { ShoppingCart, User, Heart } from "@phosphor-icons/react/dist/ssr"
import { DisplayNavItems } from '@/app/lib/utils'
import { useMemo } from 'react'
import { fetchWindowSize } from '@/app/lib/utils'

export default function TopNav() {
  const { width } = fetchWindowSize()
  const iconSize = useMemo(() => (width >= 768 ? 28 : 24), [width])

  const topNavLeft: (ImageNavItem | IconNavItem)[] = useMemo(() => [{
    name: 'Home Page Link',
    href: '/',
    icon: "/vulcantunes-icon.png",
    alt: 'VulcanTunes Icon',
    width: iconSize,
    height: iconSize,
  }, {
    name: 'Shopping Cart',
    href: '/cart',
    icon: ShoppingCart,
    size: iconSize,
  }], [iconSize])

  const topNavRight: IconNavItem[] = useMemo(() => [{
    name: 'Wishlist',
    href: '/wishlist',
    icon: Heart,
    size: iconSize,
  }, {
    name: 'Account',
    href: '/account',
    icon: User,
    size: iconSize,
  }], [iconSize])


  return (
    <nav className='top-nav' aria-label='Main navigation'>
      <DisplayNavItems NavName='top-nav-left' NavItems={topNavLeft} />
      <DisplayNavItems NavName='top-nav-right' NavItems={topNavRight} />
    </nav>
  )
}
