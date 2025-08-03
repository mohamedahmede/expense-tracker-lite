
import { useNavigate } from 'react-router-dom';
import LoginHeader from '../components/loginPage/LoginHeader';
import LoginForm from '../components/loginPage/LoginForm';
import LoginContainer from '../components/loginPage/LoginContainer';
import LoginFooter from '../components/loginPage/LoginFooter';
import type { LoginFormValues } from '../components/loginPage/LoginForm';

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