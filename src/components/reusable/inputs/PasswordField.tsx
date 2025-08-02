import React, { useState } from 'react';
import { Field } from 'formik';
import type { FieldProps } from 'formik';
import type { PasswordFieldProps } from '../../../types/inputTypes';

const PasswordField: React.FC<PasswordFieldProps> = ({
  name,
  label,
  placeholder,
  required = false,
  disabled = false,
  className = ''
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="">
      {label && (
        <label htmlFor={name} className="block text-md font-semibold mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <Field name={name}>
        {({ field, meta }: FieldProps) => (
          <div>
            <div className="relative">
              <input
                {...field}
                type={showPassword ? 'text' : 'password'}
                id={name}
                placeholder={placeholder}
                disabled={disabled}
                className={`
                  w-full px-4 py-3 pr-14 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                  ${meta.touched && meta.error 
                    ? 'border-red-500 bg-red-50' 
                    : 'border-gray-300'
                  }
                  style={{ backgroundColor: meta.touched && meta.error ? undefined : '#eff3f6' }}
                  ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}
                  ${className}
                `}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none w-6 h-6 flex items-center justify-center"
                disabled={disabled}
              >
                {showPassword ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
            <div className="h-5 mt-1">
              {meta.touched && meta.error && (
                <p className="text-sm text-red-600">{meta.error}</p>
              )}
            </div>
          </div>
        )}
      </Field>
    </div>
  );
};

export default PasswordField; 