import React, { useState, useRef, useEffect } from 'react';
import { Field } from 'formik';
import type { FieldProps } from 'formik';

interface Currency {
  code: string;
  symbol: string;
  name: string;
}

interface CustomCurrencyInputProps {
  name: string;
  label: string;
  placeholder?: string;
  currencies: Currency[];
  defaultCurrency?: string;
  required?: boolean;
  className?: string;
  value?: string; // Added for controlled component
  onChange?: (value: string) => void; // Added for controlled component
}

const CustomCurrencyInput: React.FC<CustomCurrencyInputProps> = ({
  name,
  label,
  placeholder = "0.00",
  currencies,
  defaultCurrency = "USD",
  required = false,
  className = "",
  value,
  onChange
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState(value || defaultCurrency);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update selectedCurrency when value prop changes
  useEffect(() => {
    if (value) {
      setSelectedCurrency(value);
    }
  }, [value]);

  const selectedCurrencyData = currencies.find(c => c.code === selectedCurrency);

  const handleCurrencySelect = (currencyCode: string) => {
    setSelectedCurrency(currencyCode);
    if (onChange) {
      onChange(currencyCode);
    }
  };

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <Field name={name}>
        {({ field, meta }: FieldProps) => (
          <div>
            <div className="relative" ref={dropdownRef}>
              <input
                {...field}
                type="text"
                placeholder={placeholder}
                className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-input-bg pr-20 ${
                  meta.touched && meta.error ? 'border-red-500' : ''
                }`}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <button
                  type="button"
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <span>{selectedCurrencyData?.symbol}</span>
                  <svg 
                    className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
              
              {/* Custom Currency Dropdown List */}
              {isOpen && (
                <div className="absolute z-50 w-32 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {currencies.map((currency) => (
                    <button
                      key={currency.code}
                      type="button"
                      onClick={() => {
                        handleCurrencySelect(currency.code);
                        setIsOpen(false);
                      }}
                      className={`w-full px-3 py-2 text-left hover:bg-gray-50 transition-colors duration-150 ${
                        selectedCurrency === currency.code 
                          ? 'bg-primary text-white hover:bg-primary' 
                          : 'text-gray-700'
                      }`}
                    >
                      <span className="text-sm">{currency.symbol}</span>
                    </button>
                  ))}
                </div>
              )}
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

export default CustomCurrencyInput; 