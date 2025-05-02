'use client'

import {DisplayNavItemsProps} from './definitions'
import {NavItem} from '@/src/app/ui/(overview)/layout/components/nav-item'

export function DisplayNavItems({NavName, NavItems}: DisplayNavItemsProps) {
  return (
    <ul className={NavName}>
      {NavItems.map((navItem) => (
        <NavItem key={navItem.name} navItem={navItem}></NavItem>
      ))}
    </ul>
  )
}
