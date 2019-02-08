import React from 'react';
import AuthPage from '../layout';
import SignUp from './SignUp';

export default function() {
	return <AuthPage right={<SignUp />} />;
}
