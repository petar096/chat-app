import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

class PublicRoute extends Component {
	render() {
		const { isAuthenticated, component: Component, ...rest } = this.props;

		return (
			<Route
				{...rest}
				component={props =>
					isAuthenticated ? <Redirect to="/" /> : <Component {...props} />
				}
			/>
		);
	}
}
const mapStateToProps = state => ({
	isAuthenticated: !!state.auth.email
});

export default connect(mapStateToProps)(PublicRoute);
