import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { TextInput, PasswordField } from '../../types/inputTypes';
import { CTAButton } from '../../types/buttonTypes';

interface LoginFormProps {
  onSubmit: (values: LoginFormValues) => void;
}

export interface LoginFormValues {
  email: string;
  password: string;
}

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const initialValues: LoginFormValues = {
  email: '',
  password: '',
};

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={LoginSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, isValid }) => (
        <Form className="space-y-2">
          <TextInput
            name="email"
            label="Email"
            type="email"
            placeholder="Enter your email"
          />

          <PasswordField
            name="password"
            label="Password"
            placeholder="Enter your password"
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
  );
};

export default LoginForm; 