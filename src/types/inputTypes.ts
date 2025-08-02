// TextInput Types
export interface TextInputProps {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

// PasswordField Types
export interface PasswordFieldProps {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

// Component Exports
export { default as TextInput } from '../components/reusable/inputs/TextInput';
export { default as PasswordField } from '../components/reusable/inputs/PasswordField'; 