import React from 'react';
import { Field } from 'formik';
import type { FieldProps } from 'formik';
import type { TextInputProps } from '../../../types/inputTypes';

const TextInput: React.FC<TextInputProps> = ({
  name,
  label,
  placeholder,
  type = 'text',
  disabled = false,
  className = ''
}) => {
  return (
    <div className="">
      {label && (
        <label htmlFor={name} className="block text-md font-semibold mb-2">
          {label}
        </label>
      )}
      <Field name={name}>
        {({ field, meta }: FieldProps) => (
          <div>
            <input
              {...field}
              type={type}
              id={name}
              placeholder={placeholder}
              disabled={disabled}
              className={`
                w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                ${meta.touched && meta.error 
                  ? 'border-red-500 bg-red-50' 
                  : 'border-gray-300'
                }
                style={{ backgroundColor: meta.touched && meta.error ? undefined : '#eff3f6' }}
                ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}
                ${className}
              `}
            />
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

export default TextInput; 