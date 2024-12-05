'use client'

import type { ImageNavItem, IconNavItem } from '@/app/lib/definitions';
import { MagnifyingGlass, ShoppingCart, User, Heart } from "@phosphor-icons/react/dist/ssr"
import { DisplayNavItems } from '@/app/lib/utils';

const ICON_SIZE = 24;
const TopNavLeft: ImageNavItem[] = [
    {
    name: 'Home Page Link',
    href: '/',
    icon: "/vulcantunes-icon.png",
    alt: 'VulcanTunes Icon',
    width: ICON_SIZE,
    height: ICON_SIZE,
    }
];
const TopNavRight: IconNavItem[] = [
  {
    name: 'Search',
    href: '/search',
    icon: MagnifyingGlass,
    size: ICON_SIZE,
  },
  {
    name: 'Cart',
    href: '/cart',
    icon: ShoppingCart,
    size: ICON_SIZE,
  },
  {
    name: 'Wishlist',
    href: '/wishlist',
    icon: Heart,
    size: ICON_SIZE,
  },
  {
    name: 'Account',
    href: '/account',
    icon: User,
    size: ICON_SIZE,
  },
];

export default function TopNav() {
  return (
    <nav className='top-nav' aria-label='Main navigation'>
      <DisplayNavItems NavName='top-nav-left' NavItems={TopNavLeft} />
      <DisplayNavItems NavName='top-nav-right' NavItems={TopNavRight} />
    </nav>
  );
}