'use client'

import Link from "next/link"
import Image from "next/image"
import { usePathname } from 'next/navigation'
import type { IconNavItem, ImageNavItem, OptionGroup, RenderOptionValuesProps } from './definitions'

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

export function renderOptionValues({ options, productModel, isOdd = false }: RenderOptionValuesProps) {
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
  }, [] as OptionGroup[]);

  // Return the rendered option groups
  return (
    <div className="product-options">
      {optionsArray.map(({ name, values, optionType }) => {
        // Find the default value for dropdown
        const defaultOptionValue = values.find(value => value.isDefault)?.value || values[0].value;

        return (
          <div key={name} className="option-group">
            <label>{name}</label>

            {/*optionType 0 is dropdown*/}
            {optionType === 0 && (
              <select
                name={`${productModel}-option-dropdown`}
                id={`${productModel}-option-dropdown`}
                className={'product-option-dropdown'}
                style={{
                  background: isOdd ? 'var(--foreground)' : 'var(--background)'
                }}
                defaultValue={defaultOptionValue}
              >
                {values.map(({ value, price, prefix }) => (
                  <option
                    key={value}
                    value={value}
                  >
                    {value}
                    {parseFloat(price) > 0 && ` (${prefix}${price})`}
                  </option>
                ))}
              </select>
            )}

            {/*optionType 1 is text input*/}
            {optionType === 1 && (
              <input
                type="text"
                className="product-option-text"
                name={`${productModel}-${optionType}`}
                placeholder={`Enter text`}
                style={{background: isOdd ? 'var(--foreground)' : 'var(--background)'}}
              />
            )}

            {/*optionType 2 is radio buttons*/}
            {optionType === 2 && (
              <fieldset className="product-option-radio">
                <ul>
                  {values.map(({ value, price, prefix, isDefault }) => (
                    <li key={value} className="radio-option">
                      <input
                        type="radio"
                        id={`${productModel}-${name}-${value}-option`}
                        name={`${productModel}-${name}-option`}
                        value={value}
                        defaultChecked={isDefault}
                      />
                      <label htmlFor={`${productModel}-${name}-${value}-option`}>
                        {" "}{value}
                        {parseFloat(price) > 0 && ` (${prefix}${price})`}
                      </label>
                    </li>
                  ))}
                </ul>
              </fieldset>
            )}
          </div>
        );
      })}
    </div>
  );
}
