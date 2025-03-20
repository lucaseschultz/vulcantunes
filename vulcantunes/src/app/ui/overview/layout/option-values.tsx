'use client'

import { OptionValuesProps, OptionGroup } from '@/src/app/lib/definitions'

export function OptionValues({ options, productModel }: OptionValuesProps) {
  if (!options || options.length === 0) return null;

  // Parse options string into structured data
  const optionsArray = options.split(',').reduce((acc, opt) => {
    const [name, value, price, prefix, type, defaultValue] = opt.split(':');
    const isDefault = defaultValue === '1';
    const optionType = parseInt(type);

    const existingType = acc.find(o => o.name === name);
    if (existingType) {
      existingType.values.push({ value, price, prefix, isDefault });
    } else {
      acc.push({
        name,
        values: [{ value, price, prefix, isDefault }],
        optionType
      });
    }
    return acc;
  }, [] as OptionGroup[]);

  // Render price suffix if price exists
  const renderPrice = (price: string, prefix: string) => {
    return parseFloat(price) > 0 ? ` (${prefix}${price})` : '';
  };

  return (
    <div className="product-options">
      {optionsArray.map(({ name, values, optionType }) => {
        const defaultOptionValue = values.find(value => value.isDefault)?.value || values[0]?.value;

        return (
          <div key={name} className="option-group">
            <label>{name}</label>

            {/* Dropdown (optionType 0) */}
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

            {/* Text input (optionType 1) */}
            {optionType === 1 && (
              <input
                type="text"
                className="product-option-text"
                name={`${productModel}-${optionType}`}
                placeholder={`Enter text`}
                style={{background: isOdd ? 'var(--foreground)' : 'var(--background)'}}
              />
            )}

            {/* Radio buttons (optionType 2) */}
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
                        {value}
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
