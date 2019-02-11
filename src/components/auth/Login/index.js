import React from 'react';
import AuthPage from '../../layout/AuthPage/index';
import Login from './Login';

export default function() {
	return <AuthPage right={<Login />} />;
}
