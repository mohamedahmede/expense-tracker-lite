// TextInput Types
export interface TextInputProps {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

// PasswordField Types
export interface PasswordFieldProps {
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

// Component Exports
export { default as TextInput } from '../components/reusable/inputs/TextInput';
export { default as PasswordField } from '../components/reusable/inputs/PasswordField'; 