import React from 'react';
import AuthPage from '../layout';
import ResetPassword from './ResetPassword';

export default function() {
  return <AuthPage right={<ResetPassword />} />;
}
