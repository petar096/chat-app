import React from 'react';
import ResetPassword from './ResetPassword';
import AuthPage from '../../layout/AuthPage';

export default function() {
	return <AuthPage right={<ResetPassword />} />;
}
