import React, { useState, useRef, useEffect } from 'react';
import { Field } from 'formik';
import type { FieldProps } from 'formik';

interface DropdownOption {
  value: string;
  label: string;
}

interface CustomDropdownSelectProps {
  name: string;
  label: string;
  options: DropdownOption[];
  placeholder?: string;
  required?: boolean;
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
}

const CustomDropdownSelect: React.FC<CustomDropdownSelectProps> = ({
  name,
  label,
  options,
  placeholder = "Select an option",
  required = false,
  className = "",
  value,
  onChange
}) => {
  const [isOpen, setIsOpen] = useState(false);
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

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <Field name={name}>
        {({ field, meta, form }: FieldProps) => {
          const selectedOption = options.find(option => option.value === (value || field.value));
          
          return (
            <div>
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsOpen(!isOpen)}
                  className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white text-left appearance-none ${
                    meta.touched && meta.error ? 'border-red-500' : ''
                  }`}
                >
                  <span className={selectedOption ? 'text-gray-900' : 'text-gray-500'}>
                    {selectedOption ? selectedOption.label : placeholder}
                  </span>
                </button>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg 
                    className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                
                {/* Custom Dropdown List */}
                {isOpen && (
                  <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {options.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => {
                          if (onChange) {
                            onChange(option.value);
                          } else {
                            form.setFieldValue(name, option.value);
                          }
                          setIsOpen(false);
                        }}
                        className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150 ${
                          (value || field.value) === option.value 
                            ? 'bg-primary text-white hover:bg-primary' 
                            : 'text-gray-700'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {meta.touched && meta.error && (
                <p className="text-red-500 text-xs mt-1">{meta.error}</p>
              )}
            </div>
          );
        }}
      </Field>
    </div>
  );
};

export default CustomDropdownSelect; 