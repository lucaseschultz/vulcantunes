'use client'

import type { ImageNavItem, IconNavItem } from '@/app/lib/definitions';
import { ShoppingCart, User, Heart } from "@phosphor-icons/react/dist/ssr"
import { DisplayNavItems } from '@/app/lib/utils';
import { useEffect, useState } from 'react';

const getIconSize = () => window.innerWidth >= 768 ? 28 : 24;

export default function TopNav() {
  const [iconSize, setIconSize] = useState(getIconSize());

  useEffect(() => {
    const handleResize = () => setIconSize(getIconSize());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const TopNavLeft: ImageNavItem[] = [{
    name: 'Home Page Link',
    href: '/',
    icon: "/vulcantunes-icon.png",
    alt: 'VulcanTunes Icon',
    width: iconSize,
    height: iconSize,
  }];

  const TopNavRight: IconNavItem[] = [{
    name: 'Cart',
    href: '/cart',
    icon: ShoppingCart,
    size: iconSize,
  }, {
    name: 'Wishlist',
    href: '/wishlist',
    icon: Heart,
    size: iconSize,
  }, {
    name: 'Account',
    href: '/account',
    icon: User,
    size: iconSize,
  }];

  return (
    <nav className='top-nav' aria-label='Main navigation'>
      <DisplayNavItems NavName='top-nav-left' NavItems={TopNavLeft} />
      <DisplayNavItems NavName='top-nav-right' NavItems={TopNavRight} />
    </nav>
  );
}