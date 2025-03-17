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

export function renderOptionValues(options: string | null, productModel: string, isOdd: boolean = false) {
  if (!options || options.length === 0) return null;

  // Parsing options string into structured data, to be able to use it
  const optionsArray = options.split(',').reduce((acc, opt) => {
    const [name, value, price, prefix, type, defaultValue] = opt.split(':');

    const existingType = acc.find(o => o.name === name);
    if (existingType) {
      existingType.values.push({
        value,
        price,
        prefix,
        isDefault: defaultValue === '1'
      });
    } else {
      acc.push({
        name,
        values: [{
          value,
          price,
          prefix,
          isDefault: defaultValue === '1'
        }],
        optionType: parseInt(type)
      });
    }
    return acc;
  }, [] as Array<{
    name: string,
    values: Array<{value: string, price: string, prefix: string, isDefault: boolean}>,
    optionType: number
  }>);

  // Return the rendered option groups
  return (
    <>
      {optionsArray.map(({ name, values, optionType }) => (
        <div key={name} className="option-group">
          <label>{name}</label>
          <div className="option-values">
            {optionType === 0 && (
              <select
                name={`option-${name}-${productModel}`}
                id={`option-${name}-${productModel}`}
                className={isOdd ? 'option-select-odd' : 'option-select'}
              >
                {values.map(({ value, price, prefix, isDefault }) => (
                  <option
                    key={value}
                    value={value}
                    selected={isDefault}
                  >
                    {value} {price !== '0' ? `(${prefix}$${price})` : ''}
                  </option>
                ))}
              </select>
            )}

            {optionType === 1 && (
              <div className="radio-options">
                {values.map(({ value, price, prefix, isDefault }) => (
                  <div key={value} className="radio-option">
                    <input
                      type="radio"
                      id={`option-${name}-${value}-${productModel}`}
                      name={`option-${name}-${productModel}`}
                      value={value}
                      defaultChecked={isDefault}
                    />
                    <label htmlFor={`option-${name}-${value}-${productModel}`}>
                      {value} {price !== '0' ? `(${prefix}$${price})` : ''}
                    </label>
                  </div>
                ))}
              </div>
            )}

            {optionType === 2 && (
              <div className="checkbox-options">
                {values.map(({ value, price, prefix, isDefault }) => (
                  <div key={value} className="checkbox-option">
                    <input
                      type="checkbox"
                      id={`option-${name}-${value}-${productModel}`}
                      name={`option-${name}-${value}-${productModel}`}
                      value={value}
                      defaultChecked={isDefault}
                    />
                    <label htmlFor={`option-${name}-${value}-${productModel}`}>
                      {value} {price !== '0' ? `(${prefix}$${price})` : ''}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  );
}
