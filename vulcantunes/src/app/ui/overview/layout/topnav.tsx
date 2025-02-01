'use client'

import type { ImageNavItem, IconNavItem } from '../../../lib/definitions'
import { ShoppingCart, User, Heart, Info } from "@phosphor-icons/react/dist/ssr"
import { DisplayNavItems } from '../../../lib/actions'
import { useMemo } from 'react'
import { fetchWindowSize } from '../../../lib/utils'

export default function TopNav() {
  const { width } = fetchWindowSize()
  const iconSize = useMemo(() => (width >= 768 ? 28 : 24), [width])

  const topNavLeft = useMemo(() => [{
    name: 'Home Page',
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
  }] satisfies (ImageNavItem | IconNavItem)[], [iconSize])

  const topNavRight = useMemo(() => [{
    name: 'Wish List',
    href: '/account/wishlist',
    icon: Heart,
    size: iconSize,
  }, {
    name: 'Account',
    href: '/account',
    icon: User,
    size: iconSize,
  }, {
    name: 'Information',
    href: '/info',
    icon: Info,
    size: iconSize,
  }] satisfies IconNavItem[], [iconSize])


  return (
    <nav className='top-nav' aria-label='Main navigation'>
      <DisplayNavItems NavName='top-nav-left' NavItems={topNavLeft} />
      <DisplayNavItems NavName='top-nav-right' NavItems={topNavRight} />
    </nav>
  )
}
