import React from 'react';

interface CTAButtonProps {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  loading?: boolean;
  loadingText?: string;
  onClick?: () => void;
  className?: string;
}

const CTAButton: React.FC<CTAButtonProps> = ({
  children,
  type = 'button',
  disabled = false,
  loading = false,
  loadingText = 'Loading...',
  onClick,
  className = ''
}) => {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      className={`
        w-full py-4 px-6 rounded-lg text-xl font-medium text-white transition-all duration-200
        ${isDisabled
          ? 'bg-gray-400 cursor-not-allowed'
          : 'bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transform hover:scale-105'
        }
        shadow-lg
        ${className}
      `.trim()}
    >
      {loading ? loadingText : children}
    </button>
  );
};

export default CTAButton; 