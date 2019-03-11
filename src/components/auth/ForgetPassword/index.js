import React from 'react';
import ResetPassword from './Form';
import AuthPage from '../../layout/AuthPage';

export default function() {
	return <AuthPage right={<ResetPassword />} />;
}
