import React from 'react';
import AuthPage from '../../layout/AuthPage/index';
import Login from './Form';

export default function() {
	return <AuthPage right={<Login />} />;
}
