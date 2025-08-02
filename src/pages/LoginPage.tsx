import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { TextInput, PasswordField } from '../types/inputTypes';
import { CTAButton } from '../types/buttonTypes';

// Validation schema
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginPage = () => {
  const navigate = useNavigate();
  
  const initialValues: LoginFormValues = {
    email: '',
    password: '',
  };

  const handleSubmit = (values: LoginFormValues) => {
    console.log('Login form submitted:', values);
    // Simulate login success
    setTimeout(() => {
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center ">
      <div className="bg-white md:rounded-2xl md:shadow-xl px-8 py-24 md:p-8 md:max-w-md w-full min-h-screen md:min-h-0">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-medium text-primary mb-12 font-aclonica">
            Expenset
          </h1>
          <h2 className="text-[1.65rem] font-eina font-bold">
            Login
          </h2>
        </div>

        {/* Login Form */}
        <Formik
          initialValues={initialValues}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, isValid }) => (
            <Form className="space-y-2">
              <TextInput
                name="email"
                label="Email"
                type="email"
                placeholder="Enter your email"
                required
              />

              <PasswordField
                name="password"
                label="Password"
                placeholder="Enter your password"
                required
              />

              {/* Forgot Password Link */}
              <div className="text-right">
                <button
                  type="button"
                  className="text-sm pb-8 text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Login Button */}
              <CTAButton
                type="submit"
                disabled={!isValid}
                loading={isSubmitting}
                loadingText="Signing in..."
              >
                Login
              </CTAButton> 
            </Form>
          )}
        </Formik>

        {/* Sign Up Link */}
        <div className="text-center mt-6">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <button
              type="button"
              className="text-blue-600 hover:text-blue-800 font-semibold transition-colors"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;