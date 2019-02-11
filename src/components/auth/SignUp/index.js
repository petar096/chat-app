import React from 'react';
import SignUp from './SignUp';
import AuthPage from '../../layout/AuthPage';

export default function() {
	return <AuthPage right={<SignUp />} />;
}
