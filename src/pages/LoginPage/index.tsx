import React from 'react';
import { LoginForm } from '../../components/LoginForm';
import './LoginPage.scss';

export const LoginPage: React.FC = () => {
  return (
    <div className="login-page">
      <LoginForm />
    </div>
  );
};
