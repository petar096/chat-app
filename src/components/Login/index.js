import React from 'react';
import AuthPage from '../layout';
import Login from './Login';

export default function() {
  return <AuthPage right={<Login />} />;
}
