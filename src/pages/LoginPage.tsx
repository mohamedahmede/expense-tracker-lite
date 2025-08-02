import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginHeader, LoginForm, LoginContainer, LoginFooter } from '../components/loginPage';
import type { LoginFormValues } from '../components/loginPage';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleSubmit = (values: LoginFormValues) => {
    console.log('Login form submitted:', values);
    // Simulate login success
    setTimeout(() => {
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <LoginContainer>
      <LoginHeader />
      <LoginForm onSubmit={handleSubmit} />
      <LoginFooter />
    </LoginContainer>
  );
};

export default LoginPage;