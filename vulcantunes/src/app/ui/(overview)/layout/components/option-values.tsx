'use client'

import {OptionValuesProps, OptionGroup} from '@/src/app/lib/definitions'

export function OptionValues({options, productModel}: OptionValuesProps) {
  if (!options || options.length === 0) return null;

  // Parse options string into structured data
  const optionsArray = options.split(',').reduce((acc, opt) => {
    const [name, value, price, prefix, type, defaultValue] = opt.split(':');
    const isDefault = defaultValue === '1';
    const optionType = parseInt(type);

    const existingType = acc.find(o => o.name === name);
    if (existingType) {
      existingType.values.push({value, price, prefix, isDefault});
    } else {
      acc.push({
        name,
        values: [{value, price, prefix, isDefault}],
        optionType
      });
    }
    return acc;
  }, [] as OptionGroup[]);

  // Render price suffix if price exists
  const renderPrice = (price: string, prefix: string) => {
    return parseFloat(price) > 0 ? ` (${prefix}${price})` : '';
  };

  const dropdownOptions = optionsArray.filter(option => option.optionType === 0);
  const otherOptions = optionsArray.filter(option => option.optionType !== 0);

  return (
    <div className="product-options">

      {otherOptions.map(({name, values, optionType}) => {
        const optionId = `${productModel}-${name}`;

        return (
          <div key={optionId} className="option-group">
            <label htmlFor={`${optionId}-control`}>{name}</label>

            {/* Text input (optionType 1) */}
            {optionType === 1 && (
              <input
                type="text"
                className="product-option-text"
                id={`${optionId}-control`}
                name={`${optionId}-text`}
                placeholder="Enter text"
              />
            )}

            {/* Radio buttons (optionType 2) */}
            {optionType === 2 && (
              <fieldset className="product-option-radio">
                <ul className="radio-options-list">
                  {values.map(({value, price, prefix, isDefault}) => {
                    const radioId = `${optionId}-${value}-option`;
                    return (
                      <li key={radioId} className="radio-option">
                        <input
                          type="radio"
                          id={radioId}
                          name={`${optionId}-option`}
                          value={value}
                          defaultChecked={isDefault}
                        />
                        <label htmlFor={radioId}>
                          {value}{renderPrice(price, prefix)}
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </fieldset>
            )}
          </div>
        );
      })}

      {dropdownOptions.length > 0 && (
        <div className="product-dropdown-options">
          {dropdownOptions.map(({name, values}) => {
            const defaultOptionValue = values.find(value => value.isDefault)?.value || values[0]?.value;
            const optionId = `${productModel}-${name}`;

            return (
              <div key={optionId} className="option-group">
                <label htmlFor={`${optionId}-control`}>{name}</label>
                <select
                  name={`${optionId}-dropdown`}
                  id={`${optionId}-control`}
                  className="product-option-dropdown"
                  defaultValue={defaultOptionValue}
                >
                  {values.map(({value, price, prefix}) => (
                    <option key={`${optionId}-${value}`} value={value}>
                      {value}{renderPrice(price, prefix)}
                    </option>
                  ))}
                </select>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
