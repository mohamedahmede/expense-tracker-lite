import React from 'react';
import { Field } from 'formik';
import type { FieldProps } from 'formik';

interface Currency {
  code: string;
  symbol: string;
  name: string;
}

interface CurrencyInputProps {
  name: string;
  label: string;
  placeholder?: string;
  currencies: Currency[];
  defaultCurrency?: string;
  required?: boolean;
  className?: string;
}

const CurrencyInput: React.FC<CurrencyInputProps> = ({
  name,
  label,
  placeholder = "0.00",
  currencies,
  defaultCurrency = "USD",
  required = false,
  className = ""
}) => {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <Field name={name}>
        {({ field, meta }: FieldProps) => (
          <div>
            <div className="relative">
              <input
                {...field}
                type="text"
                placeholder={placeholder}
                className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-input-bg pr-20 ${
                  meta.touched && meta.error ? 'border-red-500' : ''
                }`}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <select 
                  defaultValue={defaultCurrency}
                  className="bg-transparent border-none focus:ring-0 text-sm text-gray-600"
                >
                  {currencies.map((currency) => (
                    <option key={currency.code} value={currency.code}>
                      {currency.symbol} {currency.code}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {meta.touched && meta.error && (
              <p className="text-red-500 text-xs mt-1">{meta.error}</p>
            )}
          </div>
        )}
      </Field>
    </div>
  );
};

export default CurrencyInput; 