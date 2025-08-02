import React from 'react';
import { Field } from 'formik';
import type { FieldProps } from 'formik';
import type { TextInputProps } from '../../../types/inputTypes';

const TextInput: React.FC<TextInputProps> = ({
  name,
  label,
  type = "text",
  placeholder,
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
            <input
              {...field}
              type={type}
              placeholder={placeholder}
              className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-input-bg ${
                meta.touched && meta.error ? 'border-red-500' : ''
              }`}
            />
            {meta.touched && meta.error && (
              <p className="text-red-500 text-xs mt-1">{meta.error}</p>
            )}
          </div>
        )}
      </Field>
    </div>
  );
};

export default TextInput; 