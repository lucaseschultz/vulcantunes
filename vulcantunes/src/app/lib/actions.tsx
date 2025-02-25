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
export function renderOptionValues(type: string, values: string[], productModel: string, optionType: number, isOdd: boolean) {
  switch (optionType) {
    // optionType 0 is dropdown
    case 0:
      return (
        <select className="product-option-dropdown" name={`${productModel}-${type}`} style={{
          background: isOdd ? 'var(--foreground)' : 'var(--background)'
        }}>
          <option value="">Select {type}</option>
          {values.map(value => {
            const [optionValue, price, prefix] = value.split(':');
            return (
              <option key={optionValue} value={optionValue}>
                {optionValue}
                {parseFloat(price) > 0 && ` (${prefix}$${parseFloat(price).toFixed(2)})`}
              </option>
            );
          })}
        </select>
      );
    // optionType 1 is text input
    case 1:
      return (
        <input
          type="text"
          className="product-option-text"
          name={`${productModel}-${type}`}
          placeholder={`Enter ${type}`}
          style={{background: isOdd ? 'var(--foreground)' : 'var(--background)'}}
        />
      );
    // optionType 2 is radio buttons
    case 2:
      return (
        <div className="product-option-radio-group">
          {values.map(value => {
            const [optionValue, price, prefix] = value.split(':');
            return (
              <label key={optionValue} className="product-option-radio">
                <input
                  type="radio"
                  name={`${productModel}-${type}`}
                  value={optionValue}
                />
                {optionValue}
                {parseFloat(price) > 0 && ` (${prefix}$${parseFloat(price).toFixed(2)})`}
              </label>
            );
          })}
        </div>
      );
    default:
      return null;
  }
}
