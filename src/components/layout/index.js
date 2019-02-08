import React from 'react';
import './_AuthPage.scss';

const AuthPage = ({ left = null, right = null }) => {
	return (
		<div className="auth-container">
			{left !== null ? (
				<React.Fragment>
					<div className="auth-right-side">{left}</div>
					<div className="auth-left-side" />
				</React.Fragment>
			) : (
				<React.Fragment>
					<div className="auth-left-side" />
					<div className="auth-right-side">{right}</div>
				</React.Fragment>
			)}
		</div>
	);
};
export default AuthPage;
