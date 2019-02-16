import React from 'react';
import LoginButton from 'components/auth/LoginButton';
import AuthPageWrapper from 'components/auth/AuthPageWrapper';

const LoginPage = ({location}) => {
  
  return <AuthPageWrapper location={location}><LoginButton /></AuthPageWrapper>;
};

export default LoginPage;
