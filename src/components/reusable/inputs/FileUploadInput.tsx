import React from 'react';
import { Field } from 'formik';
import type { FieldProps } from 'formik';

interface FileUploadInputProps {
  name: string;
  label: string;
  accept?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

const FileUploadInput: React.FC<FileUploadInputProps> = ({
  name,
  label,
  accept = "image/*,.pdf",
  placeholder = "Upload file",
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
        {({ field, meta, form }: FieldProps) => (
          <div>
            <div className="relative">
              <input
                type="file"
                accept={accept}
                onChange={(event) => {
                  const file = event.currentTarget.files?.[0];
                  form.setFieldValue(name, file);
                }}
                className="hidden"
                id={`${name}-upload`}
              />
              <label
                htmlFor={`${name}-upload`}
                className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-input-bg cursor-pointer flex items-center justify-between ${
                  meta.touched && meta.error ? 'border-red-500' : ''
                }`}
              >
                <span className="text-gray-500">
                  {field.value ? field.value.name : placeholder}
                </span>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </label>
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

export default FileUploadInput; 