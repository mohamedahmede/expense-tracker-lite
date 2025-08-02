import React from 'react';
import { Field } from 'formik';
import type { FieldProps } from 'formik';

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownSelectProps {
  name: string;
  label: string;
  options: DropdownOption[];
  placeholder?: string;
  required?: boolean;
  className?: string;
}

const DropdownSelect: React.FC<DropdownSelectProps> = ({
  name,
  label,
  options,
  placeholder = "Select an option",
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
              <select 
                {...field}
                className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white appearance-none ${
                  meta.touched && meta.error ? 'border-red-500' : ''
                }`}
              >
                <option value="">{placeholder}</option>
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            <div className="h-5 mt-1">
              {meta.touched && meta.error && (
                <p className="text-red-500 text-xs">{meta.error}</p>
              )}
            </div>
          </div>
        )}
      </Field>
    </div>
  );
};

export default DropdownSelect; 