// CTAButton Types
export interface CTAButtonProps {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  loading?: boolean;
  loadingText?: string;
  onClick?: () => void;
  className?: string;
}

// Component Exports
export { default as CTAButton } from '../components/reusable/buttons/CTAButton'; 