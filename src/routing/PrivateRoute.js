import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout/PageLayout';

export const PrivateRoute = ({
	isAuthenticated,
	isLoading,
	component: Component,
	...rest
}) => (
	<Route
		{...rest}
		component={props =>
			isAuthenticated ? (
				<PageLayout content={<Component {...props} />} />
			) : (
				<Redirect to="/signin" />
			)
		}
	/>
);

const mapStateToProps = state => ({
	isAuthenticated: !!state.auth.email
});

export default connect(mapStateToProps)(PrivateRoute);
