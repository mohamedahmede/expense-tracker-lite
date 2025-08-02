import React from 'react';

interface LoginContainerProps {
  children: React.ReactNode;
}

const LoginContainer: React.FC<LoginContainerProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="bg-white md:rounded-2xl md:shadow-xl px-8 py-24 md:p-8 md:max-w-md w-full min-h-screen md:min-h-0">
        {children}
      </div>
    </div>
  );
};

export default LoginContainer; 